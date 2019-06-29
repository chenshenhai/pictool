import { RGBCell } from '../rgba/rgb';
import { HSLObject, HSLCell } from '../hsl/hsl';
import {
  RGBA_MID, RGBA_MAX, RGBA_MIN,
  H_MAX, H_MIN,
  S_MAX, S_MIN, S_MID,
  L_MAX, L_MIN, L_MID
} from './static';

// const H2RGBNum = function(l: number): number {
//   let num = l / H_MAX * RGBA_MAX;
//   num = Math.round(num);
//   return num;
// }

// const S2RGBNum = function(l: number): number {
//   let num = l / S_MAX * RGBA_MAX;
//   num = Math.round(num);
//   return num;
// }

const L2RGBNum = function(l: number): number {
  let num = l / L_MAX * RGBA_MAX;
  num = Math.round(num);
  return num;
}

export const HSL2RGB = function(cell: HSLCell): RGBCell {

  const originH = cell.h;
  const originS = cell.s;
  const originL = cell.l;

  const h = originH / H_MAX; // [0, 1];
  const s = originS / S_MAX; // [0, 1];
  const l = originL / L_MAX; // [0, 1];
  // const max = 1;
  // const min = 0;
  const mid = 0.5

  let r: number = 0;
  let g: number = 0;
  let b: number = 0;

  if (s === 0) {
    r = L2RGBNum(l);
    g = L2RGBNum(l);
    b = L2RGBNum(l);
  } else {
    const tempRGB: number[] = [];
    let q: number = l >= 0.5 ? ( l + s - l * s ) : ( l * (1 + s) );
    let p: number = 2 * l - q;
    tempRGB[0] = h + 1 / 3;
    tempRGB[1] = h;
    tempRGB[2] = h - 1 / 3;
    for (let i = 0; i < tempRGB.length; i++){
      let tempColor: number = tempRGB[i];
      if (tempColor < 0){
        tempColor = tempColor + 1;
      } else if(tempColor > 1) {
        tempColor = tempColor - 1;
      }
      switch(true){
        case (tempColor < (1/6)):
          tempColor = p + (q - p) * 6 * tempColor;
          break;
        case ((1 / 6) <= tempColor && tempColor<0.5):
          tempColor = q;
          break;
        case (0.5 <= tempColor && tempColor < (2 / 3)):
          tempColor = p + (q - p) * (4 - 6 * tempColor);
          break;
        default:
          tempColor = p;
          break;
      }
      tempRGB[i] = Math.round(tempColor * RGBA_MAX);
    }
    
    r = tempRGB[0];
    g = tempRGB[1];
    b = tempRGB[2];
  }
  
  return { r, g, b };
}