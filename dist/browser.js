(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('Pictool.browser', factory) :
  (global = global || self, (global.Pictool = global.Pictool || {}, global.Pictool.browser = factory()));
}(this, function () { 'use strict';

  /**
   * @param {string} imageSrc
   * @return {promise}
   */
  var getImageBySrc = function (imageSrc) {
      var img = document.createElement('img');
      return new Promise(function (resolve, reject) {
          img.onload = function () {
              resolve(img);
          };
          img.onerror = function () {
              reject(new Error('GET_IMAGE_SRC_ERROR'));
          };
          img.src = imageSrc;
      });
  };
  /**
   * @param {string} imageSrc
   * @return {promise}
   */
  var getImageDataBySrc = function (imageSrc) {
      return new Promise(function (resolve, reject) {
          getImageBySrc(imageSrc).then(function (img) {
              var canvas = document.createElement('canvas');
              var drawWidth = img.width;
              var drawHeight = img.height;
              canvas.width = drawWidth;
              canvas.height = drawHeight;
              var ctx = canvas.getContext('2d');
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
              var imgData = ctx.getImageData(0, 0, drawWidth, drawHeight);
              resolve(imgData);
          }).catch(function (err) {
              reject(err);
          });
      });
  };
  /**
   *
   * @param {ImageData} imageData
   * @param {object} opts
   *  opts.type 'image/png' 'image/jpg'
   *  opts.encoderOptions [0, 1]
   */
  var imageData2Base64 = function (imageData, opts) {
      if (opts === void 0) { opts = { type: 'image/png', encoderOptions: 1 }; }
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageData, 0, 0);
      var base64 = canvas.toDataURL(opts.type, opts.encoderOptions);
      return base64;
  };

  var IMG_LIMIT_SIZE = 2000 * 2000;
  var PIECE_SIZE = 1000 * 1000;
  var CompressImageTypeEnum;
  (function (CompressImageTypeEnum) {
      CompressImageTypeEnum["png"] = "image/png";
      CompressImageTypeEnum["jpg"] = "image/jpg";
      CompressImageTypeEnum["jpeg"] = "image/jpeg";
  })(CompressImageTypeEnum || (CompressImageTypeEnum = {}));
  var compressImage = function (img, opts) {
      if (opts === void 0) { opts = { type: CompressImageTypeEnum.png, encoderOptions: 1 }; }
      var type = opts.type, encoderOptions = opts.encoderOptions;
      var w = img.width;
      var h = img.height;
      var outputW = w;
      var outputH = h;
      var imageSize = w * h;
      var ratio = Math.ceil(Math.sqrt(Math.ceil(imageSize / IMG_LIMIT_SIZE)));
      if (ratio > 1) {
          outputW = w / ratio;
          outputH = h / ratio;
      }
      else {
          ratio = 1;
      }
      var canvas = document.createElement('canvas');
      var tempCanvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = outputW;
      canvas.height = outputH;
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
      var pieceCount = Math.ceil(imageSize / PIECE_SIZE);
      if (pieceCount > 1) {
          var pieceW = Math.ceil(canvas.width / pieceCount);
          var pieceH = Math.ceil(canvas.height / pieceCount);
          tempCanvas.width = pieceW;
          tempCanvas.height = pieceH;
          var tempContext = tempCanvas.getContext('2d');
          var sw = pieceW * ratio;
          var sh = pieceH * ratio;
          var dw = pieceW;
          var dh = pieceH;
          for (var i = 0; i < pieceCount; i++) {
              for (var j = 0; j < pieceCount; j++) {
                  var sx = i * pieceW * ratio;
                  var sy = j * pieceH * ratio;
                  tempContext.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
                  context.drawImage(tempCanvas, i * pieceW, j * pieceH, dw, dh);
              }
          }
          tempContext.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
          tempCanvas.width = 0;
          tempCanvas.height = 0;
          tempCanvas = null;
      }
      else {
          context.drawImage(img, 0, 0, outputW, outputH);
      }
      var base64 = canvas.toDataURL(type, encoderOptions);
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 0;
      canvas.height = 0;
      canvas = null;
      return base64;
  };

  var DigitImageData = /** @class */ (function () {
      function DigitImageData(opts) {
          var width = opts.width, height = opts.height;
          var size = width * height * 4;
          var data = new Uint8ClampedArray(size);
          this.data = data;
          this.width = width;
          this.height = height;
      }
      DigitImageData.prototype.setData = function (data) {
          this.data = data.map(function (item) {
              return item;
          });
      };
      DigitImageData.prototype.pixelAt = function (x, y) {
          var _a = this, width = _a.width, data = _a.data;
          var idx = (width * y + x) * 4;
          var r = data[idx];
          var g = data[idx + 1];
          var b = data[idx + 2];
          var a = data[idx + 3];
          var rgba = { r: r, g: g, b: b, a: a };
          return rgba;
      };
      DigitImageData.prototype.destory = function () {
          this.data = null;
          this.width = null;
          this.height = null;
      };
      return DigitImageData;
  }());

  var digitImageData2ImageData = function (digitImgData) {
      var data = digitImgData.data, width = digitImgData.width, height = digitImgData.height;
      var imgData = new ImageData(width, height);
      data.forEach(function (num, i) {
          imgData.data[i] = num;
      });
      return imgData;
  };
  var imageData2DigitImageData = function (imgData) {
      var data = imgData.data, width = imgData.width, height = imgData.height;
      var digitImgData = new DigitImageData({ width: width, height: height });
      digitImgData.setData(data);
      return digitImgData;
  };

  var util = {
      getImageBySrc: getImageBySrc,
      getImageDataBySrc: getImageDataBySrc,
      compressImage: compressImage,
      imageData2Base64: imageData2Base64,
      digitImageData2ImageData: digitImageData2ImageData,
      imageData2DigitImageData: imageData2DigitImageData,
  };
  var browser = {
      util: util,
  };

  return browser;

}));
//# sourceMappingURL=browser.js.map
