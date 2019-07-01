(function () {
  'use strict';

  var filterGrayImageData = function (opts) {
      var imageData = opts.imageData;
      var data = imageData.data;
      var width = imageData.width;
      var height = imageData.height;
      var filteredImageData = new ImageData(width, height);
      for (var i = 0; i < data.length; i += 4) {
          var redChannel = data[i + 0];
          var greenChannel = data[i + 1];
          var blueChannel = data[i + 2];
          // const alphaChannel = data[i + 3];
          var grayChannel = (redChannel + greenChannel + blueChannel) / 3;
          filteredImageData.data[i + 0] = grayChannel;
          filteredImageData.data[i + 1] = grayChannel;
          filteredImageData.data[i + 2] = grayChannel;
          filteredImageData.data[i + 3] = 255;
      }
      return filteredImageData;
  };

  var filterPersonSkinImageData = function (opts) {
      var imageData = opts.imageData;
      var data = imageData.data;
      var width = imageData.width;
      var height = imageData.height;
      var filteredImageData = new ImageData(width, height);
      for (var i = 0; i < data.length; i += 4) {
          var red = data[i * 4];
          var green = data[i * 4 + 1];
          var blue = data[i * 4 + 2];
          var alpha = 255; // data[i * 4 + 3];
          if ((Math.abs(red - green) > 15) && (red > green) && (red > blue)) {
              if (red > 95 && green > 40 && blue > 20 && (Math.max(red, green, blue) - Math.min(red, green, blue) > 15)) {
                  filteredImageData.data[i * 4] = 1;
                  filteredImageData.data[i * 4 + 1] = 1;
                  filteredImageData.data[i * 4 + 2] = 1;
                  filteredImageData.data[i * 4 + 3] = alpha;
              }
              else if (red > 220 && green > 210 && blue > 170) {
                  filteredImageData.data[i * 4] = 1;
                  filteredImageData.data[i * 4 + 1] = 1;
                  filteredImageData.data[i * 4 + 2] = 1;
                  filteredImageData.data[i * 4 + 3] = alpha;
              }
              else {
                  filteredImageData.data[i * 4] = red;
                  filteredImageData.data[i * 4 + 1] = green;
                  filteredImageData.data[i * 4 + 2] = blue;
                  filteredImageData.data[i * 4 + 3] = alpha;
              }
          }
          else {
              // filteredImageData.data[i * 4] = red;
              // filteredImageData.data[i * 4 + 1] = green;
              // filteredImageData.data[i * 4 + 2] = blue;
              // filteredImageData.data[i * 4 + 3] = alpha;
              filteredImageData.data[i * 4] = 255;
              filteredImageData.data[i * 4 + 1] = 255;
              filteredImageData.data[i * 4 + 2] = 255;
              filteredImageData.data[i * 4 + 3] = 255;
          }
      }
      return filteredImageData;
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

  var RGBA_MID = 255 / 2;
  var RGBA_MAX = 255;
  var RGBA_MIN = 0;
  var H_MAX = 360;
  var S_MAX = 100;
  var L_MAX = 100;

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
  var RGB2HSL = function (cell, percent) {
      // console.log('percent ==', percent);
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
      if (percent) {
          if (isPercent(percent.h)) {
              h = Math.floor(h * (100 + percent.h) / 100);
              h = Math.min(360, h);
              h = Math.max(0, h);
          }
          if (isPercent(percent.s)) {
              s = Math.floor(s * (100 + percent.s) / 100);
              s = Math.min(100, s);
              s = Math.max(0, s);
          }
          if (isPercent(percent.l)) {
              l = Math.floor(l * (100 + percent.l) / 100);
              l = Math.min(100, l);
              l = Math.max(0, l);
          }
      }
      return { h: h, s: s, l: l };
  };

  var transformImageData = function (imageData, opts) {
      var data = imageData.data, width = imageData.width, height = imageData.height;
      var _a = opts.percent, percent = _a === void 0 ? {} : _a;
      var filteredImageData = new ImageData(width, height);
      for (var i = 0; i < data.length; i += 4) {
          var r = data[i];
          var g = data[i + 1];
          var b = data[i + 2];
          var a = data[i + 3];
          var cell = { r: r, g: g, b: b };
          var hslCell = RGB2HSL(cell, percent);
          var rsHsl = __assign({}, hslCell);
          var rgbCell = HSL2RGB(rsHsl);
          filteredImageData.data[i] = rgbCell.r;
          filteredImageData.data[i + 1] = rgbCell.g;
          filteredImageData.data[i + 2] = rgbCell.b;
          filteredImageData.data[i + 3] = a;
      }
      return filteredImageData;
  };
  var transform = {
      HSL2RGB: HSL2RGB,
      RGB2HSL: RGB2HSL,
      transformImageData: transformImageData
  };

  var filterTransform = function (filerOpts) {
      var imageData = filerOpts.imageData, _a = filerOpts.options, options = _a === void 0 ? {} : _a;
      var filteredImageData = transform.transformImageData(imageData, options);
      return filteredImageData;
  };



  var filterMap = /*#__PURE__*/Object.freeze({
    gray: filterGrayImageData,
    personSkin: filterPersonSkinImageData,
    transform: filterTransform
  });

  onmessage = function (event) {
      var filerAction = filterMap[event.data.key];
      var result = filerAction(event.data.param);
      postMessage({
          'key': event.data.key,
          'result': result
      }, undefined);
  };

}());
//# sourceMappingURL=worker.js.map
