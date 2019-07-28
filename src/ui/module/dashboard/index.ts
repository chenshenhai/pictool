import './index.less';
import browser from './../../../browser';
// import { ActionSheet, ActionSheetOpts, } from '../../component/action-sheet/index';
import { Progress, ProcessOnChangeData } from './../../component/progress';
import { Loading } from './../../component/loading/index';
import { Panel, PanelOpts, } from '../panel/index';
import cacheHub from './../../service/cache-hub';
import eventHub from './../../service/event-hub';
import schemaParser from './../../service/schema-parser';
import { WorkerConfig } from './../../service/worker';
import { asyncWorker } from './../../service/worker';

import { getAdjustMenuConfig, AdjustMenuConfigType, AdjustMenuItemType } from '../../config/adjust';
import { getEffectMenuConfig, EffectMenuConfigType, EffectMenuItemType } from '../../config/effect';
import { getProcessMenuConfig, ProcessMenuConfigType, ProcessMenuItemType } from '../../config/process';
import { getLanguage, LanguageType } from './../../language/index';


interface ReigisterEventType {
  processMenuConfig: ProcessMenuConfigType,
  effectMenuConfig: EffectMenuConfigType,
  adjustMenuConfig: AdjustMenuConfigType
}

export interface DashboardOpts {
  zIndex: number;
  language?: string;
  workerConfig: WorkerConfig;
}

export class Dashboard {
  private _mount: HTMLElement|null;
  private _opts: DashboardOpts;
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
    const options: DashboardOpts|null = this._opts;
    if (!options || !this._mount) {
      return;
    }
    const { zIndex, language, } = options;
    const lang: LanguageType = getLanguage(language);

    const processMenuConfig = getProcessMenuConfig(lang);
    const effectMenuConfig = getEffectMenuConfig(lang);
    const adjustMenuConfig = getAdjustMenuConfig(lang);


    const html = `
      <div class="pictool-module-dashboard" style="z-index:${zIndex};">
        <div class="pictool-dashboard-navlist">
          <div class="pictool-dashboard-nav-btn dashboard-process" data-nav-action="process" >
            <span>${processMenuConfig.title}</span>
          </div>
          <div class="pictool-dashboard-nav-btn dashboard-adjust" data-nav-action="adjust" >
            <span>${adjustMenuConfig.title}</span>
          </div>
          <div class="pictool-dashboard-nav-btn dashboard-effect" data-nav-action="effect" >
            <span>${effectMenuConfig.title}</span>
          </div>
        </div>
      </div>
    `;
    this._mount.innerHTML = html;

