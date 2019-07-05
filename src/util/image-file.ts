/**
 * @param {string} imageSrc
 * @return {promise}
 */
export const getImageBySrc = function(imageSrc: string): Promise<HTMLImageElement|Error> {
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
export const getImageDataBySrc = function(imageSrc: string): Promise<ImageData|Error> {
  return new Promise(function(resolve, reject) {
    getImageBySrc(imageSrc).then(function(img: HTMLImageElement){
      const canvas = document.createElement('canvas');
      const drawWidth = img.width;
      const drawHeight = img.height;
      canvas.width = drawWidth;
      canvas.height = drawHeight;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
      const imgData = ctx.getImageData(0, 0, drawWidth, drawHeight);
      resolve(imgData);
    }).catch(function(err) {
      reject(err);
    });
  });
};