export const filterDrawingImageData = function(imageData: ImageData): ImageData {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;

  const filterImageData = new ImageData(width, height);
  const total = height * width;
  for(let i = 0; i < total; i++) {
    const red = data[i * 4];
    const green = data[i * 4 + 1];
    const blue = data[i * 4 + 2];
    const alpha = data[i * 4 + 3];

    filterImageData.data[i * 4] = Math.abs(green - blue + green + red) * red / 256;
    filterImageData.data[i * 4 + 1] = Math.abs(blue - green + blue + red) * red / 256;
    filterImageData.data[i * 4 + 2] = Math.abs(blue - green + blue + red) * green / 256;
    filterImageData.data[i * 4 + 3] = alpha;
  }

  return filterImageData;
}