import { getImageBySrc, getImageDataBySrc, } from './util/image-file';
import { compressImage } from './util/compress';
import { digitImageData2ImageData, imageData2DigitImageData, imageData2Base64 } from './util/image-data';

import { Sandbox } from './util/sanbox';

const util = {
  getImageBySrc,
  getImageDataBySrc,
  compressImage,
  imageData2Base64,
  digitImageData2ImageData,
  imageData2DigitImageData,
};

export default {
  util,
  Sandbox,
};