import { Mask, MaskAfterRenderArgs } from './component/mask/index';
import { Sketch } from './module/sketch/index';

class Pictool {
  private _options: any;
  private _mask: Mask;
  private _imageData: ImageData = null;
  private _sketch: Sketch = null;

  constructor(imageData, options = {}) {
    this._imageData = imageData;
    this._options = options;

    const that = this;
    this._mask = new Mask({
      afterRender(opts: MaskAfterRenderArgs) {
        const { contentMount, } = opts;
        const sketch = new Sketch(contentMount, { imageData, });
        sketch.renderImage();
        that._sketch = sketch;
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