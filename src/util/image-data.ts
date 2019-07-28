import { DigitImageData } from './../core/digit/digit-image-data';

export const digitImageData2ImageData = function(digitImgData: DigitImageData): ImageData {
  const data: Uint8ClampedArray = digitImgData.getData();
  const width: number = digitImgData.getWidth();
  const height: number = digitImgData.getHeight();
  const imgData = new ImageData(width, height);
  data.forEach(function(num, i) {
    imgData.data[i] = num;
  })
  return imgData;
}

export const imageData2DigitImageData = function(imgData: ImageData): DigitImageData {
  const { data, width, height } = imgData;
  const digitImgData = new DigitImageData({width, height, data});
  return digitImgData;
}

/**
 * 
 * @param {ImageData} imageData 
 * @param {object} opts 
 *  opts.type 'image/png' 'image/jpg'
 *  opts.encoderOptions [0, 1]
 */
export const imageData2Base64 = function(imageData: ImageData, opts = {type: 'image/png',  encoderOptions: 1 }): string|null {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  let base64:string|null = null;
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
    base64 = canvas.toDataURL(opts.type, opts.encoderOptions); 
  }
  return base64;
}