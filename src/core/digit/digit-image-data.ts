export interface DigitImageDataOpts {
  width: number;
  height: number;
  data?: Uint8ClampedArray;
}

export interface DigitImageDataRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}


export class DigitImageData {

  private _data: Uint8ClampedArray|null;
  private _width: number|null;
  private _height: number|null;
  private _nullData: Uint8ClampedArray = new Uint8ClampedArray(0); 

  constructor(opts: DigitImageDataOpts) {
    const { width, height, data } = opts;
    const size: number = width * height * 4;

    if (data instanceof Uint8ClampedArray && data.length === size) {
      this._data = new Uint8ClampedArray(data);
    } else if (data instanceof Array && data.length === size) {
      this._data = new Uint8ClampedArray(data);
    } else {
      this._data = new Uint8ClampedArray(size);
    }
    
    this._width = width;
    this._height = height;
  }

  public getWidth(): number {
    return this._width !== null ? this._width : 0;
  }

  public getHeight(): number {
    return this._height !== null ? this._height : 0;
  }

  public getData(): Uint8ClampedArray {
    return this._data !== null ? this._data : this._nullData;
  }

  public setDataUnit(index: number, unit: number) {
    if (this._data instanceof Uint8ClampedArray) {
      this._data[index] = unit;
    }
  }

  public pixelAt(x: number, y: number): DigitImageDataRGBA {
    const width: number = this.getWidth();
    const data: Uint8ClampedArray = this.getData();
    const idx = (width * y + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];
    const rgba: DigitImageDataRGBA = {r, g, b, a};
    return rgba;
  }
 
  public destory(): void {
    this._data = null;
    this._width = null;
    this._height = null; 
  }
}