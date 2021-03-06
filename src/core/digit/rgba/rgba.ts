
export interface RGBACell {
  r: number; // [0, 255]
  g: number; // [0, 255]
  b: number; // [0, 255]
  a: number; // [0, 255]
}


export interface RGBAObject {
  data: RGBACell[];
  width: number;
  height: number;
}