import './index.less';

import canvasRender from './../../../core/canvas/render';
import { SketchSchema } from './../../../core/sketch/index';
import { Sketchpad, SketchpadOptions } from './../../../core/sketchpad/index';
import eventHub from './../../service/event-hub';
import cacheHub from './../../service/cache-hub';
import schemaParser from './../../service/schema-parser';

export interface SketchOpts {
  imageData: ImageData;
}

export class Sketch {
  private _mount: HTMLElement = null;
  private _opts: SketchOpts = null;
  private _hasRendered: boolean = false;
  private _sketchpad: Sketchpad = null;

  constructor(mount: HTMLElement, opts: SketchOpts) {
    const that = this;
    this._mount = mount;
    this._opts = opts;
    this._render();

    const { imageData, } = this._opts;
    const hiddenSketchpad: HTMLElement = this._mount.querySelector('div.pictool-sketch-hidden-area-sketchpad');
    const height: number = imageData.height;
    const width: number = imageData.width;
    const layerCount: number = 2;
    const padOpts : SketchpadOptions = {
      height,
      width,
      layerCount,
      container: hiddenSketchpad,
    }
    const sketchpad = new Sketchpad(padOpts);
    this._sketchpad = sketchpad;

    const originSketchSchema = schemaParser.parseImageDataToSchema(imageData);
    cacheHub.set('Sketch.originSketchSchema', originSketchSchema);

    eventHub.on('GlobalEvent.moduleSketch.renderImage', function(schema) {
      that.renderImage(schema);
    });
    eventHub.on('GlobalEvent.moduleSketch.downloadImage', function() {
      sketchpad.downloadImage('download-pictool.png');
    });
  }

  renderImage(sketchSchema: SketchSchema) {
    const sketchpad = this._sketchpad;
    sketchpad.render(sketchSchema);
    const mergeImageData = sketchpad.mergeLayer();
    const canvas = this._mount.querySelector('canvas.pictool-sketch-canvas');
    canvasRender.renderImageData(canvas, mergeImageData);

    cacheHub.set('Sketch.sketchSchema', sketchSchema);
  }

  private _render() {
    if (this._hasRendered === true) {
      return;
    }
    const html = `
      <div class="pictool-module-sketch">
        <div class="pictool-sketch-container">
          <div class="pictool-sketch-main">
            <div class="pictool-sketch-entity">
              <canvas class="pictool-sketch-canvas"></canvas>
            </div>
          </div>
        </div>
        <div class="pictool-sketch-hidden-area">
          <div class="pictool-sketch-hidden-area-sketchpad"></div>
        </div>
      </div>
    `;
    this._mount.innerHTML = html;
    this._hasRendered = true;
  }
  
}

