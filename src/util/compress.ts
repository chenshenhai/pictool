
const IMG_LIMIT_SIZE = 2000 * 2000;
const PIECE_SIZE = 1000 * 1000;

export enum CompressImageTypeEnum {
  png = 'image/png',
  jpg = 'image/webp',
  jpeg = 'image/jpeg',
}

export interface CompressImageOpts {
  type: CompressImageTypeEnum,
  encoderOptions: number, // [0, 1]
}

export const compressImage = function(
  img: HTMLImageElement,
  opts: CompressImageOpts = {type: CompressImageTypeEnum.png,  encoderOptions: 1 }
): string|null {
  const {type, encoderOptions } = opts;
  const w = img.width;
  const h = img.height;

  let outputW = w;
  let outputH = h;

  let imageSize = w * h;
  let ratio = Math.ceil(Math.sqrt(Math.ceil(imageSize / IMG_LIMIT_SIZE)));
  
  if ( ratio > 1) {
    outputW = w / ratio;
    outputH = h / ratio;
  } else {
    ratio = 1;
  }

  let canvas: HTMLCanvasElement|null = document.createElement('canvas');
  let tempCanvas: HTMLCanvasElement|null = document.createElement('canvas');
  let context: CanvasRenderingContext2D|null = canvas.getContext('2d');
  if (!context) {
    return null;
  }

  canvas.width = outputW;
  canvas.height = outputH;
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const pieceCount = Math.ceil(imageSize / PIECE_SIZE);

  if (pieceCount > 1) {

    const pieceW = Math.ceil(canvas.width / pieceCount);
    const pieceH = Math.ceil(canvas.height / pieceCount);

    tempCanvas.width = pieceW;
    tempCanvas.height = pieceH;
    let tempContext: CanvasRenderingContext2D | null = tempCanvas.getContext('2d');
    if (!tempContext) {
      return null;
    }

    const sw = pieceW * ratio;
    const sh = pieceH * ratio;
    const dw = pieceW;
    const dh = pieceH;
    for(let i = 0; i < pieceCount; i++) {
      for(let j = 0; j < pieceCount; j++) {
        const sx = i * pieceW * ratio;
        const sy = j * pieceH * ratio;
        tempContext.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
        context.drawImage(tempCanvas, i * pieceW, j * pieceH, dw, dh);
      }
    }

    tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCanvas.width = 0;
    tempCanvas.height = 0;
    tempCanvas = null;
  } else {
    context.drawImage(img, 0, 0, outputW, outputH);
  }
  const base64 = canvas.toDataURL(type, encoderOptions);
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 0;
  canvas.height = 0;
  canvas = null;

  return base64;
}