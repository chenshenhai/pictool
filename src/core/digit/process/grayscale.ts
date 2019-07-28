import { DigitImageData, DigitImageDataRGBA } from './../digit-image-data';

export const grayscale = function(imgData: DigitImageData): DigitImageData {

  const width: number = imgData.getWidth();
  const height: number = imgData.getHeight();
  const data: Uint8ClampedArray = imgData.getData();
  const digitImg = new DigitImageData({width, height, data});

  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
      const idx = (width * y + x) * 4;
      const px: DigitImageDataRGBA = digitImg.pixelAt(x, y);
      const gray: number = Math.round((px.r + px.g + px.b) / 3);
      digitImg.setDataUnit(idx, gray);
      digitImg.setDataUnit(idx + 1, gray);
      digitImg.setDataUnit(idx + 2, gray);
      digitImg.setDataUnit(idx + 3, 255);
    }
  }

  return digitImg;
}