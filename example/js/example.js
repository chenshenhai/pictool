(async function() {
  // 测试图片来自 www.pexels.com
  // test photo from www.pexels.com
  // const testImg = './image/github-404.png';
  const src = './image/pexels-photo-001.jpg';

  async function getTargetImageDataAsync(imageSrc) {
    const originImg = await Pictool.util.getImageBySrc(imageSrc);
    const targetImgSrc = await Pictool.util.compressImage(originImg);
    const targetImgData = await Pictool.util.getImageDataBySrc(targetImgSrc);
    return targetImgData;
  }

  const imageData = await getTargetImageDataAsync(src);

  const tool = new Pictool.UI(imageData, {
    uiConfig: {
      zIndex: 1234,
    },
    workerConfig: {
      use: true,
      path: './../dist/worker.js',
    }
  });
  tool.show();

  const btn = document.querySelector('#J_BtnPictoolUI');
  btn.addEventListener('click', function() {
    tool.show();
  });
  
})();