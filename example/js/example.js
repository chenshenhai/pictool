(function() {
  const testImg = './image/github-404.png';
  function getImageDataAsync(imageSrc) {
    const img = new window.Image();
    const canvas = document.createElement('canvas');
    return new Promise(function(resolve, reject) {
      img.onload = function(){
        const drawWidth = img.width;
        const drawHeight = img.height;
        canvas.width = drawWidth;
        canvas.height = drawHeight;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
        const imgData = ctx.getImageData(0, 0, drawWidth, drawHeight);
        resolve(imgData);
      }
      img.onerror = function(err) {
        reject(err);
      }
      img.src = imageSrc;
    });
  }

  getImageDataAsync(testImg).then(function(imageData) {
    var tool = new Pictool(imageData, {
      // TODO
    });
    // tool.show();
    setTimeout(function() {
      tool.show();
    }, 1000);
  }).catch(function (err) {
    console.log(err);
  })

  


  
})();