import { DigitImageData, DigitImageDataRGBA } from './../digit-image-data';

export const grayscale = function(imgData: DigitImageData): DigitImageData {
  const { width, height } = imgData;
  const digitImg = new DigitImageData({width, height});

  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
      const idx = (width * y + x) * 4;
      const px: DigitImageDataRGBA = digitImg.pixelAt(x, y);
      const gray: number = Math.round((px.r + px.g + px.b) / 3);
      digitImg.data[idx] = gray;
      digitImg.data[idx + 1] = gray;
      digitImg.data[idx + 2] = gray;
      digitImg.data[idx + 3] = 255;
    }
  }

  return digitImg;
}