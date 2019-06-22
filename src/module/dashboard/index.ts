import './index.less';

import { ActionSheet, ActionSheetOpts, } from '../../component/action-sheet/index';
import { Panel, PanelOpts, } from '../panel/index';
import cacheHub from './../../service/cache-hub';
import eventHub from './../../service/event-hub';
import schemaParser from './../../service/schema-parser';
import filterGray from './../../core/filter/gray';


export interface DashboardOpts {
  // TODO
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
    const html = `
      <div class="pictool-module-dashboard">
        <div class="pictool-dashboard-navlist">
          <div class="pictool-dashboard-nav-btn dashboard-filter" data-nav-action="filter" >
            <span>滤镜</span>
          </div>
          <div class="pictool-dashboard-nav-btn dashboard-edit" data-nav-action="edit" >
            <span>编辑</span>
          </div>
          <div class="pictool-dashboard-nav-btn dashboard-text" data-nav-action="text" >
            <span>文字</span>
          </div>
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
    const btnFiler = this._mount.querySelector('[data-nav-action="filter"]');
    const btnEdit = this._mount.querySelector('[data-nav-action="edit"]');
    const btnText = this._mount.querySelector('[data-nav-action="text"]');

    const opts : ActionSheetOpts = {
      height: 120,
    };
    const filterPanel = this._initFilterPanel();

    btnFiler.addEventListener('click', function() {      
      filterPanel.show();
      console.log('filter');
    });
    btnEdit.addEventListener('click', function() {
      console.log('edit')
    });
    btnText.addEventListener('click', function() {
      console.log('text')
    });
  }

  private _initFilterPanel() {
    const panel = new Panel({
      navList: [{
        name: '灰白',
        feedback() {
          const sketchSchema = cacheHub.get('Sketch.sketchSchema');
          const imageData = schemaParser.parseImageData(sketchSchema);
          const grayImageData = filterGray.parseGrayImageData(imageData);
          const newSchema = schemaParser.updateSchemaImageData(sketchSchema, grayImageData);
          return Promise.resolve(newSchema);
        }
      }, {
        name: '柔和',
        feedback() {
          return Promise.resolve('nav filer warmth')
        }
      }]
    });
    return panel;
  }

}
