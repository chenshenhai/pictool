

export const filterWhiteImageData = function(imageData: ImageData): ImageData {
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

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
    
    }  
  }


  const filteredImageData = new ImageData(width, height);
  
  return filteredImageData;
}
