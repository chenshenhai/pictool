export const filterGrayImageData = function(imageData) {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const grayImageData = new ImageData(width, height);
  for (let i = 0; i < data.length; i += 4) {
    const redChannel = data[i + 0];
    const greenChannel = data[i + 1];
    const blueChannel = data[i + 2];
    // const alphaChannel = data[i + 3];

    const grayChannel = (redChannel + greenChannel + blueChannel) / 3;
    grayImageData.data[i + 0] = grayChannel;
    grayImageData.data[i + 1] = grayChannel;
    grayImageData.data[i + 2] = grayChannel;
    grayImageData.data[i + 3] = 255;
  }
  return grayImageData;
}
