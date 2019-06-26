import { FilterOpts } from './filter';

export const filterPersonSkinImageData = function(opts : FilterOpts) {
  const { imageData } = opts;
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const filteredImageData = new ImageData(width, height);
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i * 4];
    const green = data[i * 4 + 1];
    const blue = data[i * 4 + 2];
    const alpha = 255; // data[i * 4 + 3];
    if ((Math.abs(red - green) > 15) && (red > green) && (red > blue)) {
      if (red > 95 && green > 40 && blue > 20 && (Math.max(red, green, blue) - Math.min(red, green, blue) > 15)) {
        filteredImageData.data[i * 4] = 1;
        filteredImageData.data[i * 4 + 1] = 1;
        filteredImageData.data[i * 4 + 2] = 1;
        filteredImageData.data[i * 4 + 3] = alpha;
      } else if (red > 220 && green > 210 && blue > 170) {
        filteredImageData.data[i * 4] = 1;
        filteredImageData.data[i * 4 + 1] = 1;
        filteredImageData.data[i * 4 + 2] = 1;
        filteredImageData.data[i * 4 + 3] = alpha;
      } else {
        filteredImageData.data[i * 4] = red;
        filteredImageData.data[i * 4 + 1] = green;
        filteredImageData.data[i * 4 + 2] = blue;
        filteredImageData.data[i * 4 + 3] = alpha;
      }
    } else {
      // filteredImageData.data[i * 4] = red;
      // filteredImageData.data[i * 4 + 1] = green;
      // filteredImageData.data[i * 4 + 2] = blue;
      // filteredImageData.data[i * 4 + 3] = alpha;
      filteredImageData.data[i * 4] = 255;
      filteredImageData.data[i * 4 + 1] = 255;
      filteredImageData.data[i * 4 + 2] = 255;
      filteredImageData.data[i * 4 + 3] = 255;
    }
  }
  return filteredImageData;
}
