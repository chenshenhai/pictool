import { HSL } from './../hsl/index';
import { RGBACell, } from './rgba';

export interface RGBAOpts {
  // TODO;
}

export class RGBA {

  private _imgData: ImageData = null;
  private _opts: RGBAOpts = null;
  private _hsl: HSL = null;
  constructor(imgData: ImageData, opts: RGBAOpts) {
    this._imgData = imgData;
    this._opts = opts;
  }

  private _toHSL(): HSL {
    if (this._hsl) {
      return this._hsl;
    }
    const imgData: ImageData = this._imgData;
    const { data, } = imgData;
    for(let i = 0; i < data.length; i+=4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const cell: RGBACell = {r, g, b, a};
    }
  }

  public destroy() {

  }
}