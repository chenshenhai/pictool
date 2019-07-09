(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('Pictool.digit', factory) :
    (global = global || self, (global.Pictool = global.Pictool || {}, global.Pictool.digit = factory()));
}(this, function () { 'use strict';

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
    //# sourceMappingURL=static.js.map

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
    //# sourceMappingURL=hsl2rgb.js.map

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
    //# sourceMappingURL=digit-image-data.js.map

    var transformImageData = function (imageData, opts) {
        var data = imageData.data, width = imageData.width, height = imageData.height;
        var filteredImageData = new ImageData(width, height);
        for (var i = 0; i < data.length; i += 4) {
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            var a = data[i + 3];
            var cell = { r: r, g: g, b: b };
            var hslCell = RGB2HSL(cell, opts);
            var rsHsl = __assign({}, hslCell);
            var rgbCell = HSL2RGB(rsHsl);
            filteredImageData.data[i] = rgbCell.r;
            filteredImageData.data[i + 1] = rgbCell.g;
            filteredImageData.data[i + 2] = rgbCell.b;
            filteredImageData.data[i + 3] = a;
        }
        return filteredImageData;
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
    var transform = {
        HSL2RGB: HSL2RGB,
        RGB2HSL: RGB2HSL,
        transformImageData: transformImageData,
    };
    //# sourceMappingURL=index.js.map

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
    //# sourceMappingURL=grayscale.js.map

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
    //# sourceMappingURL=sobel.js.map

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
    //# sourceMappingURL=invert.js.map

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
    //# sourceMappingURL=hue.js.map

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
    //# sourceMappingURL=lightness.js.map

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
    //# sourceMappingURL=saturation.js.map

    var process = {
        grayscale: grayscale,
        sobel: sobel,
        invert: invert,
        hue: hue,
        lightness: lightness,
        saturation: saturation,
    };
    //# sourceMappingURL=index.js.map

    var digit = {
        transform: transform,
        process: process,
        DigitImageData: DigitImageData,
    };
    //# sourceMappingURL=index.js.map

    var transform$1 = digit.transform, process$1 = digit.process, DigitImageData$1 = digit.DigitImageData;
    var digit$1 = {
        transform: transform$1,
        process: process$1,
        DigitImageData: DigitImageData$1,
    };
    //# sourceMappingURL=digit.js.map

    return digit$1;

}));
//# sourceMappingURL=digit.js.map
