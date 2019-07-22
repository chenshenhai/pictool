import { DigitImageData } from '../digit-image-data';
import { RGBA_MAX, RGBA_MIN } from './../transform/static';

export interface AlphaOpts {
  percent?: number; // [-100, 100]
  value?: number; // [0, 100]
} 

function isPercent(num: number) {
  if(num >= -100 && num <= 100) {
    return true;
  } else {
    return false;
  }
}

function isAlphaValue(num: number) {
  if(num >= 0 && num <= 100) {
    return true;
  } else {
    return false;
  }
}

export const alpha = function(
  digitImg: DigitImageData,
  opts: AlphaOpts
): DigitImageData {
  const width: number = digitImg.getWidth();
  const height: number = digitImg.getHeight();
  const data: Uint8ClampedArray = digitImg.getData();
  let rsDigitImg: DigitImageData = new DigitImageData({width, height, data});

  let percent: number|undefined = opts.percent;
  let value: number|undefined = opts.value;

  if (percent && isPercent(percent)) {
    percent = Math.min(100, percent);
    percent = Math.max(-100, percent);
  } else if (value && isAlphaValue(value)) {
    value = Math.min(100, value);
    value = Math.max(0, value);
  }

  if (value || value === 0) {
    for(let i = 0; i < data.length; i += 4) {
      const r: number = data[i];
      const g: number = data[i + 1];
      const b: number = data[i + 2];
      let a: number = data[i + 3];

      a = Math.floor(value * RGBA_MAX / 100);
      a = Math.min(RGBA_MAX, a);
      a = Math.max(RGBA_MIN, a);
  
      rsDigitImg.setDataUnit(i, r);
      rsDigitImg.setDataUnit(i + 1, g);
      rsDigitImg.setDataUnit(i + 2, b);
      rsDigitImg.setDataUnit(i + 3, a);
    }
  } else if (percent || percent === 0) {
    for(let i = 0; i < data.length; i += 4) {
      const r: number = data[i];
      const g: number = data[i + 1];
      const b: number = data[i + 2];
      let a: number = data[i + 3];

      a = Math.floor(a * (100 + percent) / 100);
      a = Math.min(RGBA_MAX, a);
      a = Math.max(RGBA_MIN, a);
  
      rsDigitImg.setDataUnit(i, r);
      rsDigitImg.setDataUnit(i + 1, g);
      rsDigitImg.setDataUnit(i + 2, b);
      rsDigitImg.setDataUnit(i + 3, a);
    }
  } else {
    for(let i = 0; i < data.length; i += 4) {
      const r: number = data[i];
      const g: number = data[i + 1];
      const b: number = data[i + 2];
      const a: number = data[i + 3];
  
      rsDigitImg.setDataUnit(i, r);
      rsDigitImg.setDataUnit(i + 1, g);
      rsDigitImg.setDataUnit(i + 2, b);
      rsDigitImg.setDataUnit(i + 3, a);
    }
  }
  
  return rsDigitImg;
}