import { DigitImageData, createDigitImageData } from './../digit-image-data';

export const sobel = function(imgData: DigitImageData): DigitImageData {
  const { width, height } = imgData;
  const digitImg = createDigitImageData(width, height);
  return digitImg;
}