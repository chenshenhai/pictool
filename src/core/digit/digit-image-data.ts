export interface DigitImageDataOpts {
  width: number;
  height: number;
}

export interface DigitImageDataRGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface TempImageData {
  data: Uint8ClampedArray,
  width: number;
  height: number;
}


export class DigitImageData {

  public data: Uint8ClampedArray;
  public width: number;
  public height: number;

  constructor(opts: DigitImageDataOpts) {
    const { width, height } = opts;
    const size = width * height * 4;
    const data = new Uint8ClampedArray(size);
    this.data = data;
    this.width = width;
    this.height = height;
  }

  public setData(data: Uint8ClampedArray) {
    this.data = data.map(function(item){
      return item;
    });
  }

  public pixelAt(x: number, y: number): DigitImageDataRGBA {
    const { width, data } = this;
    const idx = (width * y + x) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];
    const rgba: DigitImageDataRGBA = {r, g, b, a};
    return rgba;
  }
 
  public destory(): void {
    this.data = null;
    this.width = null;
    this.height = null; 
  }
}