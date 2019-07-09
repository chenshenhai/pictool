// Thanks to https://github.com/miguelmota/sobel/

import { DigitImageData } from './../digit-image-data';
import { grayscale } from './grayscale';

function imgDataAt(digitData: DigitImageData, x: number,  y: number): number {
  const { width, data } = digitData;
  const idx = (width * y + x) * 4;
  let num = data[idx];
  if (!(num >= 0 && num < 255)) {
    num = 0;
  }
  return num;
}

export const sobel = function(imgData: DigitImageData): DigitImageData {
  const { width, height } = imgData;
  const digitImg = new DigitImageData({width, height});

  const kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
  ];

  const kernelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
  ];

  let grayImg: DigitImageData = grayscale(imgData);

  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
      const pixelX = (
        (kernelX[0][0] * imgDataAt(grayImg, x - 1, y - 1)) +
        (kernelX[0][1] * imgDataAt(grayImg, x, y - 1)) +
        (kernelX[0][2] * imgDataAt(grayImg, x + 1, y - 1)) +
        (kernelX[1][0] * imgDataAt(grayImg, x - 1, y)) +
        (kernelX[1][1] * imgDataAt(grayImg, x, y)) +
        (kernelX[1][2] * imgDataAt(grayImg, x + 1, y)) +
        (kernelX[2][0] * imgDataAt(grayImg, x - 1, y + 1)) +
        (kernelX[2][1] * imgDataAt(grayImg, x, y + 1)) +
        (kernelX[2][2] * imgDataAt(grayImg, x + 1, y + 1))
      );

      const pixelY = (
        (kernelY[0][0] * imgDataAt(grayImg, x - 1, y - 1)) +
        (kernelY[0][1] * imgDataAt(grayImg, x, y - 1)) +
        (kernelY[0][2] * imgDataAt(grayImg, x + 1, y - 1)) +
        (kernelY[1][0] * imgDataAt(grayImg, x - 1, y)) +
        (kernelY[1][1] * imgDataAt(grayImg, x, y)) +
        (kernelY[1][2] * imgDataAt(grayImg, x + 1, y)) +
        (kernelY[2][0] * imgDataAt(grayImg, x - 1, y + 1)) +
        (kernelY[2][1] * imgDataAt(grayImg, x, y + 1)) +
        (kernelY[2][2] * imgDataAt(grayImg, x + 1, y + 1))
      );
      const magnitude = Math.round(Math.sqrt((pixelX * pixelX) + (pixelY * pixelY)));
      const idx = (width * y + x) * 4;
      digitImg.data[idx] = magnitude;
      digitImg.data[idx + 1] = magnitude;
      digitImg.data[idx + 2] = magnitude;
      digitImg.data[idx + 3] = 255;
    }
    
  }

  grayImg.destory();
  grayImg = null;

  return digitImg;
}