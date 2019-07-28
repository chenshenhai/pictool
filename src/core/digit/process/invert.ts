import { DigitImageData, DigitImageDataRGBA } from './../digit-image-data';
import { RGBA_MAX } from './../transform/static'

export const invert = function(imgData: DigitImageData): DigitImageData {
  const width: number = imgData.getWidth();
  const height: number = imgData.getHeight();
  const data: Uint8ClampedArray = imgData.getData();
  const digitImg = new DigitImageData({width, height, data});

  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
      const idx = (width * y + x) * 4;
      const px: DigitImageDataRGBA = digitImg.pixelAt(x, y);
      digitImg.setDataUnit(idx, RGBA_MAX - px.r);
      digitImg.setDataUnit(idx + 1, RGBA_MAX - px.g);
      digitImg.setDataUnit(idx + 2, RGBA_MAX - px.b);
      digitImg.setDataUnit(idx + 3, px.a);
    }
  }

  return digitImg;
}