import { RGBCell } from '../rgba/rgb';
import { HSLObject, HSLCell } from '../hsl/hsl';
import { RGBA_MID, RGBA_MAX, RGBA_MIN } from './static';

const parseRGBNum = function(origin: number): number {
  return origin * 100 / RGBA_MAX; // [1, 100]
}

function isPercent(num) {
  if(num >= -100 && num <= 100) {
    return true;
  } else {
    return false;
  }
}

function isHueValue(num) {
  if(num >= 0 && num <= 360) {
    return true;
  } else {
    return false;
  }
}

function isLightnessValue(num) {
  if(num >= 0 && num <= 100) {
    return true;
  } else {
    return false;
  }
}

function isStaurationValue(num) {
  if(num >= 0 && num <= 100) {
    return true;
  } else {
    return false;
  }
}


export interface HSLTransformPercent {
  h?: number; // [-100, 100]
  s?: number; // [-100, 100]
  l?: number; // [-100, 100]
}

export interface HSLTransformValue {
  h?: number; // [0, 360]
  s?: number; // [0, 100]
  l?: number; // [0, 100]
}

export interface HSLTransformOpts {
  percent?: HSLTransformPercent;
  value?: HSLTransformValue;
}

export const RGB2HSL = function(cell: RGBCell, opts?: HSLTransformOpts): HSLCell {
  
  const { percent, value } = opts;
  
  const orginR = cell.r;
  const orginG = cell.g;
  const orginB = cell.b;

  const r = parseRGBNum(orginR);
  const g = parseRGBNum(orginG);
  const b = parseRGBNum(orginB);

  const min: number = Math.min(r, g, b);
  const max: number = Math.max(r, g, b);
  const range: number = max - min;

  let h: number = 0; // [0, 360]
  let s: number = 0; // [0, 100]
  let l: number = (max + min) / 2; // [0, 100]

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    // transform Hua
    if (max === r && g >= b) {
      h = 60 * ((g - b) / range) + 0;
    } else if (max === r && g < b) {
      h = 60 * ((g - b) / range) + 360;
    } else if (max === g) {
      h = 60 * ((b - r) / range) + 120;
    } else if (max === b) {
      h = 60 * ((r - g) / range) + 240;
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
  l = Math.round(l);

  if (value) {
    if (isHueValue(value.h)) {
      h = value.h;
      h = Math.min(360, h);
      h = Math.max(0, h);
    }
  
    if (isStaurationValue(value.s)) {
      s = value.s;
      s = Math.min(100, s);
      s = Math.max(0, s);
    }
  
    if (isLightnessValue(value.l)) {
      l = value.l;
      l = Math.min(100, l);
      l = Math.max(0, l);
    }
  } else if (percent) {
    if (isPercent(percent.h)) {
      h = Math.floor(h * (100 + percent.h) / 100);
      h = Math.min(360, h);
      h = Math.max(0, h);
    }
  
    if (isPercent(percent.s)) {
      s = Math.floor(s * (100 + percent.s) / 100);
      s = Math.min(100, s);
      s = Math.max(0, s);
    }
  
    if (isPercent(percent.l)) {
      l = Math.floor(l * (100 + percent.l) / 100)
      l = Math.min(100, l);
      l = Math.max(0, l);
    }
  }

  return { h, s, l };
}
