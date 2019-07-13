import { DigitImageData } from './../digit/digit-image-data';
import { imageData2DigitImageData, digitImageData2ImageData } from './../../util/image-data';
import { getImageBySrc, getImageDataBySrc } from './../../util/image-file';
import { Effect } from './../digit/effect/index';
import {
  compressImage,
  CompressImageOpts,
  CompressImageTypeEnum
} from './../../util/compress';

export interface BrowserEffectOpts {
  compressRatio: number; // [1, 0]
}

export class BrowserEffect {

  private _imgSrc: string;
  private _options: BrowserEffectOpts;
  private _digitImg: DigitImageData;
  private _effect: Effect;

  constructor(imgSrc, opts?: BrowserEffectOpts) {
    this._imgSrc = imgSrc;
    this._options = opts;
  }

  public sandbox() {
    return new Promise((resolve, reject) => {
      this._parseDigitAsync().then(function(result) {
        if (result === true) {
          const effect = new Effect(this._digitImg);
          this._effect = effect;
        } else {
          reject(new Error('image src parse fail!'))
        }
      }).catch(function(err: Error) {
        reject(err);
      });
    });
  }

  private _parseDigitAsync(): Promise<boolean|Error> {
    if (this._digitImg) {
      return Promise.resolve(true);
    }
    const options: BrowserEffectOpts = this._options;
    const compressRatio: number = options.compressRatio;
    const imgSrc = this._imgSrc;
    let ratio: number = Math.max(0.1, compressRatio);
    ratio = Math.min(1, compressRatio);
    const imgType = CompressImageTypeEnum.jpg;
    const compressOpts: CompressImageOpts = {type: imgType,  encoderOptions: ratio }
    return new Promise((resolve, reject) => {
      getImageBySrc(imgSrc).then((img: HTMLImageElement) => {
        const compressedImgSrc: string = compressImage(img, compressOpts);
        getImageDataBySrc(compressedImgSrc).then(function(imgData: ImageData) {
          const digitImg: DigitImageData = imageData2DigitImageData(imgData);
          this._digitImg = digitImg;
          resolve(true);
        }).catch(function(err: Error) {
          reject(err);
        });
      }).catch(function(err: Error) {
        reject(err);
      });
    });
  }
  

}