/**
 * @param {string} imageSrc
 * @return {promise}
 */
export const getImageBySrc = function(imageSrc: string): Promise<HTMLImageElement> {
  const img: HTMLImageElement = document.createElement('img');
  return new Promise(function(resolve, reject) {
    img.onload = function(){
      resolve(img);
    }
    img.onerror = function() {
      reject(new Error('GET_IMAGE_SRC_ERROR'));
    }
    img.src = imageSrc;
  });
};


/**
 * @param {string} imageSrc
 * @return {promise}
 */
export const getImageDataBySrc = function(imageSrc: string): Promise<ImageData> {
  return new Promise(function(resolve, reject) {
    getImageBySrc(imageSrc).then(function(img: HTMLImageElement){
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const drawWidth: number = img.width;
      const drawHeight: number = img.height;
      canvas.width = drawWidth;
      canvas.height = drawHeight;
      const ctx: CanvasRenderingContext2D|null = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
        const imgData = ctx.getImageData(0, 0, drawWidth, drawHeight);
        resolve(imgData);
      } else {
        reject(new Error(`canvas.getContext('2d') is null`))
      }
    }).catch(function(err) {
      reject(err);
    });
  });
};
