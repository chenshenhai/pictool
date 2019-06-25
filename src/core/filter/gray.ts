export const filterGrayImageData = function(imageData: ImageData): ImageData {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  const filterImageData = new ImageData(width, height);
  for (let i = 0; i < data.length; i += 4) {
    const redChannel = data[i + 0];
    const greenChannel = data[i + 1];
    const blueChannel = data[i + 2];
    // const alphaChannel = data[i + 3];

    const grayChannel = (redChannel + greenChannel + blueChannel) / 3;
    filterImageData.data[i + 0] = grayChannel;
    filterImageData.data[i + 1] = grayChannel;
    filterImageData.data[i + 2] = grayChannel;
    filterImageData.data[i + 3] = 255;
  }
  return filterImageData;
}
