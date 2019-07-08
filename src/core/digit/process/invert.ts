import { DigitImageData, DigitImageDataRGBA } from './../digit-image-data';
import { RGBA_MAX } from './../transform/static'

export const invert = function(imgData: DigitImageData): DigitImageData {
  const { width, height, data } = imgData;
  const digitImg = new DigitImageData({width, height});
  digitImg.setData(data);

  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
      const idx = (width * y + x) * 4;
      const px: DigitImageDataRGBA = digitImg.pixelAt(x, y);
      digitImg.data[idx] = RGBA_MAX - px.r;
      digitImg.data[idx + 1] = RGBA_MAX - px.g;
      digitImg.data[idx + 2] = RGBA_MAX - px.b;
      digitImg.data[idx + 3] = px.a;
    }
  }

  return digitImg;
}