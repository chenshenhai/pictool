import { Mask, MaskAfterRenderArgs } from './component/mask/index';
import { Sketch as ModSketch } from './module/sketch/index';
import { Dashboard } from './module/dashboard/index';
import { SketchSchema } from '../core/sketch/index';
import { Header } from './module/header/index';
// import schemaParser from './service/schema-parser';
import { WorkerConfig } from './service/worker';
import eventHub from './service/event-hub';
import cacheHub from './service/cache-hub';

const ZINDEX = 1000;

interface PictoolOptsUIConfig {
  zIndex?: number;
  language?: string;
}

interface PictoolUIOpts{
  uiConfig?: PictoolOptsUIConfig;
  workerConfig: WorkerConfig;
}

class PictoolUI {
  private _options: any;
  private _mask: Mask;
  private _imageData: ImageData|null = null;
  private _sketch: ModSketch|null = null;
  private _dashboard: Dashboard|null = null;
  private _header: Header|null = null;

  constructor(imageData: ImageData, options: PictoolUIOpts= { uiConfig: {}, workerConfig: { use: false, path: '' }}) {
    this._imageData = imageData;
    this._options = options;
    const { uiConfig = {}, workerConfig } = options;
    let zIndex: number|undefined = uiConfig.zIndex;
    if (!(zIndex && zIndex * 1 > 0)) {
      zIndex = ZINDEX;
    }

    // const that = this;
    const mask = new Mask({
      zIndex,
      afterRender: (opts: MaskAfterRenderArgs) => {
        const {contentMount, headerMount, footerMount } = opts;
        const header = new Header(headerMount, {
          closeFeedback() {
            mask.hide();
          },
          saveFeedback() {
            eventHub.trigger('GlobalEvent.moduleSketch.downloadImage');
          }
        });
        const sketch = new ModSketch(contentMount, { imageData, });
        if (!(zIndex && zIndex * 1 > 0)) {
          zIndex = ZINDEX;
        }
        const dashboard = new Dashboard(footerMount, {
          zIndex: zIndex + 1,
          language: uiConfig.language || 'en-us',
          workerConfig,
        });
        this._sketch = sketch;
        this._dashboard = dashboard;
        this._header = header;
      }
    });
    this._mask = mask;
  }

  show() {
    const sketchSchema: SketchSchema = cacheHub.get('Sketch.originSketchSchema');
    this._sketch && this._sketch.renderImage(sketchSchema);
    this._mask.show();
    eventHub.trigger('GlobalEvent.moduleSketch.resizeCanvas');
  }

  hide() {
    this._mask.hide();
  }
}

export default PictoolUI;