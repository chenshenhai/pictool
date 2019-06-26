import { FilterOpts } from './filter';

export const filterPersonImageData = function(opts : FilterOpts) {
  const { imageData } = opts;
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const filteredImageData = new ImageData(width, height);
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i * 4];
    const green = data[i * 4 + 1];
    const blue = data[i * 4 + 2];
    const alpha = data[i * 4 + 3];
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
      filteredImageData.data[i * 4] = red;
      filteredImageData.data[i * 4 + 1] = green;
      filteredImageData.data[i * 4 + 2] = blue;
      filteredImageData.data[i * 4 + 3] = alpha;
    }
  }
  return filteredImageData;
}

export const filterPersonWhiteSkinImageData = function(opts : FilterOpts): ImageData {
  
  const filterPersonImageData = function(opts : FilterOpts) {
    const { imageData } = opts;
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const filteredImageData = new ImageData(width, height);
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i * 4];
      const green = data[i * 4 + 1];
      const blue = data[i * 4 + 2];
      const alpha = data[i * 4 + 3];
      if ((Math.abs(red - green) > 15) && (red > green) && (red > blue)) {
        if (red > 95 && green > 40 && blue > 20 && (Math.max(red, green, blue) - Math.min(red, green, blue) > 15)) {
          filteredImageData.data[i * 4] = 1;
          filteredImageData.data[i * 4 + 1] = 1;
          filteredImageData.data[i * 4 + 2] = 1;
          filteredImageData.data[i * 4 + 3] = 1;
        } else if (red > 220 && green > 210 && blue > 170) {
          filteredImageData.data[i * 4] = 1;
          filteredImageData.data[i * 4 + 1] = 1;
          filteredImageData.data[i * 4 + 2] = 1;
          filteredImageData.data[i * 4 + 3] = 1;
        } else {
          filteredImageData.data[i * 4] = red;
          filteredImageData.data[i * 4 + 1] = green;
          filteredImageData.data[i * 4 + 2] = blue;
          filteredImageData.data[i * 4 + 3] = alpha;
        }
      } else {
        filteredImageData.data[i * 4] = red;
        filteredImageData.data[i * 4 + 1] = green;
        filteredImageData.data[i * 4 + 2] = blue;
        filteredImageData.data[i * 4 + 3] = alpha;
      }
    }
    return filteredImageData;
  }
  
  const { imageData } = opts;
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const value = 30;
  const midtonesAdd = [];
  for (let i = 0; i < 256; i++) {
    const midtone = 0.667 * (1 - ((i - 127.0) / 127) * ((i - 127.0) / 127));
    midtonesAdd.push(midtone);
  }

  const lookup = [];
  for (let i = 0; i < 256; i++) {
    let red = i;
    red = value * midtonesAdd[red];
    red = Math.max(0, Math.min(255, red));
    lookup[i] = red;
  }

  const personImageData = filterPersonImageData({imageData});
  const filteredImageData = new ImageData(width, height);
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i * 4];
    const green = data[i * 4 + 1];
    const blue = data[i * 4 + 2];
    const alpha = data[i * 4 + 3];

    const redP = personImageData.data[i * 4];
    const greenP = personImageData.data[i * 4 + 1];
    const blueP = personImageData.data[i * 4 + 2];
    const alphaP = personImageData.data[i * 4 + 3];
    if (redP === 1 && greenP === 1 && blueP === 1 && alphaP === 1) {
      filteredImageData.data[i * 4 + 0] = lookup[i * 4 + 0];
      filteredImageData.data[i * 4 + 1] = lookup[i * 4 + 1];
      filteredImageData.data[i * 4 + 2] = lookup[i * 4 + 2];
    } else {
      filteredImageData.data[i * 4 + 0] = red;
      filteredImageData.data[i * 4 + 1] = green;
      filteredImageData.data[i * 4 + 2] = blue;
    }
    filteredImageData.data[i * 4 + 3] = alpha;
  }
  
  return filteredImageData;
}
