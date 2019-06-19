import { Mask, MaskAfterRenderArgs } from './component/mask/index';
import { Sketch } from './module/sketch/index';
import { Dashboard } from './module/dashboard/index';

class Pictool {
  private _options: any;
  private _mask: Mask;
  private _imageData: ImageData = null;
  private _sketch: Sketch = null;
  private _dashboard: Dashboard = null;

  constructor(imageData, options = {}) {
    this._imageData = imageData;
    this._options = options;

    const that = this;
    this._mask = new Mask({
      afterRender(opts: MaskAfterRenderArgs) {
        const {contentMount, headerMount, footerMount } = opts;
        const sketch = new Sketch(contentMount, { imageData, });
        const dashboard = new Dashboard(footerMount, {})
        sketch.renderImage();
        that._sketch = sketch;
        that._dashboard = dashboard;
      }
    });
  }

  show() {
    this._mask.show();
  }

  hide() {
    this._mask.hide();
  }
}

export default Pictool;