    this._registerEvent({
      processMenuConfig,
      effectMenuConfig,
      adjustMenuConfig
    });
    this._hasRendered = true;
  }

  private _registerEvent(configMap: ReigisterEventType) {
    if (this._hasRendered === true) {
      return;
    }
    const options: DashboardOpts|null = this._opts;
    if (!options || !this._mount) {
      return;
    }
    const { zIndex, workerConfig, } = options;
    const btnEffect = this._mount.querySelector('[data-nav-action="effect"]');
    const btnAdjust = this._mount.querySelector('[data-nav-action="adjust"]');
    const btnProcess = this._mount.querySelector('[data-nav-action="process"]');

    // const opts : ActionSheetOpts = {
    //   mount: this._mount,
    //   height: 120,
    //   zIndex: zIndex + 1,
    // };

    const processPanel = this._initProcessPanel(configMap.processMenuConfig);
    btnProcess && btnProcess.addEventListener('click', function() {      
      processPanel && processPanel.show();
    });

    const filterEffect = this._initEffectPanel(configMap.effectMenuConfig);
    btnEffect && btnEffect.addEventListener('click', function() {      
      filterEffect && filterEffect.show();
    });

    const adjustPanel = this._initAdjustPanel(configMap.adjustMenuConfig);
    btnAdjust && btnAdjust.addEventListener('click', function() {
      adjustPanel && adjustPanel.show();
    });

    const progress = new Progress({
      mount: this._mount,
      percent: 40,
      max: 100,
      min: 0,
      customStyle: {
        'z-index': zIndex + 1,
        'position': 'fixed',
        'bottom': '140px',
        'left': '5%',
        'right': '5%',
        'width': 'auto',
      },
      // TODO
      onChange(data: ProcessOnChangeData) {
        console.log('data =', data);
      }
    });
    progress.hide();

    eventHub.on('GlobalEvent.moduleDashboard.progress.show', function(opts: any) {
      const { percent, onChange, range, } = opts;
      progress.resetRange(range.min, range.max);
      progress.resetOnChange(onChange);
      progress.resetPercent(percent);
      progress.show();
    });

    eventHub.on('GlobalEvent.moduleDashboard.progress.hide', function() {
      progress.resetOnChange(null);
      progress.resetPercent(50);
      progress.resetRange(0, 100);
      progress.hide();
    });

    const loading = new Loading({
      zIndex: zIndex + 1000,
    });
    
    eventHub.on('GlobalEvent.moduleDashboard.loading.show', function(opts: any) {
      let timeout: number = -1;
      if (opts && opts.timeout > 0) {
        timeout = opts.timeout;
      }
      loading.show(timeout);
    });

    eventHub.on('GlobalEvent.moduleDashboard.loading.hide', function() {
      loading.hide();
    });

  }

  private _initProcessPanel(processMenuConfig: ProcessMenuConfigType) {
    const options: DashboardOpts = this._opts;
    if (!this._mount) {
      return null;
    }
    const { zIndex, workerConfig, } = options;
    const panel = new Panel({
      title: processMenuConfig.title,
      mount: this._mount,
      zIndex: zIndex + 1,
      navList: processMenuConfig.menu.map(function(conf: ProcessMenuItemType) {
        return {
          name: conf.name,
          feedback() {
            const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
            const originImgData = schemaParser.parseImageData(sketchSchema);
            const imageData = browser.util.imageData2DigitImageData(originImgData);
            return new Promise(function(resolve, reject) {
              eventHub.trigger('GlobalEvent.moduleDashboard.loading.show');
              asyncWorker({
                key: conf.filter,
                param: { imageData, options: {} }
              }, workerConfig).then(function(rs: ImageData) {
                eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                const newSchema = schemaParser.parseImageDataToSchema(rs);
                resolve(newSchema);
              }).catch(function(err: Error) {
                eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                reject(err);
              })
            });
          }
        }
      }),
    });
    return panel;
  }

  private _initEffectPanel(effectMenuConfig: EffectMenuConfigType) {
    const options: DashboardOpts = this._opts;
    if (!this._mount) {
      return null;
    }
    const { zIndex, workerConfig, } = options;
    const panel = new Panel({
      title: effectMenuConfig.title,
      mount: this._mount,
      zIndex: zIndex + 1,
      navList: effectMenuConfig.menu.map(function(conf: EffectMenuItemType) {
        return {
          name: conf.name,
          feedback() {
            const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
            const originImgData = schemaParser.parseImageData(sketchSchema);
            const imageData = browser.util.imageData2DigitImageData(originImgData);
      
            return new Promise(function(resolve, reject) {
              eventHub.trigger('GlobalEvent.moduleDashboard.loading.show');
              asyncWorker({
                key: conf.filter,
                param: { imageData, options: {} }
              }, workerConfig).then(function(rs: ImageData) {
                eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                const newSchema = schemaParser.parseImageDataToSchema(rs);
                resolve(newSchema);
              }).catch(function(err: Error) {
                eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                reject(err);
              })
            });
          }
        }
      }),
    });
    return panel;
  }

  private _initAdjustPanel(adjustMenuConfig: AdjustMenuConfigType): Panel|null|undefined {
    const options: DashboardOpts|null = this._opts;
    if (!options) {
      return;
    }
    const { zIndex, workerConfig, } = options;
    if (!this._mount) {
      return;
    }
    const panel = new Panel({
      title: adjustMenuConfig.title,
      mount: this._mount,
      zIndex: zIndex + 1,
      navList: adjustMenuConfig.menu.map(function(conf: AdjustMenuItemType) {
        return {
          name: conf.name,
          feedback() {
            const sketchSchema = cacheHub.get('Sketch.originSketchSchema');
            const originImgData = schemaParser.parseImageData(sketchSchema);
            const imageData = browser.util.imageData2DigitImageData(originImgData);
      
            eventHub.trigger('GlobalEvent.moduleDashboard.progress.show', {
              percent: conf.percent,
              range: {max: conf.range.max, min: conf.range.min },
              onChange: function(data: any) {
                eventHub.trigger('GlobalEvent.moduleDashboard.loading.show');
                asyncWorker({
                  key: conf.filter,
                  param: { imageData, options: conf.parseOptions(data), }
                }, workerConfig).then(function(rs: ImageData) {
                  const newSchema = schemaParser.parseImageDataToSchema(rs);
                  eventHub.trigger('GlobalEvent.moduleSketch.renderImage', newSchema);
                  eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                }).catch(function(err: Error) {
                  console.log(err);
                  eventHub.trigger('GlobalEvent.moduleDashboard.loading.hide');
                })
              }
            });
            return null;
          }
        }
      }),
    });
    return panel;
  }

}
