import { DigitImageData, DigitImageDataRGBA } from '../digit-image-data';
import { RGBA_MAX } from '../transform/static';

export interface GammaOpts {
  value?: number; // [0, 100]
} 


function isGammaValue(num: number) {
  if(num >= 0 && num <= 100) {
    return true;
  } else {
    return false;
  }
}


export const gamma = function(imgData: DigitImageData, opts: GammaOpts = {}): DigitImageData {
  const width: number = imgData.getWidth();
  const height: number = imgData.getHeight();
  const data: Uint8ClampedArray = imgData.getData();
  const digitImg = new DigitImageData({width, height, data});

  let value: number|undefined = opts.value || 16;

  if (value && isGammaValue(value)) {
    value = Math.min(100, value);
    value = Math.max(0, value);
  }

  const gammaVal = ((value + 100) / 200) * 2;

  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
      const idx = (width * y + x) * 4;
      const px: DigitImageDataRGBA = digitImg.pixelAt(x, y);

      const r = Math.floor(Math.pow(px.r, gammaVal));
      const g = Math.floor(Math.pow(px.g, gammaVal));
      const b = Math.floor(Math.pow(px.b, gammaVal));
      const a = px.a;

      digitImg.setDataUnit(idx, r);
      digitImg.setDataUnit(idx + 1, g);
      digitImg.setDataUnit(idx + 2, b);
      digitImg.setDataUnit(idx + 3, a);
    }
  }

  return digitImg;
}