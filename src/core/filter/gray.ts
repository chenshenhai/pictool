import { FilterOpts } from './filter';
import transform from './../digit/transform/index';

// export const filterGrayImageData = function(opts : FilterOpts): ImageData {
//   const { imageData } = opts;
//   const data = imageData.data;
//   const width = imageData.width;
//   const height = imageData.height;

//   const filteredImageData = new ImageData(width, height);
//   for (let i = 0; i < data.length; i += 4) {
//     const redChannel = data[i + 0];
//     const greenChannel = data[i + 1];
//     const blueChannel = data[i + 2];
//     // const alphaChannel = data[i + 3];

//     const grayChannel = (redChannel + greenChannel + blueChannel) / 3;
//     filteredImageData.data[i + 0] = grayChannel;
//     filteredImageData.data[i + 1] = grayChannel;
//     filteredImageData.data[i + 2] = grayChannel;
//     filteredImageData.data[i + 3] = 255;
//   }
//   return filteredImageData;
// }


export const filterGrayImageData = function(opts : FilterOpts): ImageData {
  const { imageData } = opts;
  const filteredImageData = transform.transformImageData(imageData, {s: 180});
  return filteredImageData;
}
