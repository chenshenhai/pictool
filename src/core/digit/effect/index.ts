import process from './../process/index';
import { DigitImageData } from './../digit-image-data';
import { digitImageData2ImageData, imageData2DigitImageData } from '../../../util/image-data';

export class Effect {
  private _digitImageData: DigitImageData|null = null;

  constructor(imageData: DigitImageData) {
    this._digitImageData = imageData;
    // if (imageData instanceof DigitImageData) {
    //   this._digitImageData = imageData;
    // } else {
    //   this._digitImageData = imageData2DigitImageData(imageData);
    // }
  }
  
  public process(method: string, opts?: any): Effect {
    if (process && typeof process[method] !== 'function') {
      throw new Error(`Pictool.digit.process.${method} is not a function `);
    }
    this._digitImageData = process[method](this._digitImageData, opts);
    return this;
  }

  public getImageData(): ImageData|null {
    if (this._digitImageData) {
      const imageData = digitImageData2ImageData(this._digitImageData);
      return imageData;
    } else {
      return null;
    }
  }

  public getDigitImageData(): DigitImageData|null {
    return this._digitImageData;
  }

  public destory () {
    if (this._digitImageData) {
      this._digitImageData.destory();
      this._digitImageData = null;
    }
  }
}
