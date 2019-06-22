// Copyright 2019 The Authors chenshenhai. All rights reserved. MIT license.
// https://github.com/chenshenhai/logox/blob/master/src/sketch/mod.ts


import {Layer, LayerDrawAction, LayerSchema } from './../layer/index';

export interface SketchOptions {
  width: number;
  height: number;
  layerCount: number;
}

export interface SketchSchema {
  name?: string;
  layerList: LayerSchema[];
}

export class Sketch {

  private _width: number;
  private _height: number;
  private _layerCount: number;
  private _canvasStack: HTMLCanvasElement[] = [];
  private _layerStack: Layer[] = [];
  private _tempCanvas: HTMLCanvasElement = null;
  // private _sketchSchema: SketchSchema;

  constructor(opts: SketchOptions) {
    this._width = opts.width;
    this._height = opts.height;
    this._layerCount = opts.layerCount;
    this._initSketch();
  }

  private _initSketch() {
    const width = this._width;
    const height = this._height;
    this._tempCanvas = document.createElement('canvas');
    this._tempCanvas.width = width;
    this._tempCanvas.height = height;

    const count = this._layerCount;
    for (let i = 0; i < count; i ++) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const layer = new Layer(ctx, { width, height });
      this._layerStack.push(layer);
      this._canvasStack.push(canvas);
    }
  }

  getCanvasStack() {
    return this._canvasStack;
  }

  getLayerStack() {
    return this._layerStack;
  }

  drawLayer(index: number, layerSchema: LayerSchema) {
    const layer: Layer = this._layerStack[index];
    layer.clearDrawAction();
    layer.draw(layerSchema);
  }

  drawAllLayer(sketchSchema: SketchSchema) {
    const layerSchemaList: LayerSchema[] = sketchSchema.layerList;
    layerSchemaList.forEach((layerSchema: LayerSchema, index: number) => {
      this.drawLayer(index, layerSchema);
    })
  }

  getSchema() {
    const layerList = [];
    this._layerStack.forEach((layer) => {
      const schema = layer.getSchema();
      layerList.push(schema);
    });
    return {
      layerList,
    }
  }

  mergeLayer() {
    const { _tempCanvas, _width, _height } = this;
    let tempContext = _tempCanvas.getContext('2d');
    tempContext.clearRect(0, 0, _width, _height);
    const canvasStack: HTMLCanvasElement[] = this._canvasStack;
    canvasStack.forEach((canvas: HTMLCanvasElement) => {
      tempContext.drawImage(canvas, 0, 0);
    })
    const mergeImageData = tempContext.getImageData(0, 0, _width, _height);
    tempContext.clearRect(0, 0, _width, _height);
    return mergeImageData;
  }

  moveUpLayer(index: number) {
    // TODO
  }

  moveDownLayer(index: number) {
    // TODO
  }

  
}