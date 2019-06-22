// Copyright 2019 The Authors chenshenhai. All rights reserved. MIT license.
// https://github.com/chenshenhai/logox/blob/master/src/layer/mod.ts

import drawAction from './draw-action';

export interface LayerDrawAction {
  method: string;
  args: any;
}

export interface LayerOptions {
  width: number;
  height: number;
}

export interface LayerSchema {
  key?: string;
  drawActionList: LayerDrawAction[];
}

export class Layer {
  private _context: CanvasRenderingContext2D;
  private _layerSchema: LayerSchema;
  private _options: LayerOptions;

  constructor(context: CanvasRenderingContext2D, opts: LayerOptions) {
    this._context = context;
    this._options = opts;
  }

  getLayerContext() {
    return this._context;
  }

  clearDrawAction() {
    const { width, height } = this._options;
    this._context.clearRect(0, 0, width, height);
    this._layerSchema = {
      key: '',
      drawActionList: []
    };
  }


  private _executeDrawAction() {
    const schema: LayerSchema = this._layerSchema;
    const list: LayerDrawAction[] = schema.drawActionList;
    const context = this._context;
    for (let i = 0; i < list.length; i++) {
      const action = list[i];
      drawAction(context, action.method, action.args);
    }
  }

  draw(layerSchema: LayerSchema) {
    this._layerSchema = layerSchema;
    this._executeDrawAction();
  }

  getSchema(): LayerSchema {
    return this._layerSchema;
  }
}

