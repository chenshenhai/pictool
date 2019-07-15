import { transformDigitImageData } from '../transform/index';
import { DigitImageData } from '../digit-image-data';
import {
  HSLTransformPercent,
  HSLTransformValue 
} from '../transform/rgb2hsl';

export interface LightnessOpts {
  percent?: number; // [-100, 100]
  value?: number; // [0, 360]
} 

export const hue = function(
  imgData: DigitImageData,
  opts: LightnessOpts
): DigitImageData {
  const width: number = imgData.getWidth();
  const height: number = imgData.getHeight();
  const data: Uint8ClampedArray = imgData.getData();
  let digitImg: DigitImageData = new DigitImageData({width, height, data});

  let percent: HSLTransformPercent|undefined = undefined;
  let value: HSLTransformValue|undefined = undefined;
  if (opts.value) {
    value = { h: opts.value }
  } else if (opts.percent) {
    percent = { h: opts.percent }
  }
  digitImg = transformDigitImageData(digitImg, {percent, value});

  return digitImg;
}