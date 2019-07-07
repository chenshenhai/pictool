import { getImageBySrc, getImageDataBySrc, imageData2Base64 } from './util/image-file';
import { compressImage } from './util/compress';
import { digitImageData2ImageData } from './util/image-data';

const util = {
  getImageBySrc,
  getImageDataBySrc,
  compressImage,
  imageData2Base64,
  digitImageData2ImageData,
};

export default util;