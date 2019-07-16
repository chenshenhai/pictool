import { DigitImageData } from '../core/digit/digit-image-data';
import { imageData2DigitImageData, imageData2Base64, } from './image-data';
import { getImageBySrc, getImageDataBySrc } from './image-file';
import { Effect } from '../core/digit/effect/index';
import {
  compressImage,
  CompressImageOpts,
  CompressImageTypeEnum
} from './compress';

export interface SandboxOpts {
  compressRatio: number; // [1, 0]
}

export interface ProcessOpts {
  process: string;
  options?: any;
}

export class Sandbox {

  private _imgSrc: string;
  private _options: SandboxOpts|undefined;
  private _digitImg: DigitImageData|null = null;
  private _effect: Effect|null = null;

  constructor(imgSrc: string, opts?: SandboxOpts) {
    this._imgSrc = imgSrc;
    this._options = opts;
  }

  public queueProcess(opts: ProcessOpts|ProcessOpts[]): Promise<string|null> {
    const queue: ProcessOpts[] = [];
    if (Array.isArray(opts)) {
      opts.forEach(function(opt) {
        queue.push(opt);
      })
    } else {
      queue.push(opts)
    }
    return new Promise((resolve, reject) => {
      this._getEffectAsync().then((effect) => {
        queue.forEach((opt: ProcessOpts) => {
          const process: string = opt.process;
          const options: any = opt.options;
          this._digitImg = effect.process(process, options).getDigitImageData();
        });
        const imageData = effect.getImageData();
        const base64: string|null = imageData2Base64(imageData);
        resolve(base64);
      }).catch((err: Error) => {
        reject(err);
      })
    })
  }

  public _getEffectAsync(): Promise<Effect> {
    if (this._effect instanceof Effect) {
      return Promise.resolve(this._effect);
    }

    return new Promise((resolve, reject) => {
      this._parseDigitAsync().then((result) => {
        if (result === true) {
          const digitData: DigitImageData|null = this._digitImg;
          if (digitData instanceof DigitImageData) {
            const effect = new Effect(digitData);
            this._effect = effect;
            resolve(this._effect);
          } else {
            reject(new Error('_digitImg is null'))
          }
        } else {
          reject(new Error('image src parse fail'))
        }
      }).catch((err: Error) => {
        reject(err);
      });
    });
  }

  private _parseDigitAsync(): Promise<boolean|Error> {
    if (this._digitImg) {
      return Promise.resolve(true);
    }
    const options: SandboxOpts|undefined = this._options;
    let compressRatio: number = 1;
    if (options) {
      compressRatio = options.compressRatio;
    } 
    const imgSrc = this._imgSrc;
    let ratio: number = Math.max(0.1, compressRatio);
    ratio = Math.min(1, compressRatio);
    const imgType = CompressImageTypeEnum.jpg;
    const compressOpts: CompressImageOpts = {type: imgType,  encoderOptions: ratio }
    return new Promise((resolve, reject) => {
      getImageBySrc(imgSrc).then((img: HTMLImageElement) => {
        const compressedImgSrc: string|null = compressImage(img, compressOpts);
        if (typeof compressedImgSrc === 'string') {
          getImageDataBySrc(compressedImgSrc).then((imgData: ImageData) => {
            const digitImg: DigitImageData = imageData2DigitImageData(imgData);
            this._digitImg = digitImg;
            resolve(true);
          }).catch((err: Error) => {
            reject(err);
          });
        } else {
          reject(new Error('compressImage result is null'));
        }
        
      }).catch((err: Error) => {
        reject(err);
      });
    });
  }
  

}