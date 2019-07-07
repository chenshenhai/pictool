import { DigitImageData } from './../core/digit/digit-image-data';

export const digitImageData2ImageData = function(digitImgData: DigitImageData): ImageData {
  const { data, width, height } = digitImgData;
  const imgData = new ImageData(width, height);
  data.forEach(function(num, i) {
    imgData.data[i] = num;
  })
  return imgData;
}