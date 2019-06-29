import { HSL2RGB } from './hsl2rgb';
import { RGB2HSL, ImageData2HSLOpts } from './rgb2hsl';
import { HSLCell, } from './../hsl/hsl';
import { RGBCell, } from './../rgba/rgb';

const transformImageData = function(imageData: ImageData, opts: ImageData2HSLOpts): ImageData {
  const { data, width, height } = imageData;
  const filteredImageData = new ImageData(width, height);
  for(let i = 0; i < data.length; i+=4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const cell: RGBCell = {r, g, b};
    const hslCell: HSLCell = RGB2HSL(cell);
    const rsHsl: HSLCell = { ...hslCell, ...opts }
    const rgbCell = HSL2RGB(rsHsl);
    filteredImageData.data[i] = rgbCell.r;
    filteredImageData.data[i + 1] = rgbCell.g;
    filteredImageData.data[i + 2] = rgbCell.b;
    filteredImageData.data[i + 3] = a;
  }
  return filteredImageData
}

const transform = {
  HSL2RGB,
  RGB2HSL,
  transformImageData,
}

export default transform;
