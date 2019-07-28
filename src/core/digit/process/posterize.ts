import { DigitImageData, DigitImageDataRGBA } from '../digit-image-data';
import { RGBA_MAX } from './../transform/static';

export interface PosterizeOpts {
  value?: number; // [0, 100]
} 


function isPosterizeValue(num: number) {
  if(num >= 0 && num <= 100) {
    return true;
  } else {
    return false;
  }
}

export const posterize = function(imgData: DigitImageData, opts: PosterizeOpts = {}): DigitImageData {
  const width: number = imgData.getWidth();
  const height: number = imgData.getHeight();
  const data: Uint8ClampedArray = imgData.getData();
  const digitImg = new DigitImageData({width, height, data});

  let value: number|undefined = opts.value || 100;

  if (value && isPosterizeValue(value)) {
    value = Math.min(100, value);
    value = Math.max(0, value);
  }

  const step1 = RGBA_MAX / value;
  const step2 = step1;

  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
      const idx = (width * y + x) * 4;
      const px: DigitImageDataRGBA = digitImg.pixelAt(x, y);

      const r = Math.floor(Math.floor(px.r / step1) * step2);
      const g = Math.floor(Math.floor(px.g / step1) * step2);
      const b = Math.floor(Math.floor(px.b / step1) * step2);
      const a = px.a;

      digitImg.setDataUnit(idx, r);
      digitImg.setDataUnit(idx + 1, g);
      digitImg.setDataUnit(idx + 2, b);
      digitImg.setDataUnit(idx + 3, a);
    }
  }

  return digitImg;
}