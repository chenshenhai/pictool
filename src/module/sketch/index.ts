import './index.less';

import canvasRender from './../../core/canvas/render';

export interface SketchOpts {
  imageData: ImageData;
}

export class Sketch {
  private _mount: HTMLElement = null;
  private _opts: SketchOpts = null;
  private _hasRendered: boolean = false;

  constructor(mount: HTMLElement, opts: SketchOpts) {
    this._mount = mount;
    this._opts = opts;
    this._render();
  }

  renderImage() {
    const { imageData, } = this._opts;
    const canvas = this._mount.querySelector('canvas.pictool-sketch-canvas');
    canvasRender.renderImageData(canvas, imageData);
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
      </div>
    `;
    this._mount.innerHTML = html;
    this._hasRendered = true;
  }
  
}

