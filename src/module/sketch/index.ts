import './index.less';

import canvasRender from './../../core/canvas/render';
import { Sketchpad, SketchpadOptions } from './../../core/sketchpad/index'

export interface SketchOpts {
  imageData: ImageData;
}

export class Sketch {
  private _mount: HTMLElement = null;
  private _opts: SketchOpts = null;
  private _hasRendered: boolean = false;
  private _sketchpad: Sketchpad = null;

  constructor(mount: HTMLElement, opts: SketchOpts) {
    this._mount = mount;
    this._opts = opts;
    this._render();
  }

  renderImage() {
    const { imageData, } = this._opts;
    const hiddenSketchpad: HTMLElement = this._mount.querySelector('div.pictool-sketch-hidden-area-sketchpad');
    const height: number = imageData.height;
    const width: number = imageData.width;
    const layerCount: number = 2;
    const opts : SketchpadOptions = {
      height,
      width,
      layerCount,
      container: hiddenSketchpad,
    }
    const sketchpad = new Sketchpad(opts);
    const sketchSchema = {
      name: '',
      layerList: [
        { 
          drawActionList: [{
            method: 'clearRect',
            args: [0, 0, width, height],
          }, {
            method: 'putImageData',
            args: [imageData, 0, 0],
          }],
        },
        { 
          name: '',
          drawActionList: [{
            method: 'fillStyle',
            args: 'blue',
          }, {
            method: 'fillRect',
            args: [50, 100, 200, 100],
          }],
        },
      ]
    }
    sketchpad.render(sketchSchema);
    this._sketchpad = sketchpad;

    const mergeImageData = sketchpad.mergeLayer();
    const canvas = this._mount.querySelector('canvas.pictool-sketch-canvas');
    canvasRender.renderImageData(canvas, mergeImageData);
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

