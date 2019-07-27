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
    //# sourceMappingURL=rgb2hsl.js.map

    var DigitImageData = /** @class */ (function () {
        function DigitImageData(opts) {
            this._nullData = new Uint8ClampedArray(0);
            var width = opts.width, height = opts.height, data = opts.data;
            var size = width * height * 4;
            if (data instanceof Uint8ClampedArray && data.length === size) {
                this._data = new Uint8ClampedArray(data);
            }
            else if (data instanceof Array && data.length === size) {
                this._data = new Uint8ClampedArray(data);
            }
            else {
                this._data = new Uint8ClampedArray(size);
            }
            this._width = width;
            this._height = height;
        }
        DigitImageData.prototype.getWidth = function () {
            return this._width !== null ? this._width : 0;
        };
        DigitImageData.prototype.getHeight = function () {
            return this._height !== null ? this._height : 0;
        };
        DigitImageData.prototype.getData = function () {
            return this._data !== null ? this._data : this._nullData;
        };
        DigitImageData.prototype.setDataUnit = function (index, unit) {
            if (this._data instanceof Uint8ClampedArray) {
                this._data[index] = unit;
            }
        };
        DigitImageData.prototype.pixelAt = function (x, y) {
            var width = this.getWidth();
            var data = this.getData();
            var idx = (width * y + x) * 4;
            var r = data[idx];
            var g = data[idx + 1];
            var b = data[idx + 2];
            var a = data[idx + 3];
            var rgba = { r: r, g: g, b: b, a: a };
            return rgba;
        };
        DigitImageData.prototype.destory = function () {
            this._data = null;
            this._width = null;
            this._height = null;
        };
        return DigitImageData;
    }());
    //# sourceMappingURL=digit-image-data.js.map

    var transformDigitImageData = function (digitImageData, opts) {
        var width = digitImageData.getWidth();
        var height = digitImageData.getHeight();
        var data = digitImageData.getData();
        var rsImageData = new DigitImageData({ width: width, height: height, data: data });
        for (var i = 0; i < data.length; i += 4) {
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            var a = data[i + 3];
            var cell = { r: r, g: g, b: b };
            var hslCell = RGB2HSL(cell, opts);
            var rsHsl = __assign({}, hslCell);
            var rgbCell = HSL2RGB(rsHsl);
            rsImageData.setDataUnit(i, rgbCell.r);
            rsImageData.setDataUnit(i + 1, rgbCell.g);
            rsImageData.setDataUnit(i + 2, rgbCell.b);
            rsImageData.setDataUnit(i + 3, a);
        }
        digitImageData.destory();
        // digitImageData = null;
        return rsImageData;
    };
    var transform = {
        HSL2RGB: HSL2RGB,
        RGB2HSL: RGB2HSL,
    };
    //# sourceMappingURL=index.js.map

    var grayscale = function (imgData) {
        var width = imgData.getWidth();
        var height = imgData.getHeight();
        var data = imgData.getData();
        var digitImg = new DigitImageData({ width: width, height: height, data: data });
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (width * y + x) * 4;
                var px = digitImg.pixelAt(x, y);
                var gray = Math.round((px.r + px.g + px.b) / 3);
                digitImg.setDataUnit(idx, gray);
                digitImg.setDataUnit(idx + 1, gray);
                digitImg.setDataUnit(idx + 2, gray);
                digitImg.setDataUnit(idx + 3, 255);
            }
        }
        return digitImg;
    };
    //# sourceMappingURL=grayscale.js.map

    // Thanks to https://github.com/miguelmota/sobel/
    function imgDataAt(digitData, x, y) {
        var width = digitData.getWidth();
        // const height: number = digitData.getHeight();
        var data = digitData.getData();
        var idx = (width * y + x) * 4;
        var num = data[idx];
        if (!(num >= 0 && num < 255)) {
            num = 0;
        }
        return num;
    }
    var sobel = function (imgData) {
        var width = imgData.getWidth();
        var height = imgData.getHeight();
        var data = new Uint8ClampedArray(width * height * 4);
        var digitImg = new DigitImageData({ width: width, height: height, data: data });
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
                digitImg.setDataUnit(idx, magnitude);
                digitImg.setDataUnit(idx + 1, magnitude);
                digitImg.setDataUnit(idx + 2, magnitude);
                digitImg.setDataUnit(idx + 3, 255);
            }
        }
        grayImg.destory();
        grayImg = null;
        return digitImg;
    };
    //# sourceMappingURL=sobel.js.map

    var invert = function (imgData) {
        var width = imgData.getWidth();
        var height = imgData.getHeight();
        var data = imgData.getData();
        var digitImg = new DigitImageData({ width: width, height: height, data: data });
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (width * y + x) * 4;
                var px = digitImg.pixelAt(x, y);
                digitImg.setDataUnit(idx, RGBA_MAX - px.r);
                digitImg.setDataUnit(idx + 1, RGBA_MAX - px.g);
                digitImg.setDataUnit(idx + 2, RGBA_MAX - px.b);
                digitImg.setDataUnit(idx + 3, px.a);
            }
        }
        return digitImg;
    };
    //# sourceMappingURL=invert.js.map

    var hue = function (imgData, opts) {
        var width = imgData.getWidth();
        var height = imgData.getHeight();
        var data = imgData.getData();
        var digitImg = new DigitImageData({ width: width, height: height, data: data });
        var percent = undefined;
        var value = undefined;
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
        var width = imgData.getWidth();
        var height = imgData.getHeight();
        var data = imgData.getData();
        var digitImg = new DigitImageData({ width: width, height: height, data: data });
        var percent = undefined;
        var value = undefined;
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
        var width = imgData.getWidth();
        var height = imgData.getHeight();
        var data = imgData.getData();
        var digitImg = new DigitImageData({ width: width, height: height, data: data });
        var percent = undefined;
        var value = undefined;
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

    function isPercent$1(num) {
        if (num >= -100 && num <= 100) {
            return true;
        }
        else {
            return false;
        }
    }
    function isAlphaValue(num) {
        if (num >= 0 && num <= 100) {
            return true;
        }
        else {
            return false;
        }
    }
    var alpha = function (digitImg, opts) {
        var width = digitImg.getWidth();
        var height = digitImg.getHeight();
        var data = digitImg.getData();
        var rsDigitImg = new DigitImageData({ width: width, height: height, data: data });
        var percent = opts.percent;
        var value = opts.value;
        if (percent && isPercent$1(percent)) {
            percent = Math.min(100, percent);
            percent = Math.max(-100, percent);
        }
        else if (value && isAlphaValue(value)) {
            value = Math.min(100, value);
            value = Math.max(0, value);
        }
        if (value || value === 0) {
            for (var i = 0; i < data.length; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                var a = data[i + 3];
                a = Math.floor(value * RGBA_MAX / 100);
                a = Math.min(RGBA_MAX, a);
                a = Math.max(RGBA_MIN, a);
                rsDigitImg.setDataUnit(i, r);
                rsDigitImg.setDataUnit(i + 1, g);
                rsDigitImg.setDataUnit(i + 2, b);
                rsDigitImg.setDataUnit(i + 3, a);
            }
        }
        else if (percent || percent === 0) {
            for (var i = 0; i < data.length; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                var a = data[i + 3];
                a = Math.floor(a * (100 + percent) / 100);
                a = Math.min(RGBA_MAX, a);
                a = Math.max(RGBA_MIN, a);
                rsDigitImg.setDataUnit(i, r);
                rsDigitImg.setDataUnit(i + 1, g);
                rsDigitImg.setDataUnit(i + 2, b);
                rsDigitImg.setDataUnit(i + 3, a);
            }
        }
        else {
            for (var i = 0; i < data.length; i += 4) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                var a = data[i + 3];
                rsDigitImg.setDataUnit(i, r);
                rsDigitImg.setDataUnit(i + 1, g);
                rsDigitImg.setDataUnit(i + 2, b);
                rsDigitImg.setDataUnit(i + 3, a);
            }
        }
        return rsDigitImg;
    };
    //# sourceMappingURL=alpha.js.map

    var sepia = function (imgData) {
        var width = imgData.getWidth();
        var height = imgData.getHeight();
        var data = imgData.getData();
        var digitImg = new DigitImageData({ width: width, height: height, data: data });
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (width * y + x) * 4;
                var px = digitImg.pixelAt(x, y);
                var r = Math.floor((px.r * 0.393) + (px.g * 0.769) + (px.b * 0.189));
                var g = Math.floor((px.r * 0.349) + (px.g * 0.686) + (px.b * 0.168));
                var b = Math.floor((px.r * 0.272) + (px.g * 0.534) + (px.b * 0.131));
                var a = px.a;
                digitImg.setDataUnit(idx, r);
                digitImg.setDataUnit(idx + 1, g);
                digitImg.setDataUnit(idx + 2, b);
                digitImg.setDataUnit(idx + 3, a);
            }
        }
        return digitImg;
    };
    //# sourceMappingURL=sepia.js.map

    var posterize = function (imgData) {
        var width = imgData.getWidth();
        var height = imgData.getHeight();
        var data = imgData.getData();
        var digitImg = new DigitImageData({ width: width, height: height, data: data });
        // TODO
        var step1 = RGBA_MAX / 10;
        var step2 = step1;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var idx = (width * y + x) * 4;
                var px = digitImg.pixelAt(x, y);
                var r = Math.floor(Math.floor(px.r / step1) * step2);
                var g = Math.floor(Math.floor(px.g / step1) * step2);
                var b = Math.floor(Math.floor(px.b / step1) * step2);
                var a = px.a;
                digitImg.setDataUnit(idx, r);
                digitImg.setDataUnit(idx + 1, g);
                digitImg.setDataUnit(idx + 2, b);
                digitImg.setDataUnit(idx + 3, a);
            }
        }
        return digitImg;
    };

    var process = {
        grayscale: grayscale,
        sobel: sobel,
        invert: invert,
        hue: hue,
        saturation: saturation,
        lightness: lightness,
        alpha: alpha,
        sepia: sepia,
        posterize: posterize,
    };
    //# sourceMappingURL=index.js.map

    var digit = {
        transform: transform,
        process: process,
        DigitImageData: DigitImageData,
    };
    //# sourceMappingURL=index.js.map

    var digitImageData2ImageData = function (digitImgData) {
        var data = digitImgData.getData();
        var width = digitImgData.getWidth();
        var height = digitImgData.getHeight();
        var imgData = new ImageData(width, height);
        data.forEach(function (num, i) {
            imgData.data[i] = num;
        });
        return imgData;
    };
    //# sourceMappingURL=image-data.js.map

    var Effect = /** @class */ (function () {
        function Effect(imageData) {
            this._digitImageData = null;
            this._digitImageData = imageData;
            // if (imageData instanceof DigitImageData) {
            //   this._digitImageData = imageData;
            // } else {
            //   this._digitImageData = imageData2DigitImageData(imageData);
            // }
        }
        Effect.prototype.process = function (method, opts) {
            if (process && typeof process[method] !== 'function') {
                throw new Error("Pictool.digit.process." + method + " is not a function ");
            }
            this._digitImageData = process[method](this._digitImageData, opts);
            return this;
        };
        Effect.prototype.getImageData = function () {
            if (this._digitImageData) {
                var imageData = digitImageData2ImageData(this._digitImageData);
                return imageData;
            }
            else {
                return null;
            }
        };
        Effect.prototype.getDigitImageData = function () {
            return this._digitImageData;
        };
        Effect.prototype.destory = function () {
            if (this._digitImageData) {
                this._digitImageData.destory();
                this._digitImageData = null;
            }
        };
        return Effect;
    }());
    //# sourceMappingURL=index.js.map

    var transform$1 = digit.transform, process$1 = digit.process, DigitImageData$1 = digit.DigitImageData;
    var digit$1 = {
        transform: transform$1,
        process: process$1,
        DigitImageData: DigitImageData$1,
        Effect: Effect,
    };
    //# sourceMappingURL=digit.js.map

    return digit$1;

}));
//# sourceMappingURL=digit.js.map
