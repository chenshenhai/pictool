import { DigitImageData, DigitImageDataRGBA } from './../digit-image-data';

export const sepia = function(imgData: DigitImageData): DigitImageData {
  const width: number = imgData.getWidth();
  const height: number = imgData.getHeight();
  const data: Uint8ClampedArray = imgData.getData();
  const digitImg = new DigitImageData({width, height, data});

  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
      const idx = (width * y + x) * 4;
      const px: DigitImageDataRGBA = digitImg.pixelAt(x, y);

      const r = Math.floor((px.r * 0.393) + (px.g * 0.769) + (px.b * 0.189));
      const g = Math.floor((px.r * 0.349) + (px.g * 0.686) + (px.b * 0.168));
      const b = Math.floor((px.r * 0.272) + (px.g * 0.534) + (px.b * 0.131));
      const a = px.a;

      digitImg.setDataUnit(idx, r);
      digitImg.setDataUnit(idx + 1, g);
      digitImg.setDataUnit(idx + 2, b);
      digitImg.setDataUnit(idx + 3, a);
    }
  }

  return digitImg;
}