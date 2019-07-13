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
              if (ctx) {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
                  var imgData = ctx.getImageData(0, 0, drawWidth, drawHeight);
                  resolve(imgData);
              }
              else {
                  reject(new Error("canvas.getContext('2d') is null"));
              }
          }).catch(function (err) {
              reject(err);
          });
      });
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
      var base64 = null;
      if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.putImageData(imageData, 0, 0);
          base64 = canvas.toDataURL(opts.type, opts.encoderOptions);
      }
      return base64;
  };

  var grayscale = function (imgData) {
      var width = imgData.width, height = imgData.height, data = imgData.data;
      var digitImg = new DigitImageData({ width: width, height: height });
      digitImg.setData(data);
      for (var x = 0; x < width; x++) {
          for (var y = 0; y < height; y++) {
              var idx = (width * y + x) * 4;
              var px = digitImg.pixelAt(x, y);
              var gray = Math.round((px.r + px.g + px.b) / 3);
              digitImg.data[idx] = gray;
              digitImg.data[idx + 1] = gray;
              digitImg.data[idx + 2] = gray;
              digitImg.data[idx + 3] = 255;
          }
      }
      return digitImg;
  };

  // Thanks to https://github.com/miguelmota/sobel/
  function imgDataAt(digitData, x, y) {
      var width = digitData.width, data = digitData.data;
      var idx = (width * y + x) * 4;
      var num = data[idx];
      if (!(num >= 0 && num < 255)) {
          num = 0;
      }
      return num;
  }
  var sobel = function (imgData) {
      var width = imgData.width, height = imgData.height;
      var digitImg = new DigitImageData({ width: width, height: height });
      var kernelX = [
          [-1, 0, 1],
          [-2, 0, 2],
          [-1, 0, 1]
      ];
      var kernelY = [
          [-1, -2, -1],
          [0, 0, 0],
          [1, 2, 1]
      ];
      var grayImg = grayscale(imgData);
      for (var x = 0; x < width; x++) {
          for (var y = 0; y < height; y++) {
              var pixelX = ((kernelX[0][0] * imgDataAt(grayImg, x - 1, y - 1)) +
                  (kernelX[0][1] * imgDataAt(grayImg, x, y - 1)) +
                  (kernelX[0][2] * imgDataAt(grayImg, x + 1, y - 1)) +
                  (kernelX[1][0] * imgDataAt(grayImg, x - 1, y)) +
                  (kernelX[1][1] * imgDataAt(grayImg, x, y)) +
                  (kernelX[1][2] * imgDataAt(grayImg, x + 1, y)) +
                  (kernelX[2][0] * imgDataAt(grayImg, x - 1, y + 1)) +
                  (kernelX[2][1] * imgDataAt(grayImg, x, y + 1)) +
                  (kernelX[2][2] * imgDataAt(grayImg, x + 1, y + 1)));
              var pixelY = ((kernelY[0][0] * imgDataAt(grayImg, x - 1, y - 1)) +
                  (kernelY[0][1] * imgDataAt(grayImg, x, y - 1)) +
                  (kernelY[0][2] * imgDataAt(grayImg, x + 1, y - 1)) +
                  (kernelY[1][0] * imgDataAt(grayImg, x - 1, y)) +
                  (kernelY[1][1] * imgDataAt(grayImg, x, y)) +
                  (kernelY[1][2] * imgDataAt(grayImg, x + 1, y)) +
                  (kernelY[2][0] * imgDataAt(grayImg, x - 1, y + 1)) +
                  (kernelY[2][1] * imgDataAt(grayImg, x, y + 1)) +
                  (kernelY[2][2] * imgDataAt(grayImg, x + 1, y + 1)));
              var magnitude = Math.round(Math.sqrt((pixelX * pixelX) + (pixelY * pixelY)));
              var idx = (width * y + x) * 4;
              digitImg.data[idx] = magnitude;
              digitImg.data[idx + 1] = magnitude;
              digitImg.data[idx + 2] = magnitude;
              digitImg.data[idx + 3] = 255;
          }
      }
      grayImg.destory();
      grayImg = null;
      return digitImg;
  };

  var RGBA_MID = 255 / 2;
  var RGBA_MAX = 255;
  var RGBA_MIN = 0;
  var H_MAX = 360;
  var S_MAX = 100;
  var L_MAX = 100;

  var invert = function (imgData) {
      var width = imgData.width, height = imgData.height, data = imgData.data;
      var digitImg = new DigitImageData({ width: width, height: height });
      digitImg.setData(data);
      for (var x = 0; x < width; x++) {
          for (var y = 0; y < height; y++) {
              var idx = (width * y + x) * 4;
              var px = digitImg.pixelAt(x, y);
              digitImg.data[idx] = RGBA_MAX - px.r;
              digitImg.data[idx + 1] = RGBA_MAX - px.g;
              digitImg.data[idx + 2] = RGBA_MAX - px.b;
              digitImg.data[idx + 3] = px.a;
          }
      }
      return digitImg;
  };

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  // const H2RGBNum = function(l: number): number {
  //   let num = l / H_MAX * RGBA_MAX;
  //   num = Math.round(num);
  //   return num;
  // }
  // const S2RGBNum = function(l: number): number {
  //   let num = l / S_MAX * RGBA_MAX;
  //   num = Math.round(num);
  //   return num;
  // }
  var L2RGBNum = function (l) {
      var num = l * RGBA_MAX;
      num = Math.round(num);
      num = Math.max(0, num);
      num = Math.min(255, num);
      return num;
  };
  var HSL2RGB = function (cell) {
      var originH = cell.h;
      var originS = cell.s;
      var originL = cell.l;
      var h = originH / H_MAX; // [0, 1];
      var s = originS / S_MAX; // [0, 1];
      var l = originL / L_MAX; // [0, 1];
      // const max = 1;
      // const min = 0;
      // const mid = 0.5
      var r = 0;
      var g = 0;
      var b = 0;
      if (s === 0) {
          r = L2RGBNum(l);
          g = r;
          b = g;
          // g = L2RGBNum(l * RGBA_MAX);
          // b = L2RGBNum(l * RGBA_MAX);
      }
      else {
          var tempRGB = [];
          var q = l >= 0.5 ? (l + s - l * s) : (l * (1 + s));
          var p = 2 * l - q;
          tempRGB[0] = h + 1 / 3;
          tempRGB[1] = h;
          tempRGB[2] = h - 1 / 3;
          for (var i = 0; i < tempRGB.length; i++) {
              var tempColor = tempRGB[i];
              if (tempColor < 0) {
                  tempColor = tempColor + 1;
              }
              else if (tempColor > 1) {
                  tempColor = tempColor - 1;
              }
              switch (true) {
                  case (tempColor < (1 / 6)):
                      tempColor = p + (q - p) * 6 * tempColor;
                      break;
                  case ((1 / 6) <= tempColor && tempColor < 0.5):
                      tempColor = q;
                      break;
                  case (0.5 <= tempColor && tempColor < (2 / 3)):
                      tempColor = p + (q - p) * (4 - 6 * tempColor);
                      break;
                  default:
                      tempColor = p;
                      break;
              }
              tempRGB[i] = Math.round(tempColor * RGBA_MAX);
          }
          r = tempRGB[0];
          g = tempRGB[1];
          b = tempRGB[2];
      }
      return { r: r, g: g, b: b };
  };

  var parseRGBNum = function (origin) {
      return origin * 100 / RGBA_MAX; // [1, 100]
  };
  function isPercent(num) {
      if (num >= -100 && num <= 100) {
          return true;
      }
      else {
          return false;
      }
  }
  function isHueValue(num) {
      if (num >= 0 && num <= 360) {
          return true;
      }
      else {
          return false;
      }
  }
  function isLightnessValue(num) {
      if (num >= 0 && num <= 100) {
          return true;
      }
      else {
          return false;
      }
  }
  function isStaurationValue(num) {
      if (num >= 0 && num <= 100) {
          return true;
      }
      else {
          return false;
      }
  }
  var RGB2HSL = function (cell, opts) {
      var orginR = cell.r;
      var orginG = cell.g;
      var orginB = cell.b;
      var r = parseRGBNum(orginR);
      var g = parseRGBNum(orginG);
      var b = parseRGBNum(orginB);
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var range = max - min;
      var h = 0; // [0, 360]
      var s = 0; // [0, 100]
      var l = (max + min) / 2; // [0, 100]
      if (max === min) {
          h = 0;
          s = 0;
      }
      else {
          // transform Hua
          if (max === r && g >= b) {
              h = 60 * ((g - b) / range) + 0;
          }
          else if (max === r && g < b) {
              h = 60 * ((g - b) / range) + 360;
          }
          else if (max === g) {
              h = 60 * ((b - r) / range) + 120;
          }
          else if (max === b) {
              h = 60 * ((r - g) / range) + 240;
          }
          // tranform Statution
          if (l === 0 || max === min) {
              s = 0;
          }
          else if (l > RGBA_MIN && l <= RGBA_MID) {
              s = range / (max + min);
          }
          else if (l > RGBA_MID) {
              s = range / (2 * RGBA_MAX - (max + min));
          }
      }
      h = Math.round(h);
      s = Math.round(s * 100);
      l = Math.round(l);
      if (opts && opts.value) {
          var value = opts.value;
          if (value.h && isHueValue(value.h)) {
              h = value.h;
              h = Math.min(360, h);
              h = Math.max(0, h);
          }
          if (value.s && isStaurationValue(value.s)) {
              s = value.s;
              s = Math.min(100, s);
              s = Math.max(0, s);
          }
          if (value.l && isLightnessValue(value.l)) {
              l = value.l;
              l = Math.min(100, l);
              l = Math.max(0, l);
          }
      }
      else if (opts && opts.percent) {
          var percent = opts.percent;
          if (percent.h && isPercent(percent.h)) {
              h = Math.floor(h * (100 + percent.h) / 100);
              h = Math.min(360, h);
              h = Math.max(0, h);
          }
          if (percent.s && isPercent(percent.s)) {
              s = Math.floor(s * (100 + percent.s) / 100);
              s = Math.min(100, s);
              s = Math.max(0, s);
          }
          if (percent.l && isPercent(percent.l)) {
              l = Math.floor(l * (100 + percent.l) / 100);
              l = Math.min(100, l);
              l = Math.max(0, l);
          }
      }
      return { h: h, s: s, l: l };
  };

  var transformDigitImageData = function (digitImageData, opts) {
      var data = digitImageData.data, width = digitImageData.width, height = digitImageData.height;
      var rsImageData = new DigitImageData({ width: width, height: height });
      for (var i = 0; i < data.length; i += 4) {
          var r = data[i];
          var g = data[i + 1];
          var b = data[i + 2];
          var a = data[i + 3];
          var cell = { r: r, g: g, b: b };
          var hslCell = RGB2HSL(cell, opts);
          var rsHsl = __assign({}, hslCell);
          var rgbCell = HSL2RGB(rsHsl);
          rsImageData.data[i] = rgbCell.r;
          rsImageData.data[i + 1] = rgbCell.g;
          rsImageData.data[i + 2] = rgbCell.b;
          rsImageData.data[i + 3] = a;
      }
      digitImageData.destory();
      digitImageData = null;
      return rsImageData;
  };

  var hue = function (imgData, opts) {
      var width = imgData.width, height = imgData.height, data = imgData.data;
      var digitImg = new DigitImageData({ width: width, height: height });
      digitImg.setData(data);
      var percent = null;
      var value = null;
      if (opts.value) {
          value = { h: opts.value };
      }
      else if (opts.percent) {
          percent = { h: opts.percent };
      }
      digitImg = transformDigitImageData(digitImg, { percent: percent, value: value });
      return digitImg;
  };

  var lightness = function (imgData, opts) {
      var width = imgData.width, height = imgData.height, data = imgData.data;
      var digitImg = new DigitImageData({ width: width, height: height });
      digitImg.setData(data);
      var percent = null;
      var value = null;
      if (opts.value) {
          value = { l: opts.value };
      }
      else if (opts.percent) {
          percent = { l: opts.percent };
      }
      digitImg = transformDigitImageData(digitImg, { percent: percent, value: value });
      return digitImg;
  };

  var saturation = function (imgData, opts) {
      var width = imgData.width, height = imgData.height, data = imgData.data;
      var digitImg = new DigitImageData({ width: width, height: height });
      digitImg.setData(data);
      var percent = null;
      var value = null;
      if (opts.value) {
          value = { s: opts.value };
      }
      else if (opts.percent) {
          percent = { s: opts.percent };
      }
      digitImg = transformDigitImageData(digitImg, { percent: percent, value: value });
      return digitImg;
  };

  var process = {
      grayscale: grayscale,
      sobel: sobel,
      invert: invert,
      hue: hue,
      saturation: saturation,
      lightness: lightness,
  };

  var Effect = /** @class */ (function () {
      function Effect(imageData) {
          this._digitImageData = null;
          if (imageData instanceof DigitImageData) {
              this._digitImageData = imageData;
          }
          else {
              this._digitImageData = imageData2DigitImageData(imageData);
          }
      }
      Effect.prototype.process = function (method, opts) {
          if (typeof process[method] !== 'function') {
              throw new Error("Pictool.digit.process." + method + " is not a function ");
          }
          this._digitImageData = process[method](this._digitImageData, opts);
          return this;
      };
      Effect.prototype.getImageData = function () {
          var imageData = digitImageData2ImageData(this._digitImageData);
          return imageData;
      };
      Effect.prototype.getDigitImageData = function () {
          return this._digitImageData;
      };
      Effect.prototype.destory = function () {
          this._digitImageData.destory();
          this._digitImageData = null;
      };
      return Effect;
  }());

  var Sandbox = /** @class */ (function () {
      function Sandbox(imgSrc, opts) {
          this._digitImg = null;
          this._effect = null;
          this._imgSrc = imgSrc;
          this._options = opts;
      }
      Sandbox.prototype.queueProcess = function (opts) {
          var _this = this;
          var queue = [];
          if (Array.isArray(opts)) {
              opts.forEach(function (opt) {
                  queue.push(opt);
              });
          }
          else {
              queue.push(opts);
          }
          return new Promise(function (resolve, reject) {
              _this._getEffectAsync().then(function (effect) {
                  queue.forEach(function (opt) {
                      var process = opt.process;
                      var options = opt.process;
                      _this._digitImg = effect.process(process, options).getDigitImageData();
                  });
                  var imageData = effect.getImageData();
                  var base64 = imageData2Base64(imageData);
                  resolve(base64);
              }).catch(function (err) {
                  reject(err);
              });
          });
      };
      Sandbox.prototype._getEffectAsync = function () {
          var _this = this;
          if (this._effect instanceof Effect) {
              return Promise.resolve(this._effect);
          }
          return new Promise(function (resolve, reject) {
              _this._parseDigitAsync().then(function (result) {
                  if (result === true) {
                      var digitData = _this._digitImg;
                      if (digitData instanceof DigitImageData) {
                          var effect = new Effect(digitData);
                          _this._effect = effect;
                          resolve(_this._effect);
                      }
                      else {
                          reject(new Error('_digitImg is null'));
                      }
                  }
                  else {
                      reject(new Error('image src parse fail'));
                  }
              }).catch(function (err) {
                  reject(err);
              });
          });
      };
      Sandbox.prototype._parseDigitAsync = function () {
          var _this = this;
          if (this._digitImg) {
              return Promise.resolve(true);
          }
          var options = this._options;
          var compressRatio = 1;
          if (options) {
              compressRatio = options.compressRatio;
          }
          var imgSrc = this._imgSrc;
          var ratio = Math.max(0.1, compressRatio);
          ratio = Math.min(1, compressRatio);
          var imgType = CompressImageTypeEnum.jpg;
          var compressOpts = { type: imgType, encoderOptions: ratio };
          return new Promise(function (resolve, reject) {
              getImageBySrc(imgSrc).then(function (img) {
                  var compressedImgSrc = compressImage(img, compressOpts);
                  getImageDataBySrc(compressedImgSrc).then(function (imgData) {
                      var digitImg = imageData2DigitImageData(imgData);
                      _this._digitImg = digitImg;
                      resolve(true);
                  }).catch(function (err) {
                      reject(err);
                  });
              }).catch(function (err) {
                  reject(err);
              });
          });
      };
      return Sandbox;
  }());

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
      Sandbox: Sandbox,
  };

  return browser;

}));
//# sourceMappingURL=browser.js.map
