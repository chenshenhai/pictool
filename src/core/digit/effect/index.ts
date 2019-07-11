import process from './../process/index';
import { DigitImageData } from './../digit-image-data';
import { digitImageData2ImageData, imageData2DigitImageData } from '../../../util/image-data';

export class Effect {
  private _digitImageData: DigitImageData = null;

  constructor(imageData: ImageData|DigitImageData) {
    if (imageData instanceof DigitImageData) {
      this._digitImageData = imageData;
    } else {
      this._digitImageData = imageData2DigitImageData(imageData);
    }
  }
  
  public process(method: string, opts?: any): Effect {
    if (typeof process[method] !== 'function') {
      throw new Error(`Pictool.digit.process.${method} is not a function `);
    }
    this._digitImageData = process[method](this._digitImageData, opts);
    return this;
  }

  public getImageData(): ImageData {
    const imageData = digitImageData2ImageData(this._digitImageData);
    return imageData;
  }

  public getDigitImageData(): DigitImageData {
    return this._digitImageData;
  }

  public destory () {
    this._digitImageData.destory();
    this._digitImageData = null;
  }
}
