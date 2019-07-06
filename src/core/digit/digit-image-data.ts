export interface DigitImageData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export const createDigitImageData = function(
  width: number,
  height: number
) : DigitImageData {
  const size = width * height * 4;
  const data = new Uint8ClampedArray(size);
  const imgData: DigitImageData = {
    data,
    width,
    height
  };
  return imgData;
}