import { RGBCell } from '../rgba/rgb';
import { HSLObject, HSLCell } from '../hsl/hsl';
import { RGBA_MID, RGBA_MAX, RGBA_MIN } from './static';
export const RGBA2HSL = function(cell: RGBCell): HSLCell {
  const {r, g, b} = cell;

  const min: number = Math.min(r, g, b);
  const max: number = Math.max(r, g, b);
  const range: number = max - min;
  let h: number = 0;
  let s: number = 0;
  let l: number = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    // transform Hua
    if (max === r && g >= b) {
      h = 60 * (g - b) / range + 0;
    } else if (max === r && g < b) {
      h = 60 * (g - b) / range + 360;
    } else if (max === g) {
      h = 60 * (b - r) / range + 120;
    } else if (max === b) {
      h = 60 * (r - g) / range + 240;
    }

    // tranform Statution
    if (l === 0 || max === min) {
      s = 0
    } else if (l > RGBA_MIN && l <= RGBA_MID) {
      s = range / (max + min);
    } else if (l > RGBA_MID) {
      s = range / (2 * RGBA_MAX - (max + min));
    }
  }

  h = Math.round(h);
  s = Math.round(s * 100);
  l = Math.round(s * 100);
  return { h, s, l };
}


export const imageDataRGBA2HSLObject = function(imageData: ImageData): HSLObject {
  const { data, width, height } = imageData;
  const hslData: HSLCell[] = [];
  for(let i = 0; i < data.length; i+=4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const cell: RGBCell = {r, g, b};
    const hslCell = RGBA2HSL(cell);
    hslData.push(hslCell);
  }
  return {
    data: hslData,
    width,
    height,
  }
}