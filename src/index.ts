import { Mask, MaskAfterRenderArgs } from './component/mask/index';
import { Sketch as ModSketch } from './module/sketch/index';
import { Dashboard } from './module/dashboard/index';
import { SketchSchema } from './core/sketch';
import schemaParser from './service/schema-parser';

class Pictool {
  private _options: any;
  private _mask: Mask;
  private _imageData: ImageData = null;
  private _sketch: ModSketch = null;
  private _dashboard: Dashboard = null;

  constructor(imageData, options = {}) {
    this._imageData = imageData;
    this._options = options;

    const that = this;
    this._mask = new Mask({
      afterRender(opts: MaskAfterRenderArgs) {
        const {contentMount, headerMount, footerMount } = opts;
        const sketch = new ModSketch(contentMount, { imageData, });
        const dashboard = new Dashboard(footerMount, {})
        that._sketch = sketch;
        that._dashboard = dashboard;
      }
    });
  }

  show() {
    const imageData = this._imageData;
    const sketchSchema: SketchSchema = schemaParser.getInitSchema(imageData);
    this._sketch.renderImage(sketchSchema);
    this._mask.show();
  }

  hide() {
    this._mask.hide();
  }
}

export default Pictool;