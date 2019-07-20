(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('Pictool.UI', factory) :
  (global = global || self, (global.Pictool = global.Pictool || {}, global.Pictool.UI = factory()));
}(this, function () { 'use strict';

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = ".pictool-component-mask {\n  display: none;\n  background: #0000007a;\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n}\n.pictool-component-mask .pictool-mask-container {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -100%;\n  height: 100%;\n  width: 100%;\n  background: #ffffff;\n  transition: 0.6s;\n}\n.pictool-component-mask.mask-open {\n  display: block;\n}\n.pictool-component-mask.mask-open .pictool-mask-container {\n  bottom: 0;\n}\n.pictool-component-mask .pictool-mask-header {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 40px;\n  background: #222222;\n}\n.pictool-component-mask .pictool-mask-content {\n  position: absolute;\n  top: 40px;\n  bottom: 120px;\n  width: 100%;\n  background: #333333;\n}\n.pictool-component-mask .pictool-mask-footer {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 120px;\n  background: #222222;\n}\n";
  styleInject(css);

  var Mask = /** @class */ (function () {
      function Mask(opts) {
          this._hasRendered = false;
          this._component = null;
          this._options = opts;
          this._render();
      }
      Mask.prototype.show = function () {
          this._component.classList.add('mask-open');
      };
      Mask.prototype.hide = function () {
          this._component.classList.remove('mask-open');
      };
      Mask.prototype._render = function () {
          if (this._hasRendered === true) {
              return;
          }
          var options = this._options;
          var zIndex = options.zIndex, afterRender = options.afterRender;
          var html = "\n    <div class=\"pictool-component-mask\" style=\"z-index: " + zIndex + "\">\n      <div class=\"pictool-mask-container\">\n        <div class=\"pictool-mask-header\"></div>\n        <div class=\"pictool-mask-content\"></div>\n        <div class=\"pictool-mask-footer\"></div>\n      </div>\n    </div>\n    ";
          var body = document.querySelector('body');
          var mountDom = document.createElement('div');
          mountDom.innerHTML = html;
          var component = mountDom.querySelector('div.pictool-component-mask');
          body.appendChild(component);
          var contentMount = component.querySelector('div.pictool-mask-content');
          var headerMount = component.querySelector('div.pictool-mask-header');
          var footerMount = component.querySelector('div.pictool-mask-footer');
          if (typeof afterRender === 'function') {
              var args = { contentMount: contentMount, headerMount: headerMount, footerMount: footerMount };
              afterRender(args);
          }
          this._hasRendered = true;
          this._component = component;
      };
      return Mask;
  }());
  //# sourceMappingURL=index.js.map

  var css$1 = ".pictool-module-sketch {\n  width: 100%;\n  height: 100%;\n  display: table;\n}\n.pictool-module-sketch .pictool-sketch-container {\n  width: 100%;\n  height: 100%;\n  display: table-row;\n}\n.pictool-module-sketch .pictool-sketch-main {\n  width: 100%;\n  height: 100%;\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n}\n.pictool-module-sketch .pictool-sketch-main .pictool-sketch-canvas {\n  max-height: 100%;\n  max-width: 100%;\n}\n.pictool-module-sketch .pictool-sketch-hidden-area {\n  width: 0;\n  height: 0;\n  display: none;\n}\n";
  styleInject(css$1);

  var canvasRender = {
      renderImageData: function (canvas, imageData) {
          var ctx = canvas.getContext('2d');
          canvas.width = imageData.width;
          canvas.height = imageData.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.putImageData(imageData, 0, 0);
      }
  };
  //# sourceMappingURL=render.js.map

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
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

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

  function parsePrototype(data) {
      var typeStr = Object.prototype.toString.call(data) || '';
      var result = typeStr.replace(/(\[object|\])/ig, '').trim();
      return result;
  }
  var istype = {
      type: function (data, lowerCase) {
          var result = parsePrototype(data);
          return lowerCase === true ? result.toLocaleLowerCase() : result;
      },
      array: function (data) {
          return parsePrototype(data) === 'Array';
      },
      json: function (data) {
          return parsePrototype(data) === 'Object';
      },
      function: function (data) {
          return parsePrototype(data) === 'Function';
      },
      asyncFunction: function (data) {
          return parsePrototype(data) === 'AsyncFunction';
      },
      string: function (data) {
          return parsePrototype(data) === 'String';
      },
      number: function (data) {
          return parsePrototype(data) === 'Number';
      },
      undefined: function (data) {
          return parsePrototype(data) === 'Undefined';
      },
      null: function (data) {
          return parsePrototype(data) === 'Null';
      },
      promise: function (data) {
          return parsePrototype(data) === 'Promise';
      },
      nodeList: function (data) {
          return parsePrototype(data) === 'NodeList';
      },
      imageData: function (data) {
          return parsePrototype(data) === 'ImageData';
      }
  };
  //# sourceMappingURL=istype.js.map

  // Copyright 2019 The Authors chenshenhai. All rights reserved. MIT license.
  var context2dRenderActionMap = {
      fillStyle: {
          type: 'attribute',
          argumentsType: 'string',
          executeAction: function (ctx, args) {
              ctx.fillStyle = args;
          }
      },
      fillRect: {
          type: 'function',
          argumentsType: 'array',
          executeAction: function (ctx, args) {
              ctx.fillRect(args[0], args[1], args[2], args[3]);
          }
      },
      clearRect: {
          type: 'function',
          argumentsType: 'array',
          executeAction: function (ctx, args) {
              ctx.clearRect(args[0], args[1], args[2], args[3]);
          }
      },
      putImageData: {
          type: 'function',
          argumentsType: 'array',
          executeAction: function (ctx, args) {
              ctx.putImageData(args[0], args[1], args[2]);
          }
      },
  };
  var drawAction = function (ctx, method, args) {
      var action = context2dRenderActionMap[method];
      if (action && istype.type(args, true) === action.argumentsType) {
          action.executeAction(ctx, args);
      }
      else {
          console.warn("Layer can't support execute context." + method);
      }
  };
  //# sourceMappingURL=draw-action.js.map

  // Copyright 2019 The Authors chenshenhai. All rights reserved. MIT license.
  var Layer = /** @class */ (function () {
      function Layer(context, opts) {
          this._context = context;
          this._options = opts;
      }
      Layer.prototype.getLayerContext = function () {
          return this._context;
      };
      Layer.prototype.clearDrawAction = function () {
          var _a = this._options, width = _a.width, height = _a.height;
          this._context.clearRect(0, 0, width, height);
          this._layerSchema = {
              key: '',
              drawActionList: []
          };
      };
      Layer.prototype._executeDrawAction = function () {
          var schema = this._layerSchema;
          var list = schema.drawActionList;
          var context = this._context;
          for (var i = 0; i < list.length; i++) {
              var action = list[i];
              drawAction(context, action.method, action.args);
          }
      };
      Layer.prototype.draw = function (layerSchema) {
          this._layerSchema = layerSchema;
          this._executeDrawAction();
      };
      Layer.prototype.getSchema = function () {
          return this._layerSchema;
      };
      return Layer;
  }());
  //# sourceMappingURL=index.js.map

  // Copyright 2019 The Authors chenshenhai. All rights reserved. MIT license.
  var Sketch = /** @class */ (function () {
      // private _sketchSchema: SketchSchema;
      function Sketch(opts) {
          this._canvasStack = [];
          this._layerStack = [];
          this._tempCanvas = null;
          this._width = opts.width;
          this._height = opts.height;
          this._layerCount = opts.layerCount;
          this._initSketch();
      }
      Sketch.prototype._initSketch = function () {
          var width = this._width;
          var height = this._height;
          this._tempCanvas = document.createElement('canvas');
          this._tempCanvas.width = width;
          this._tempCanvas.height = height;
          var count = this._layerCount;
          for (var i = 0; i < count; i++) {
              var canvas = document.createElement('canvas');
              canvas.width = width;
              canvas.height = height;
              var ctx = canvas.getContext('2d');
              var layer = new Layer(ctx, { width: width, height: height });
              this._layerStack.push(layer);
              this._canvasStack.push(canvas);
          }
      };
      Sketch.prototype.getCanvasStack = function () {
          return this._canvasStack;
      };
      Sketch.prototype.getLayerStack = function () {
          return this._layerStack;
      };
      Sketch.prototype.drawLayer = function (index, layerSchema) {
          var layer = this._layerStack[index];
          layer.clearDrawAction();
          layer.draw(layerSchema);
      };
      Sketch.prototype.drawAllLayer = function (sketchSchema) {
          var _this = this;
          var layerSchemaList = sketchSchema.layerList;
          layerSchemaList.forEach(function (layerSchema, index) {
              _this.drawLayer(index, layerSchema);
          });
      };
      Sketch.prototype.getSchema = function () {
          var layerList = [];
          this._layerStack.forEach(function (layer) {
              var schema = layer.getSchema();
              layerList.push(schema);
          });
          return {
              layerList: layerList,
          };
      };
      Sketch.prototype.mergeLayer = function () {
          var _a = this, _tempCanvas = _a._tempCanvas, _width = _a._width, _height = _a._height;
          var tempContext = _tempCanvas.getContext('2d');
          tempContext.clearRect(0, 0, _width, _height);
          var canvasStack = this._canvasStack;
          canvasStack.forEach(function (canvas) {
              tempContext.drawImage(canvas, 0, 0);
          });
          var mergeImageData = tempContext.getImageData(0, 0, _width, _height);
          tempContext.clearRect(0, 0, _width, _height);
          return mergeImageData;
      };
      Sketch.prototype.moveUpLayer = function (index) {
          // TODO
      };
      Sketch.prototype.moveDownLayer = function (index) {
          // TODO
      };
      return Sketch;
  }());
  //# sourceMappingURL=index.js.map

  // Copyright 2019 The Authors chenshenhai. All rights reserved. MIT license.
  function mergeCSS2Style(css) {
      var result = '';
      var resultList = [];
      var keys = Object.keys(css);
      keys.forEach(function (name) {
          if (typeof name === 'string') {
              var value = css[name] || '';
              if (typeof value === 'string') {
                  resultList.push(name + ":" + value);
              }
          }
      });
      result = resultList.join(';');
      return result;
  }
  var Sketchpad = /** @class */ (function (_super) {
      __extends(Sketchpad, _super);
      function Sketchpad(opts) {
          var _this = _super.call(this, {
              width: opts.width,
              height: opts.height,
              layerCount: opts.layerCount
          }) || this;
          _this._options = opts;
          _this._container = opts.container;
          return _this;
      }
      Sketchpad.prototype.render = function (sketchSchema) {
          this._sketchSchema = sketchSchema;
          var container = this._container;
          while (container.firstChild) {
              var tempNode = container.removeChild(container.firstChild);
              tempNode = null;
          }
          var _a = this._options, width = _a.width, height = _a.height, layerCount = _a.layerCount;
          var style = mergeCSS2Style({
              width: width + "px",
              height: height + "px",
              position: 'relative',
              display: 'inline-block',
          });
          var canvasStack = this.getCanvasStack();
          container.setAttribute('style', style);
          var count = layerCount;
          for (var i = 0; i < count; i++) {
              var canvas = canvasStack[i];
              canvas.width = width;
              canvas.height = height;
              canvas.setAttribute('style', mergeCSS2Style({
                  width: width + "px",
                  height: height + "px",
                  position: 'absolute',
                  left: '0',
                  top: '0',
              }));
              container.appendChild(canvas);
          }
          this.drawAllLayer(sketchSchema);
      };
      Sketchpad.prototype.renderLayer = function (index, layerSchema) {
          this.drawLayer(index, layerSchema);
      };
      Sketchpad.prototype.downloadImage = function (filename) {
          if (filename === void 0) { filename = 'download-image'; }
          var _a = this._options, width = _a.width, height = _a.height;
          var tempCanvas = document.createElement('canvas');
          tempCanvas.width = width;
          tempCanvas.height = height;
          var tempContext = tempCanvas.getContext('2d');
          var mergeImageData = this.mergeLayer();
          tempContext.putImageData(mergeImageData, 0, 0);
          var stream = tempCanvas.toDataURL("image/png");
          var downloadLink = document.createElement('a');
          downloadLink.href = stream;
          downloadLink.download = filename;
          var downloadClickEvent = document.createEvent('MouseEvents');
          downloadClickEvent.initEvent('click', true, false);
          downloadLink.dispatchEvent(downloadClickEvent);
          // clear
          tempContext.clearRect(0, 0, width, height);
          tempCanvas = null;
      };
      return Sketchpad;
  }(Sketch));
  //# sourceMappingURL=index.js.map

  var EventEmitter = /** @class */ (function () {
      function EventEmitter() {
          this._listeners = new Map();
      }
      EventEmitter.prototype.on = function (eventKey, callback) {
          this._listeners.set(eventKey, callback);
      };
      EventEmitter.prototype.remove = function (eventKey) {
          this._listeners.delete(eventKey);
      };
      EventEmitter.prototype.trigger = function (eventKey) {
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
          }
          var listener = this._listeners.get(eventKey);
          if (istype.function(listener)) {
              listener.apply(void 0, args);
              return true;
          }
          else {
              return false;
          }
      };
      return EventEmitter;
  }());
  //# sourceMappingURL=event-emitter.js.map

  var eventHub = new EventEmitter();
  //# sourceMappingURL=event-hub.js.map

  var cacheStorage = new Map();
  var cacheHub = {
      set: function (key, val) {
          cacheStorage.set(key, val);
      },
      get: function (key) {
          return cacheStorage.get(key);
      }
  };
  //# sourceMappingURL=cache-hub.js.map

  var schemaParser = {
      parseImageData: function (schema) {
          var layerList = schema.layerList;
          var layer = layerList[0];
          var drawActionList = layer.drawActionList;
          var action = drawActionList[0];
          var actionArgs = action.args;
          var imageData = actionArgs[0];
          return imageData;
      },
      parseImageDataToSchema: function (imageData) {
          var schema = {
              layerList: [
                  {
                      key: 'image',
                      drawActionList: [{
                              method: 'putImageData',
                              args: [imageData, 0, 0],
                          }],
                  },
              ]
          };
          return schema;
      },
      updateSchemaImageData: function (schema, imageData) {
          var layerList = schema.layerList;
          var layer = layerList[0];
          var drawActionList = layer.drawActionList;
          var action = drawActionList[0];
          var actionArgs = action.args;
          actionArgs[0] = imageData;
          return schema;
      }
  };
  //# sourceMappingURL=schema-parser.js.map

  var Sketch$1 = /** @class */ (function () {
      function Sketch(mount, opts) {
          this._mount = null;
          this._opts = null;
          this._hasRendered = false;
          this._sketchpad = null;
          var that = this;
          this._mount = mount;
          this._opts = opts;
          this._render();
          var imageData = this._opts.imageData;
          var hiddenSketchpad = this._mount.querySelector('div.pictool-sketch-hidden-area-sketchpad');
          var height = imageData.height;
          var width = imageData.width;
          var layerCount = 2;
          var padOpts = {
              height: height,
              width: width,
              layerCount: layerCount,
              container: hiddenSketchpad,
          };
          var sketchpad = new Sketchpad(padOpts);
          this._sketchpad = sketchpad;
          var originSketchSchema = schemaParser.parseImageDataToSchema(imageData);
          cacheHub.set('Sketch.originSketchSchema', originSketchSchema);
          eventHub.on('GlobalEvent.moduleSketch.renderImage', function (schema) {
              that.renderImage(schema);
          });
          eventHub.on('GlobalEvent.moduleSketch.downloadImage', function () {
              sketchpad.downloadImage('download-pictool.png');
          });
      }
      Sketch.prototype.renderImage = function (sketchSchema) {
          var sketchpad = this._sketchpad;
          sketchpad.render(sketchSchema);
          var mergeImageData = sketchpad.mergeLayer();
          var canvas = this._mount.querySelector('canvas.pictool-sketch-canvas');
          canvasRender.renderImageData(canvas, mergeImageData);
          cacheHub.set('Sketch.sketchSchema', sketchSchema);
      };
      Sketch.prototype._render = function () {
          if (this._hasRendered === true) {
              return;
          }
          var html = "\n      <div class=\"pictool-module-sketch\">\n        <div class=\"pictool-sketch-container\">\n          <div class=\"pictool-sketch-main\">\n            <div class=\"pictool-sketch-entity\">\n              <canvas class=\"pictool-sketch-canvas\"></canvas>\n            </div>\n          </div>\n        </div>\n        <div class=\"pictool-sketch-hidden-area\">\n          <div class=\"pictool-sketch-hidden-area-sketchpad\"></div>\n        </div>\n      </div>\n    ";
          this._mount.innerHTML = html;
          this._registerEvent();
          this._hasRendered = true;
      };
      Sketch.prototype._registerEvent = function () {
          if (this._hasRendered === true) {
              return;
          }
          var that = this;
          eventHub.on('GlobalEvent.moduleSketch.resizeCanvas', function () {
              that._resizeSketch();
          });
      };
      Sketch.prototype._resizeSketch = function () {
          var container = this._mount.querySelector('.pictool-sketch-container');
          var canvas = container.querySelector('.pictool-sketch-canvas');
          var height = container.clientHeight;
          var width = container.clientWidth;
          var size = Math.min(height, width);
          canvas.setAttribute('style', "max-height: " + size + "px; max-width: " + size + "px; ");
      };
      return Sketch;
  }());
  //# sourceMappingURL=index.js.map

  var css$2 = ".pictool-module-dashboard {\n  height: 100%;\n  width: 100%;\n  position: relative;\n  font-size: 14px;\n  color: #333333;\n}\n.pictool-module-dashboard .pictool-dashboard-navlist {\n  position: absolute;\n  height: 80px;\n  display: flex;\n  background: #ffffff;\n  width: 100%;\n  bottom: 0;\n}\n.pictool-module-dashboard .pictool-dashboard-nav-btn {\n  flex: 1;\n  text-align: center;\n  font-size: 14px;\n  padding-top: 40px;\n  position: relative;\n}\n.pictool-module-dashboard .pictool-dashboard-nav-btn.dashboard-process::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background: url('data:image/svg+xml;charset=utf-8,<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg t=\"1562767097651\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"8873\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"200\" height=\"200\"><defs><style type=\"text/css\"></style></defs><path d=\"M552 472m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z\" p-id=\"8874\" fill=\"%23666666\"></path><path d=\"M879 824.9L696.3 352V178H768v-68H256v68h71.7v174L145 824.9c-2.8 7.4-4.3 15.2-4.3 23.1 0 35.3 28.7 64 64 64h614.6c7.9 0 15.7-1.5 23.1-4.3 33-12.7 49.4-49.8 36.6-82.8zM395.7 364.7V180h232.6v184.7L719.2 600c-20.7-5.3-42.1-8-63.9-8-61.2 0-119.2 21.5-165.3 60-33.9 28.2-76.3 43.9-121.3 43.9-32.7 0-64.1-8.3-91.8-23.7l118.8-307.5zM210.5 844l41.7-107.8c35.7 18.1 75.4 27.8 116.6 27.8 61.2 0 119.2-21.5 165.3-60 33.9-28.2 76.3-43.9 121.3-43.9 35 0 68.4 9.5 97.6 27.1L813.5 844h-603z\" p-id=\"8875\" fill=\"%23666666\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  background-size: 30px;\n}\n.pictool-module-dashboard .pictool-dashboard-nav-btn.dashboard-effect::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background: url('data:image/svg+xml;charset=utf-8,<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg t=\"1562768736747\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"9103\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"200\" height=\"200\"><defs><style type=\"text/css\"></style></defs><path d=\"M840 192h-56v-72c0-13.3-10.7-24-24-24H168c-13.3 0-24 10.7-24 24v272c0 13.3 10.7 24 24 24h592c13.3 0 24-10.7 24-24V256h32v200H465c-22.1 0-40 17.9-40 40v136h-44c-4.4 0-8 3.6-8 8v228c0 0.6 0.1 1.3 0.2 1.9-0.1 2-0.2 4.1-0.2 6.1 0 46.4 37.6 84 84 84s84-37.6 84-84c0-2.1-0.1-4.1-0.2-6.1 0.1-0.6 0.2-1.2 0.2-1.9V640c0-4.4-3.6-8-8-8h-44V520h351c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40zM720 352H208V160h512v192zM477 876c0 11-9 20-20 20s-20-9-20-20V696h40v180z\" p-id=\"9104\" fill=\"%23666666\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  background-size: 30px;\n}\n.pictool-module-dashboard .pictool-dashboard-nav-btn.dashboard-adjust::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background: url('data:image/svg+xml;charset=utf-8,<svg t=\"1561283541458\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"8719\" width=\"200\" height=\"200\"><path d=\"M924.8 385.6c-22.6-53.4-54.9-101.3-96-142.4-41.1-41.1-89-73.4-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2c-53.4 22.6-101.3 54.9-142.4 96-41.1 41.1-73.4 89-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6C184.5 765.5 140 665.6 140 560c0-99.4 38.7-192.8 109-263 70.3-70.3 163.7-109 263-109 99.4 0 192.8 38.7 263 109 70.3 70.3 109 163.7 109 263 0 105.6-44.5 205.5-122.6 276z\" p-id=\"8720\" fill=\"%23666666\"></path><path d=\"M623.5 421.5c-3.1-3.1-8.2-3.1-11.3 0L527.7 506c-18.7-5-39.4-0.2-54.1 14.5-21.9 21.9-21.9 57.3 0 79.2 21.9 21.9 57.3 21.9 79.2 0 14.7-14.7 19.5-35.4 14.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zM750 538v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zM762.7 340.8l-31.1-31.1c-3.1-3.1-8.2-3.1-11.3 0l-56.6 56.6c-3.1 3.1-3.1 8.2 0 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zM304.1 309.7c-3.1-3.1-8.2-3.1-11.3 0l-31.1 31.1c-3.1 3.1-3.1 8.2 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z\" p-id=\"8721\" fill=\"%23666666\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  background-size: 30px;\n}\n.pictool-module-dashboard .pictool-dashboard-nav-btn.dashboard-edit::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background: url('data:image/svg+xml;charset=utf-8,<svg t=\"1561204025732\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"9039\" width=\"200\" height=\"200\"><path d=\"M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z\" p-id=\"9040\" fill=\"%23666666\"></path><path d=\"M355.9 534.9L354 653.8c-0.1 8.9 7.1 16.2 16 16.2h0.4l118-2.9c2-0.1 4-0.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1 0.8-5.7 2.3l-415.8 415c-1.4 1.5-2.3 3.5-2.3 5.6z m63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1 0.7-46.4z\" p-id=\"9041\" fill=\"%23666666\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  background-size: 30px;\n}\n.pictool-module-dashboard .pictool-dashboard-nav-btn.dashboard-text::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background: url('data:image/svg+xml;charset=utf-8,<svg t=\"1561204122356\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"9245\" width=\"200\" height=\"200\"><path d=\"M904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8zM253.7 736h85c4.2 0 8-2.7 9.3-6.8l53.7-166h219.2l53.2 166c1.3 4 5 6.8 9.3 6.8h89.1c1.1 0 2.2-0.2 3.2-0.5 5.1-1.8 7.8-7.3 6-12.4L573.6 118.6c-1.4-3.9-5.1-6.6-9.2-6.6H462.1c-4.2 0-7.9 2.6-9.2 6.6L244.5 723.1c-0.4 1-0.5 2.1-0.5 3.2-0.1 5.3 4.3 9.7 9.7 9.7z m255.9-516.1h4.1l83.8 263.8H424.9l84.7-263.8z\" p-id=\"9246\" fill=\"%23666666\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  background-size: 30px;\n}\n";
  styleInject(css$2);

  var css$3 = ".pictool-component-progress {\n  width: 100%;\n  height: 28px;\n  display: block;\n}\n.pictool-component-progress.progress-hidden {\n  display: none;\n}\n.pictool-component-progress .pictool-progress-outer {\n  position: relative;\n  height: 28px;\n  width: 100%;\n  background: #ffffff;\n  border-radius: 14px;\n  overflow: hidden;\n}\n.pictool-component-progress .pictool-progress-inner {\n  position: absolute;\n  height: 28px;\n  width: 100%;\n  background: #00d4ff;\n  border-radius: 14px;\n}\n";
  styleInject(css$3);

  var mergeCSS2StyleAttr = function (cssMap) {
      if (cssMap === void 0) { cssMap = {}; }
      var cssList = [];
      if (istype.json(cssMap) === true) {
          for (var key in cssMap) {
              var cssKey = "" + key;
              var cssVal = "" + cssMap[key];
              cssKey = cssKey.trim();
              cssVal = cssVal.trim();
              cssList.push(cssKey + ":" + cssVal);
          }
      }
      var styleAttr = cssList.join('; ');
      return styleAttr;
  };
  //# sourceMappingURL=style.js.map

  var Progress = /** @class */ (function () {
      function Progress(opts) {
          this._options = null;
          this._hasRendered = false;
          this._component = null;
          this._options = opts;
          this._render();
          this._rangeList = [];
          var options = this._options;
          var _a = options.max, max = _a === void 0 ? 100 : _a, _b = options.min, min = _b === void 0 ? 0 : _b;
          this.resetRange(max, min);
      }
      Progress.prototype._render = function () {
          if (this._hasRendered === true) {
              return;
          }
          var options = this._options;
          var mount = options.mount, customStyle = options.customStyle, percent = options.percent;
          var styleAttr = mergeCSS2StyleAttr(customStyle);
          var html = "\n      <div class=\"pictool-component-progress\" style=\"" + styleAttr + "\">\n        <div class=\"pictool-progress-outer\">\n          <div class=\"pictool-progress-inner\"></div>\n        </div>\n      </div>\n    ";
          var tempDom = document.createElement('div');
          tempDom.innerHTML = html;
          var component = tempDom.querySelector('div.pictool-component-progress');
          mount.appendChild(component);
          this._component = component;
          this._setInnerMovePercent(percent);
          this._triggerEvent();
      };
      Progress.prototype.show = function () {
          this._component.classList.remove('progress-hidden');
      };
      Progress.prototype.hide = function () {
          this._component.classList.add('progress-hidden');
      };
      Progress.prototype.resetPercent = function (percent) {
          this._setInnerMovePercent(percent);
      };
      Progress.prototype.resetOnChange = function (onChange) {
          this._options.onChange = onChange;
      };
      Progress.prototype.resetRange = function (min, max) {
          this._rangeList = [];
          var item = (max - min) / 100;
          for (var i = min; i < max; i += item) {
              this._rangeList.push(i);
          }
          this._rangeList.push(max);
      };
      Progress.prototype._triggerEvent = function () {
          var that = this;
          var options = this._options;
          var component = this._component;
          var outer = component.querySelector('.pictool-progress-outer');
          var inner = component.querySelector('.pictool-progress-inner');
          outer.addEventListener('touchstart', function (event) {
              var touchClientX = event.touches[0].clientX;
              var movePercent = that._calculateMovePercent(touchClientX);
              that._setInnerMovePercent(movePercent);
          });
          outer.addEventListener('touchmove', function (event) {
              var touchClientX = event.touches[0].clientX;
              var movePercent = that._calculateMovePercent(touchClientX);
              that._setInnerMovePercent(movePercent);
          });
          outer.addEventListener('touchend', function () {
              var value = that._getInnerValue();
              var data = {
                  value: value,
              };
              var options = that._options;
              var onChange = options.onChange;
              if (istype.function(onChange)) {
                  onChange(data);
              }
          });
          outer.addEventListener('mousedown', function (event) {
              var touchClientX = event.clientX;
              var movePercent = that._calculateMovePercent(touchClientX);
              that._setInnerMovePercent(movePercent);
          });
          // outer.addEventListener('mousemove', function(event: MouseEvent) {
          //   const touchClientX = event.clientX;
          //   let movePercent = that._calculateMovePercent(touchClientX);
          //   that._setInnerMovePercent(movePercent);
          // });
          outer.addEventListener('mouseup', function () {
              var value = that._getInnerValue();
              var data = {
                  value: value,
              };
              var options = that._options;
              var onChange = options.onChange;
              if (istype.function(onChange)) {
                  onChange(data);
              }
          });
      };
      Progress.prototype._calculateMovePercent = function (touchClientX) {
          var component = this._component;
          var outer = component.querySelector('.pictool-progress-outer');
          var outerLeft = this._getViewAbsoluteLeft(outer);
          var outerWidth = outer.clientWidth;
          var moveLelf = touchClientX - outerLeft;
          var movePercent = Math.ceil(moveLelf * 100 / outerWidth);
          return movePercent;
      };
      Progress.prototype._setInnerMovePercent = function (percent) {
          var component = this._component;
          var inner = component.querySelector('.pictool-progress-inner');
          var displayPercent = percent > 0 ? percent : 0;
          displayPercent = Math.min(displayPercent, 100);
          displayPercent = Math.max(displayPercent, 0);
          var innerStyleAttr = mergeCSS2StyleAttr({
              left: "-" + (100 - displayPercent) + "%"
          });
          inner.setAttribute('style', innerStyleAttr);
          inner.setAttribute('data-component-inner-percent', "" + displayPercent);
      };
      Progress.prototype._getInnerValue = function () {
          var component = this._component;
          var inner = component.querySelector('.pictool-progress-inner');
          var percentAttr = inner.getAttribute('data-component-inner-percent');
          var percent = parseInt(percentAttr, 10);
          percent = Math.min(100, percent);
          percent = Math.max(0, percent);
          var value = this._rangeList[percent];
          return value;
      };
      Progress.prototype._getViewAbsoluteLeft = function (elem) {
          var actualLeft = elem.offsetLeft;
          var current = elem.offsetParent;
          while (current !== null) {
              actualLeft += current.offsetLeft;
              current = current.offsetParent;
          }
          return actualLeft;
      };
      return Progress;
  }());
  //# sourceMappingURL=index.js.map

  var css$4 = "@keyframes loading-animate {\n  0% {\n    width: 0%;\n  }\n  100% {\n    width: 90%;\n  }\n}\n.pictool-component-loading {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 1000;\n  background: #000000aa;\n  display: none;\n}\n.pictool-component-loading.loading-show {\n  display: block;\n}\n.pictool-component-loading.loading-show .pictool-loading-inner {\n  height: 100%;\n  width: 90%;\n  background: -webkit-linear-gradient(left, #4bf0f882, #3d7bd9);\n  background: -moz-linear-gradient(left, #4bf0f882, hsl(216, 67%, 55%));\n  background: -o-linear-gradient(left, #4bf0f882, #3d7bd9);\n  background: -ms-linear-gradient(left, #4bf0f882, #3d7bd9);\n  background: linear-gradient(left, #4bf0f882, #3d7bd9);\n  border-radius: 10px;\n  box-shadow: inset 0 -2px 2px rgba(0, 0, 0, 0.2);\n  animation: loading-animate 10s linear;\n}\n.pictool-component-loading.loading-show .pictool-loading-outer {\n  position: absolute;\n  top: 50%;\n  left: 10%;\n  right: 10%;\n  height: 10px;\n  border-radius: 10px;\n  background: -webkit-linear-gradient(left, #e4e3e4, #e4e5e4);\n  background: -moz-linear-gradient(left, #e4e3e4, #e4e5e4);\n  background: -o-linear-gradient(left, #e4e3e4, #e4e5e4);\n  background: -ms-linear-gradient(left, #e4e3e4, #e4e5e4);\n  background: linear-gradient(left, #e4e3e4, #e4e5e4);\n}\n";
  styleInject(css$4);

  var Loading = /** @class */ (function () {
      function Loading(opts) {
          this._options = null;
          this._hasRendered = false;
          this._component = null;
          this._options = opts;
          this._render();
      }
      Loading.prototype._render = function () {
          if (this._hasRendered === true) {
              return;
          }
          var options = this._options;
          var mount = options.mount, zIndex = options.zIndex;
          var html = "\n      <div class=\"pictool-component-loading\" style=\"z-index:" + zIndex + ";\">\n        <div class=\"pictool-loading-outer\">\n          <div class=\"pictool-loading-inner\"></div>\n        </div>\n      </div>\n    ";
          var tempDom = document.createElement('div');
          tempDom.innerHTML = html;
          var component = tempDom.querySelector('div.pictool-component-loading');
          if (mount instanceof HTMLElement) {
              mount.appendChild(component);
          }
          else {
              var body = document.querySelector('body');
              body.appendChild(component);
          }
          this._component = component;
      };
      Loading.prototype.show = function (timeout) {
          var that = this;
          this._component.classList.add('loading-show');
          if (timeout > 0) {
              setTimeout(function () {
                  that.hide();
              }, timeout);
          }
      };
      Loading.prototype.hide = function () {
          this._component.classList.remove('loading-show');
      };
      return Loading;
  }());
  //# sourceMappingURL=index.js.map

  var css$5 = ".pictool-component-actionsheet {\n  display: none;\n  background: #ffffff00;\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  font-size: 14px;\n  color: #333333;\n}\n.pictool-component-actionsheet .pictool-actionsheet-container {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n  background: #ffffff;\n  transition: 0.6s;\n}\n.pictool-component-actionsheet.actionsheet-open {\n  display: block;\n}\n.pictool-component-actionsheet .pictool-actionsheet-content {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n  background: #ffffff;\n}\n";
  styleInject(css$5);

  var ActionSheet = /** @class */ (function () {
      function ActionSheet(opts) {
          this._hasRendered = false;
          this._component = null;
          this._contentMount = null;
          this._options = opts;
          this._render();
      }
      ActionSheet.prototype.show = function () {
          var _a = this._options, beforeShow = _a.beforeShow, afterShow = _a.afterShow;
          var contentMount = this._contentMount;
          if (typeof beforeShow === 'function') {
              beforeShow({ contentMount: contentMount });
          }
          this._component.classList.add('actionsheet-open');
          if (typeof afterShow === 'function') {
              afterShow({ contentMount: contentMount });
          }
      };
      ActionSheet.prototype.hide = function () {
          var _a = this._options, beforeHide = _a.beforeHide, afterHide = _a.afterHide;
          var contentMount = this._contentMount;
          if (typeof beforeHide === 'function') {
              beforeHide({ contentMount: contentMount });
          }
          this._component.classList.remove('actionsheet-open');
          if (typeof afterHide === 'function') {
              afterHide({ contentMount: contentMount });
          }
      };
      ActionSheet.prototype._render = function () {
          if (this._hasRendered === true) {
              return;
          }
          var _a = this._options, afterRender = _a.afterRender, beforeRender = _a.beforeRender, mount = _a.mount;
          if (typeof beforeRender === 'function') {
              beforeRender();
          }
          var opts = this._options;
          var height = opts.height, zIndex = opts.zIndex;
          var html = "\n    <div class=\"pictool-component-actionsheet\" style=\"height:" + height + "px; z-index: " + zIndex + ";\">\n      <div class=\"pictool-actionsheet-container\">\n        <div class=\"pictool-actionsheet-header\"></div>\n        <div class=\"pictool-actionsheet-content\"></div>\n        <div class=\"pictool-actionsheet-footer\"></div>\n      </div>\n    </div>\n    ";
          var body = document.querySelector('body');
          var mountDom = document.createElement('div');
          mountDom.innerHTML = html;
          var component = mountDom.querySelector('div.pictool-component-actionsheet');
          if (mount) {
              mount.appendChild(component);
          }
          else {
              body.appendChild(component);
          }
          var contentMount = component.querySelector('div.pictool-actionsheet-content');
          if (typeof afterRender === 'function') {
              var args = { contentMount: contentMount, };
              afterRender(args);
          }
          this._hasRendered = true;
          this._component = component;
          this._contentMount = contentMount;
      };
      return ActionSheet;
  }());
  //# sourceMappingURL=index.js.map

  var css$6 = ".pictool-module-panel {\n  height: 100%;\n  width: 100%;\n  position: relative;\n  font-size: 14px;\n  color: #333333;\n}\n.pictool-module-panel .pictool-panel-header {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);\n}\n.pictool-module-panel .pictool-panel-header .pictool-panel-title {\n  line-height: 40px;\n  text-align: center;\n  font-size: 16px;\n}\n.pictool-module-panel .pictool-panel-header .pictool-panel-btn-close {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 60px;\n  height: 40px;\n}\n.pictool-module-panel .pictool-panel-header .pictool-panel-btn-close::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: url('data:image/svg+xml;charset=utf-8,<svg t=\"1561299766263\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"9368\" width=\"200\" height=\"200\"><path d=\"M685.4 354.8c0-4.4-3.6-8-8-8l-66 0.3L512 465.6l-99.3-118.4-66.1-0.3c-4.4 0-8 3.5-8 8 0 1.9 0.7 3.7 1.9 5.2l130.1 155L340.5 670c-1.2 1.5-1.9 3.3-1.9 5.2 0 4.4 3.6 8 8 8l66.1-0.3L512 564.4l99.3 118.4 66 0.3c4.4 0 8-3.5 8-8 0-1.9-0.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z\" p-id=\"9369\" fill=\"%23666666\"></path><path d=\"M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z\" p-id=\"9370\" fill=\"%23666666\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 30px;\n}\n.pictool-module-panel .pictool-panel-navigation {\n  position: absolute;\n  height: 80px;\n  width: 100%;\n  bottom: 0;\n  background: #2196f30d;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.pictool-module-panel .pictool-panel-navlist {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  -webkit-overflow-scrolling: touch;\n}\n.pictool-module-panel .pictool-panel-navlist.panel-beyond-width {\n  display: block;\n}\n.pictool-module-panel .pictool-panel-navlist.panel-beyond-width .pictool-panel-nav-btn {\n  width: 80px;\n  display: block;\n  float: left;\n}\n.pictool-module-panel .pictool-panel-nav-btn {\n  flex: 1;\n  text-align: center;\n  font-size: 14px;\n  position: relative;\n  padding-top: 40px;\n}\n.pictool-module-panel .pictool-panel-nav-btn.panelnav-icon::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background: url('data:image/svg+xml;charset=utf-8,<svg t=\"1561214557317\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"8147\" width=\"200\" height=\"200\"><path d=\"M336 421m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z\" p-id=\"8148\" fill=\"%23666666\"></path><path d=\"M688 421m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z\" p-id=\"8149\" fill=\"%23666666\"></path><path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2-44.3-18.7-84.1-45.6-118.3-79.8-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8c18.7-44.3 45.6-84.1 79.8-118.3 34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2 44.3 18.7 84.1 45.6 118.3 79.8 34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8c-18.7 44.3-45.6 84.1-79.8 118.2z\" p-id=\"8150\" fill=\"%23666666\"></path><path d=\"M664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-0.3-4.2-3.9-7.4-8.1-7.4H360c-4.6 0-8.2 3.8-8 8.4 4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6c0.2-4.6-3.4-8.4-8-8.4z\" p-id=\"8151\" fill=\"%23666666\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  background-size: 30px;\n}\n.pictool-module-panel .pictool-panel-nav-btn.panelnav-active {\n  color: #17abe3;\n}\n.pictool-module-panel .pictool-panel-nav-btn.panelnav-active.panelnav-icon::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background: url('data:image/svg+xml;charset=utf-8,<svg t=\"1561299983080\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"9592\" width=\"200\" height=\"200\"><path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zM288 421c0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48-48-21.5-48-48z m224 272c-85.5 0-155.6-67.3-160-151.6-0.2-4.6 3.4-8.4 8-8.4h48.1c4.2 0 7.8 3.2 8.1 7.4C420 589.9 461.5 629 512 629s92.1-39.1 95.8-88.6c0.3-4.2 3.9-7.4 8.1-7.4H664c4.6 0 8.2 3.8 8 8.4-4.4 84.3-74.5 151.6-160 151.6z m176-224c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z\" p-id=\"9593\" fill=\"%2317abe3\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center bottom;\n  background-size: 30px;\n}\n";
  styleInject(css$6);

  var Panel = /** @class */ (function () {
      function Panel(opts) {
          this._actionSheet = null;
          this._opts = null;
          this._hasRendered = false;
          this._opts = opts;
          var that = this;
          var zIndex = opts.zIndex, mount = opts.mount;
          var actionSheetOpts = {
              height: 120,
              mount: mount,
              zIndex: zIndex,
              afterRender: function (args) {
                  var contentMount = args.contentMount;
                  that._render(contentMount);
              },
              beforeHide: function () {
                  eventHub.trigger('GlobalEvent.moduleDashboard.progress.hide');
              }
          };
          var actionSheet = new ActionSheet(actionSheetOpts);
          this._actionSheet = actionSheet;
      }
      Panel.prototype.show = function () {
          this._actionSheet.show();
      };
      Panel.prototype.hide = function () {
          this._actionSheet.hide();
      };
      Panel.prototype._render = function (mount) {
          if (this._hasRendered === true) {
              return;
          }
          var opts = this._opts;
          var navList = opts.navList, title = opts.title;
          var isBeyond = navList.length > 4;
          var html = "\n      <div class=\"pictool-module-panel\">\n        <div class=\"pictool-panel-header\">\n          <div class=\"pictool-panel-btn-close\"></div>\n          <div class=\"pictool-panel-title\">" + (title || '') + "</div>\n        </div>\n        <div class=\"pictool-panel-navigation\">\n          <div class=\"pictool-panel-navlist " + (isBeyond === true ? 'panel-beyond-width' : '') + "\" \n            style=\"" + (isBeyond === true ? "width: " + (navList.length + 1) * 120 + "px" : '') + "\"\n          >\n          " + (istype.array(navList) && navList.map(function (nav, idx) {
              return " \n            <div class=\"pictool-panel-nav-btn panelnav-icon\"\n              data-panel-nav-idx=\"" + idx + "\"\n            >\n              <span>" + nav.name + "</span>\n            </div>\n            ";
          }).join('')) + "\n          </div>\n        </div>\n      </div>\n    ";
          mount.innerHTML = html;
          this._registerEvent(mount);
          this._hasRendered = true;
      };
      Panel.prototype._registerEvent = function (mount) {
          if (this._hasRendered === true) {
              return;
          }
          var that = this;
          var opts = this._opts;
          var navList = opts.navList;
          var navElemList = mount.querySelectorAll('[data-panel-nav-idx]');
          var btnClose = mount.querySelector('div.pictool-panel-btn-close');
          btnClose.addEventListener('click', function () {
              that.hide();
          });
          if (istype.nodeList(navElemList) === true) {
              navElemList.forEach(function (navElem) {
                  navElem.addEventListener('click', function (event) {
                      var elem = this;
                      var idx = elem.getAttribute('data-panel-nav-idx') * 1;
                      var navConf = navList[idx];
                      var primise = navConf.feedback();
                      if (istype.promise(primise)) {
                          primise.then(function (rs) {
                              if (rs) {
                                  eventHub.trigger('GlobalEvent.moduleSketch.renderImage', rs);
                              }
                          }).catch(function (err) {
                              console.log(err);
                          });
                      }
                      else if (istype.null(primise) !== true) {
                          console.warn('feedback is not a promise or null');
                      }
                      navElemList.forEach(function (nav) {
                          nav.classList.remove('panelnav-active');
                      });
                      elem.classList.add('panelnav-active');
                  });
              });
          }
      };
      return Panel;
  }());
  //# sourceMappingURL=index.js.map

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

  var RGBA_MID = 255 / 2;
  var RGBA_MAX = 255;
  var RGBA_MIN = 0;
  var H_MAX = 360;
  var S_MAX = 100;
  var L_MAX = 100;
  //# sourceMappingURL=static.js.map

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

  var process = {
      grayscale: grayscale,
      sobel: sobel,
      invert: invert,
      hue: hue,
      saturation: saturation,
      lightness: lightness,
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
  var imageData2DigitImageData = function (imgData) {
      var data = imgData.data, width = imgData.width, height = imgData.height;
      var digitImgData = new DigitImageData({ width: width, height: height, data: data });
      return digitImgData;
  };
  //# sourceMappingURL=image-data.js.map

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
          if (process && typeof process[method] !== 'function') {
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
          if (this._digitImageData) {
              this._digitImageData.destory();
              this._digitImageData = null;
          }
      };
      return Effect;
  }());
  //# sourceMappingURL=index.js.map

  var origin = function (opts) {
      var imageData = opts.imageData;
      return imageData;
  };
  // base image process filter
  var grayscale$1 = function (opts) {
      var imageData = opts.imageData;
      var effect = new Effect(imageData);
      var rsImageData = effect.process('grayscale').getImageData();
      effect.destory();
      effect = null;
      return rsImageData;
  };
  var hue$1 = function (opts) {
      var imageData = opts.imageData, options = opts.options;
      var effect = new Effect(imageData);
      var rsImageData = effect.process('hue', options).getImageData();
      effect.destory();
      effect = null;
      return rsImageData;
  };
  var lightness$1 = function (opts) {
      var imageData = opts.imageData, options = opts.options;
      var effect = new Effect(imageData);
      var rsImageData = effect.process('lightness', options).getImageData();
      effect.destory();
      effect = null;
      return rsImageData;
  };
  var saturation$1 = function (opts) {
      var imageData = opts.imageData, options = opts.options;
      var effect = new Effect(imageData);
      var rsImageData = effect.process('saturation', options).getImageData();
      effect.destory();
      effect = null;
      return rsImageData;
  };
  var invert$1 = function (opts) {
      var imageData = opts.imageData, options = opts.options;
      var effect = new Effect(imageData);
      var rsImageData = effect.process('invert', options).getImageData();
      effect.destory();
      effect = null;
      return rsImageData;
  };
  var sobel$1 = function (opts) {
      var imageData = opts.imageData, options = opts.options;
      var effect = new Effect(imageData);
      var rsImageData = effect.process('sobel', options).getImageData();
      effect.destory();
      effect = null;
      return rsImageData;
  };
  // multiple image process filter
  var lineDrawing = function (opts) {
      var imageData = opts.imageData, options = opts.options;
      var effect = new Effect(imageData);
      var rsImageData = effect.process('sobel', options).process('invert', options).getImageData();
      effect.destory();
      effect = null;
      return rsImageData;
  };
  var natural = function (opts) {
      var imageData = opts.imageData, options = opts.options;
      var effect = new Effect(imageData);
      var rsImageData = effect.process('saturation', { percent: 76 }).getImageData();
      effect.destory();
      effect = null;
      return rsImageData;
  };
  //# sourceMappingURL=index.js.map

  var filterMap = /*#__PURE__*/Object.freeze({
    origin: origin,
    grayscale: grayscale$1,
    hue: hue$1,
    lightness: lightness$1,
    saturation: saturation$1,
    invert: invert$1,
    sobel: sobel$1,
    lineDrawing: lineDrawing,
    natural: natural
  });

  var syncWorker = function (action, config) {
      var key = action.key, param = action.param, feedback = action.feedback;
      if (config && config.use === true) {
          var path = config.path;
          var worker_1 = new Worker(path);
          worker_1.onmessage = function (event) {
              if (typeof feedback === 'function') {
                  feedback(event.data.result, event.data.error);
                  worker_1.terminate();
              }
          };
          worker_1.onerror = function (err) {
              if (typeof feedback === 'function') {
                  feedback(null, err.message);
                  worker_1.terminate();
              }
          };
          worker_1.postMessage({
              key: key,
              param: param,
          });
      }
      else {
          setTimeout(function () {
              var error = null;
              var result = null;
              try {
                  var filerAction = filterMap[key];
                  result = filerAction(param);
              }
              catch (err) {
                  error = err;
              }
              feedback(result, error);
          }, 1);
      }
  };
  var asyncWorker = function (action, config) {
      return new Promise(function (resolve, reject) {
          try {
              var asyncAction = {
                  key: action.key,
                  param: action.param,
                  feedback: function (result, err) {
                      if (!err) {
                          resolve(result);
                      }
                      else {
                          reject(err);
                      }
                  }
              };
              syncWorker(asyncAction, config);
          }
          catch (err) {
              reject(err);
          }
      });
  };
  //# sourceMappingURL=worker.js.map

  var adjustMenuConfig = {
      title: 'Adjustment',
      menu: [
          {
              name: 'Lightness',
              percent: 50,
              range: {
                  min: -100,
                  max: 100,
              },
              filter: 'lightness',
              parseOptions: function (data) {
                  var percent = Math.round(data.value);
                  console.log('lightness.percent = ', percent);
                  return {
                      percent: percent,
                  };
              }
          },
          {
              name: 'Hue',
              percent: 50,
              range: {
                  min: 0,
                  max: 360,
              },
              filter: 'hue',
              parseOptions: function (data) {
                  var value = Math.round(data.value);
                  console.log('hue.value = ', value);
                  return {
                      value: value,
                  };
              }
          },
          {
              name: 'Saturation',
              percent: 50,
              range: {
                  min: -100,
                  max: 100,
              },
              filter: 'saturation',
              parseOptions: function (data) {
                  var percent = Math.round(data.value);
                  console.log('saturation.percent = ', percent);
                  return {
                      percent: percent,
                  };
              }
          },
      ]
  };
  //# sourceMappingURL=adjust.js.map

  var effectMenuConfig = {
      title: 'Effect',
      menu: [
          {
              name: 'Origin',
              filter: 'origin',
          },
          {
              name: 'LineDrawing',
              filter: 'lineDrawing',
          },
          {
              name: 'Natural',
              filter: 'natural',
          }
      ]
  };
  //# sourceMappingURL=effect.js.map

  var processMenuConfig = {
      title: 'Process',
      menu: [
          {
              name: 'Origin',
              filter: 'origin',
          },
          {
              name: 'Grayscale',
              filter: 'grayscale',
          },
          {
              name: 'Sobel',
              filter: 'sobel',
          },
          {
              name: 'Invert',
              filter: 'invert',
          }
      ]
  };
  //# sourceMappingURL=process.js.map

  var Dashboard = /** @class */ (function () {
      function Dashboard(mount, opts) {
          this._mount = null;
          this._opts = null;
          this._hasRendered = false;
          this._mount = mount;
          this._opts = opts;
          this._render();
      }
      Dashboard.prototype._render = function () {
          if (this._hasRendered === true) {
              return;
          }
          var options = this._opts;
          var zIndex = options.zIndex;
          var html = "\n      <div class=\"pictool-module-dashboard\" style=\"z-index:" + zIndex + ";\">\n        <div class=\"pictool-dashboard-navlist\">\n          <div class=\"pictool-dashboard-nav-btn dashboard-process\" data-nav-action=\"process\" >\n            <span>" + processMenuConfig.title + "</span>\n          </div>\n          <div class=\"pictool-dashboard-nav-btn dashboard-adjust\" data-nav-action=\"adjust\" >\n            <span>" + adjustMenuConfig.title + "</span>\n          </div>\n          <div class=\"pictool-dashboard-nav-btn dashboard-effect\" data-nav-action=\"effect\" >\n            <span>" + effectMenuConfig.title + "</span>\n          </div>\n        </div>\n      </div>\n    ";
          this._mount.innerHTML = html;
          this._registerEvent();
          this._hasRendered = true;
      };
      Dashboard.prototype._registerEvent = function () {
          if (this._hasRendered === true) {
              return;
          }
          var options = this._opts;
          var zIndex = options.zIndex, workerConfig = options.workerConfig;
          var btnEffect = this._mount.querySelector('[data-nav-action="effect"]');
          var btnAdjust = this._mount.querySelector('[data-nav-action="adjust"]');
          var btnProcess = this._mount.querySelector('[data-nav-action="process"]');
          // const opts : ActionSheetOpts = {
          //   mount: this._mount,
          //   height: 120,
          //   zIndex: zIndex + 1,
          // };
          var processPanel = this._initProcessPanel();
          btnProcess.addEventListener('click', function () {
              processPanel.show();
          });
          var filterEffect = this._initEffectPanel();
          btnEffect.addEventListener('click', function () {
              filterEffect.show();
          });
          var adjustPanel = this._initAdjustPanel();
          btnAdjust.addEventListener('click', function () {
              adjustPanel.show();
          });
          var progress = new Progress({
              mount: this._mount,
              percent: 40,
              max: 100,
              min: 0,
              customStyle: {
                  'z-index': zIndex + 1,
                  'position': 'fixed',
                  'bottom': '140px',
                  'left': '5%',
                  'right': '5%',
                  'width': 'auto',
              },
              // TODO
              onChange: function (data) {
                  console.log('data =', data);
              }
          });
          progress.hide();
          eventHub.on('GlobalEvent.moduleDashboard.progress.show', function (opts) {
              if (opts === void 0) { opts = {}; }
              var percent = opts.percent, onChange = opts.onChange, range = opts.range;
              progress.resetRange(range.min, range.max);
              progress.resetOnChange(onChange);
              progress.resetPercent(percent);
              progress.show();
          });
          eventHub.on('GlobalEvent.moduleDashboard.progress.hide', function () {
              progress.resetOnChange(null);
              progress.resetPercent(50);
              progress.resetRange(0, 100);
              progress.hide();
          });
          var loading = new Loading({
              zIndex: zIndex + 1000,
          });
          eventHub.on('GlobalEvent.moduleDashboard.loading.show', function (opts) {
              var timeout = -1;
              if (opts && opts.timeout > 0) {
                  timeout = opts.timeout;
              }
              loading.show(timeout);
          });
          eventHub.on('GlobalEvent.moduleDashboard.loading.hide', function () {
              loading.hide();
          });
      };
      Dashboard.prototype._initProcessPanel = function () {
          var options = this._opts;
          var zIndex = options.zIndex, workerConfig = options.workerConfig;
          var panel = new Panel({
              title: processMenuConfig.title,
              mount: this._mount,
              zIndex: zIndex + 1,
              navList: processMenuConfig.menu.map(function (conf) {
                  return {
                      name: conf.name,
                      feedback: function () {
                          var sketchSchema = cacheHub.get('Sketch.originSketchSchema');
                          var imageData = schemaParser.parseImageData(sketchSchema);
                          return new Promise(function (resolve, reject) {
                              eventHub.trigger('GlobalEvent.moduleDashboard.loading.show');
                              asyncWorker({
                                  key: conf.filter,
                                  param: { imageData: imageData, options: {} }
                              }, workerConfig).then(function (rs) {
                                  eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                                  var newSchema = schemaParser.parseImageDataToSchema(rs);
                                  resolve(newSchema);
                              }).then(function (err) {
                                  eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                                  reject(err);
                              });
                          });
                      }
                  };
              }),
          });
          return panel;
      };
      Dashboard.prototype._initEffectPanel = function () {
          var options = this._opts;
          var zIndex = options.zIndex, workerConfig = options.workerConfig;
          var panel = new Panel({
              title: effectMenuConfig.title,
              mount: this._mount,
              zIndex: zIndex + 1,
              navList: effectMenuConfig.menu.map(function (conf) {
                  return {
                      name: conf.name,
                      feedback: function () {
                          var sketchSchema = cacheHub.get('Sketch.originSketchSchema');
                          var imageData = schemaParser.parseImageData(sketchSchema);
                          return new Promise(function (resolve, reject) {
                              eventHub.trigger('GlobalEvent.moduleDashboard.loading.show');
                              asyncWorker({
                                  key: conf.filter,
                                  param: { imageData: imageData, options: {} }
                              }, workerConfig).then(function (rs) {
                                  eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                                  var newSchema = schemaParser.parseImageDataToSchema(rs);
                                  resolve(newSchema);
                              }).then(function (err) {
                                  eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                                  reject(err);
                              });
                          });
                      }
                  };
              }),
          });
          return panel;
      };
      Dashboard.prototype._initAdjustPanel = function () {
          var options = this._opts;
          var zIndex = options.zIndex, workerConfig = options.workerConfig;
          var panel = new Panel({
              title: adjustMenuConfig.title,
              mount: this._mount,
              zIndex: zIndex + 1,
              navList: adjustMenuConfig.menu.map(function (conf) {
                  return {
                      name: conf.name,
                      feedback: function () {
                          var sketchSchema = cacheHub.get('Sketch.originSketchSchema');
                          var imageData = schemaParser.parseImageData(sketchSchema);
                          eventHub.trigger('GlobalEvent.moduleDashboard.progress.show', {
                              percent: conf.percent,
                              range: { max: conf.range.max, min: conf.range.min },
                              onChange: function (data) {
                                  eventHub.trigger('GlobalEvent.moduleDashboard.loading.show');
                                  asyncWorker({
                                      key: conf.filter,
                                      param: { imageData: imageData, options: conf.parseOptions(data), }
                                  }, workerConfig).then(function (rs) {
                                      var newSchema = schemaParser.parseImageDataToSchema(rs);
                                      eventHub.trigger('GlobalEvent.moduleSketch.renderImage', newSchema);
                                      eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                                  }).catch(function (err) {
                                      console.log(err);
                                      eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                                  });
                              }
                          });
                          return null;
                      }
                  };
              }),
          });
          return panel;
      };
      return Dashboard;
  }());
  //# sourceMappingURL=index.js.map

  var css$7 = ".pictool-module-header {\n  position: relative;\n  font-size: 14px;\n  color: #ffffff;\n}\n.pictool-module-header .pictool-header-btn-close {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 60px;\n  height: 40px;\n}\n.pictool-module-header .pictool-header-btn-close::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: url('data:image/svg+xml;charset=utf-8,<svg t=\"1561213055281\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"9866\" width=\"200\" height=\"200\"><path d=\"M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z\" p-id=\"9867\" fill=\"%23ffffff\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 30px;\n}\n.pictool-module-header .pictool-header-btn-save {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 60px;\n  height: 40px;\n}\n.pictool-module-header .pictool-header-btn-save::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: url('data:image/svg+xml;charset=utf-8,<svg t=\"1561213166782\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"10077\" width=\"200\" height=\"200\"><path d=\"M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184z m456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840z\" p-id=\"10078\" fill=\"%23ffffff\"></path><path d=\"M512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144-64.5-144-144-144z m0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z\" p-id=\"10079\" fill=\"%23ffffff\"></path></svg>');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 30px;\n}\n";
  styleInject(css$7);

  var Header = /** @class */ (function () {
      function Header(mount, opts) {
          this._mount = null;
          this._opts = null;
          this._hasRendered = false;
          this._mount = mount;
          this._opts = opts;
          this._render();
      }
      Header.prototype._render = function () {
          if (this._hasRendered === true) {
              return;
          }
          var html = "\n      <div class=\"pictool-module-header\">\n        <div class=\"pictool-header-btn-close\"></div>\n        <div class=\"pictool-header-btn-save\"></div>\n      </div>\n    ";
          this._mount.innerHTML = html;
          this._registerEvent();
          this._hasRendered = true;
      };
      Header.prototype._registerEvent = function () {
          var btnClose = this._mount.querySelector('div.pictool-header-btn-close');
          var btnSave = this._mount.querySelector('div.pictool-header-btn-save');
          var options = this._opts;
          btnClose.addEventListener('click', function () {
              if (istype.function(options.closeFeedback)) {
                  options.closeFeedback();
              }
          });
          btnSave.addEventListener('click', function () {
              if (istype.function(options.saveFeedback)) {
                  options.saveFeedback();
              }
          });
      };
      return Header;
  }());
  //# sourceMappingURL=index.js.map

  var ZINDEX = 1000;
  var PictoolUI = /** @class */ (function () {
      function PictoolUI(imageData, options) {
          if (options === void 0) { options = { uiConfig: {}, workerConfig: { use: false, path: '' } }; }
          this._imageData = null;
          this._sketch = null;
          this._dashboard = null;
          this._header = null;
          this._imageData = imageData;
          this._options = options;
          var _a = options.uiConfig, uiConfig = _a === void 0 ? {} : _a, workerConfig = options.workerConfig;
          var zIndex = uiConfig.zIndex;
          if (!(zIndex * 1 > 0)) {
              zIndex = ZINDEX;
          }
          var that = this;
          var mask = new Mask({
              zIndex: zIndex,
              afterRender: function (opts) {
                  var contentMount = opts.contentMount, headerMount = opts.headerMount, footerMount = opts.footerMount;
                  var header = new Header(headerMount, {
                      closeFeedback: function () {
                          mask.hide();
                      },
                      saveFeedback: function () {
                          eventHub.trigger('GlobalEvent.moduleSketch.downloadImage');
                      }
                  });
                  var sketch = new Sketch$1(contentMount, { imageData: imageData, });
                  var dashboard = new Dashboard(footerMount, {
                      zIndex: zIndex + 1,
                      workerConfig: workerConfig,
                  });
                  that._sketch = sketch;
                  that._dashboard = dashboard;
                  that._header = header;
              }
          });
          this._mask = mask;
      }
      PictoolUI.prototype.show = function () {
          var sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          this._sketch.renderImage(sketchSchema);
          this._mask.show();
          eventHub.trigger('GlobalEvent.moduleSketch.resizeCanvas');
      };
      PictoolUI.prototype.hide = function () {
          this._mask.hide();
      };
      return PictoolUI;
  }());
  //# sourceMappingURL=index.js.map

  //# sourceMappingURL=ui.js.map

  return PictoolUI;

}));
//# sourceMappingURL=ui.js.map
