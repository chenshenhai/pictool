import { DigitImageData } from './../digit-image-data';

export const sobel = function(imgData: DigitImageData): DigitImageData {
  const { width, height } = imgData;
  const digitImg = new DigitImageData({width, height});
  return digitImg;
}