import './index.less';

import { ActionSheet, ActionSheetOpts, } from '../../component/action-sheet/index';
import { Progress } from './../../component/progress';
import { Panel, PanelOpts, } from '../panel/index';
import cacheHub from './../../service/cache-hub';
import eventHub from './../../service/event-hub';
import schemaParser from './../../service/schema-parser';
import { WorkerConfig } from './../../service/worker';
import { asyncWorker } from './../../service/worker';


export interface DashboardOpts {
  zIndex: number;
  workerConfig: WorkerConfig;
}


export class Dashboard {
  private _mount: HTMLElement = null;
  private _opts: DashboardOpts = null;
  private _hasRendered: boolean = false;

  constructor(mount: HTMLElement, opts: DashboardOpts) {
    this._mount = mount;
    this._opts = opts;
    this._render();
  }

  private _render() {
    if (this._hasRendered === true) {
      return;
    }
    const options: DashboardOpts = this._opts;
    const { zIndex, } = options;
    const html = `
      <div class="pictool-module-dashboard" style="z-index:${zIndex};">
        <div class="pictool-dashboard-navlist">
          <div class="pictool-dashboard-nav-btn dashboard-filter" data-nav-action="filter" >
            <span>滤镜</span>
          </div>
          <div class="pictool-dashboard-nav-btn dashboard-adjust" data-nav-action="adjust" >
            <span>调节</span>
          </div>
          <div class="pictool-dashboard-nav-btn dashboard-edit" data-nav-action="edit" >
            <span>编辑</span>
          </div>
          <!--
          <div class="pictool-dashboard-nav-btn dashboard-text" data-nav-action="text" >
            <span>文字</span>
          </div>
          -->
        </div>
      </div>
    `;
    this._mount.innerHTML = html;
    this._registerEvent();
    this._hasRendered = true;
  }

  private _registerEvent() {
    if (this._hasRendered === true) {
      return;
    }
    const options: DashboardOpts = this._opts;
    const { zIndex, workerConfig, } = options;
    const btnFiler = this._mount.querySelector('[data-nav-action="filter"]');
    const btnAdjust = this._mount.querySelector('[data-nav-action="adjust"]');
    const btnEdit = this._mount.querySelector('[data-nav-action="edit"]');
    const btnText = this._mount.querySelector('[data-nav-action="text"]');

    const opts : ActionSheetOpts = {
      mount: this._mount,
      height: 120,
      zIndex: zIndex + 1,
    };
    const filterPanel = this._initFilterPanel();
    btnFiler.addEventListener('click', function() {      
      filterPanel.show();
    });

    const adjustPanel = this._initAdjustPanel();
    btnAdjust.addEventListener('click', function() {
      adjustPanel.show();
    });

    const editPanel = this._initEditPanel();
    btnEdit.addEventListener('click', function() {
      editPanel.show();
    });

    // btnText.addEventListener('click', function() {
    //   console.log('text')
    // });

    const progress = new Progress({
      mount: this._mount,
      percent: 40,
      customStyle: {
        'z-index': zIndex + 1,
        'position': 'fixed',
        'bottom': '100px',
        'left': '5%',
        'right': '5%',
        'width': 'auto',
      },
      onChange(data) {
        console.log('data =', data);
      }
    });
    progress.hide();

    eventHub.on('GlobalEvent.moduleDashboard.progress.show', function(opts = {}) {
      const { percent, onChange, } = opts;
      progress.resetOnChange(onChange);
      progress.resetPercent(percent);
      progress.show();
    });

    eventHub.on('GlobalEvent.moduleDashboard.progress.hide', function() {
      progress.resetOnChange(null);
      progress.resetPercent(50);
      progress.hide();
    });
  }

  private _initFilterPanel() {
    const options: DashboardOpts = this._opts;
    const { zIndex, workerConfig, } = options;
    const panel = new Panel({
      title: '滤镜',
      mount: this._mount,
      zIndex: zIndex + 1,
      navList: [{
        name: '原图',
        feedback() {
          // TODO
          const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          return Promise.resolve(sketchSchema);
        }
      }, {
        name: '黑白',
        feedback() {
          const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          const imageData = schemaParser.parseImageData(sketchSchema);
          // return asyncWorker({
          //   key: 'gray',
          //   param: { imageData, opts: {} }
          // }, workerConfig);
          return new Promise(function(resolve, reject) {
            asyncWorker({
              key: 'gray',
              param: { imageData, opts: {} }
            }, workerConfig).then(function(rs: ImageData) {
              const newSchema = schemaParser.parseImageDataToSchema(rs);
              resolve(newSchema);
            }).then(function(err) {
              reject(err);
            })
          });
        }
      }, {
        name: '人物识别',
        feedback() {
          const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          const imageData = schemaParser.parseImageData(sketchSchema);
          return new Promise(function(resolve, reject) {
            asyncWorker({
              key: 'personSkin',
              param: { imageData, opts: {} }
            }, workerConfig).then(function(rs: ImageData) {
              const newSchema = schemaParser.parseImageDataToSchema(rs);
              resolve(newSchema);
            }).then(function(err) {
              reject(err);
            })
          });
        }
      }]
    });
    return panel;
  }

  private _initAdjustPanel() {
    const options: DashboardOpts = this._opts;
    const { zIndex, } = options;
    const panel = new Panel({
      title: '调节',
      mount: this._mount,
      zIndex: zIndex + 1,
      navList: [{
        name: '亮度',
        feedback() {
          // TODO
          const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          return Promise.resolve(sketchSchema);
        }
      }, {
        name: '对比度',
        feedback() {
          // TODO
          const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          return Promise.resolve(sketchSchema);
        }
      }, {
        name: '饱和度',
        feedback() {
          // TODO
          const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          return Promise.resolve(sketchSchema);
        }
      }, {
        name: '锐化',
        feedback() {
          // TODO
          const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          return Promise.resolve(sketchSchema);
        }
      }, {
        name: '虚化',
        feedback() {
          // TODO
          const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          return Promise.resolve(sketchSchema);
        }
      }, ]
    });
    return panel;
  }

  private _initEditPanel() {
    const options: DashboardOpts = this._opts;
    const { zIndex, } = options;
    const panel = new Panel({
      title: '编辑',
      mount: this._mount,
      zIndex: zIndex + 1,
      navList: [{
        name: '旋转',
        feedback() {
          // TODO
          const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
          return Promise.resolve(sketchSchema);
        }
      }]
    });
    return panel;
  }

}
