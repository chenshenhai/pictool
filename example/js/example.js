(function() {
  // 测试图片来自 www.pexels.com
  // test photo from www.pexels.com
  const testImg = './image/pexels-photo-002.jpg';
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

  function main() {
    getImageDataAsync(testImg).then(function(imageData) {
      var tool = new Pictool.UI(imageData, {
        uiConfig: {
          zIndex: 1234,
        },
        workerConfig: {
          use: true,
          path: './../dist/worker.js',
        }
      });

      var btn = document.querySelector('#J_BtnPictoolUI');
      btn.addEventListener('click', function() {
        tool.show();
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  

  main();
  
})();