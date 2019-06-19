import './index.less';

export interface sketchOpts {
  // TODO
}

export class Sketch {
  private _mount: HTMLElement = null;
  private _opts: sketchOpts = null;
  private _hasRendered: boolean = false;

  constructor(mount: HTMLElement, opts: sketchOpts) {
    this._mount = mount;
    this._opts = opts;
    this._render();
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
              <canvas></canvas>
            </div>
          </div>
        </div>
      </div>
    `;
    this._mount.innerHTML = html;
    this._hasRendered = true;
  }
  
}

