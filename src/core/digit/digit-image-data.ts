export interface DigitImageDataOpts {
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
  
}