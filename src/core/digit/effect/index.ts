import process from './../process/index';
import { DigitImageData } from './../digit-image-data';
import { digitImageData2ImageData } from '../../../util/image-data';

export class Effect {
  private _imageData: ImageData = null;

  constructor(imageData: ImageData) {
    this._imageData = imageData;
  }
  
  process(method: string, opts?: any): Effect {
    if (typeof process[method] !== 'function') {
      throw new Error(`Pictool.digit.process.${method} is not a function `);
    }
    let digitData = new DigitImageData({
      width: this._imageData.width,
      height: this._imageData.height,
    });
    digitData.setData(this._imageData.data);
    let rsDightData = process[method](digitData, opts);
    this._imageData = digitImageData2ImageData(rsDightData);
    digitData.destory();
    digitData = null;
    rsDightData.destory();
    rsDightData = null;
    return this;
  }

  getImageData(): ImageData {
    return this._imageData;
  }
}
