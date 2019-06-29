export interface HSLCell {
  h: number; // [0, 360]
  s: number; // [0, 100]
  l: number; // [0, 100]
}

export interface HSLObject {
  data: HSLCell[];
  width: number;
  height: number;
}
