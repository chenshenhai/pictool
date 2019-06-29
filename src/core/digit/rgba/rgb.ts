
export interface RGBCell {
  r: number; // [0, 255]
  g: number; // [0, 255]
  b: number; // [0, 255]
}


export interface RGBObject {
  data: RGBCell[];
  width: number;
  height: number;
}