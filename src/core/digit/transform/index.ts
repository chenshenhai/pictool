import { HSL2RGB } from './hsl2rgb';
import { RGB2HSL, HSLTransformOpts } from './rgb2hsl';
import { HSLCell, } from './../hsl/hsl';
import { RGBCell, } from './../rgba/rgb';
import { DigitImageData } from './../digit-image-data';


export const transformDigitImageData = function(digitImageData: DigitImageData, opts: HSLTransformOpts): DigitImageData {
  const width: number = digitImageData.getWidth();
  const height: number = digitImageData.getHeight();
  const data: Uint8ClampedArray = digitImageData.getData();
  const rsImageData = new DigitImageData({width, height, data});
  for(let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const cell: RGBCell = {r, g, b};
    const hslCell: HSLCell = RGB2HSL(cell, opts);
    const rsHsl: HSLCell = { ...{}, ...hslCell, }

    const rgbCell = HSL2RGB(rsHsl);
    rsImageData.setDataUnit(i, rgbCell.r);
    rsImageData.setDataUnit(i + 1, rgbCell.g);
    rsImageData.setDataUnit(i + 2, rgbCell.b);
    rsImageData.setDataUnit(i + 3, a);
  }
  digitImageData.destory();
  // digitImageData = null;
  return rsImageData
}

const transform = {
  HSL2RGB,
  RGB2HSL,
}

export default transform;
