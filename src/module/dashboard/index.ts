import './index.less';

import { ActionSheet, ActionSheetOpts, } from '../../component/action-sheet/index';
import { Panel, PanelOpts, } from '../panel/index';
import cacheHub from './../../global/cache-hub';


export interface DashboardOpts {
  // TODO
}

export class Dashboard {
  private _mount: HTMLElement = null;
  private _opts: DashboardOpts = null;
  private _hasRendered: boolean = false;

  constructor(mount, opts) {
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
          <div class="pictool-dashboard-nav-btn" data-nav-action="filter" >滤镜</div>
          <div class="pictool-dashboard-nav-btn" data-nav-action="edit" >编辑</div>
          <div class="pictool-dashboard-nav-btn" data-nav-action="text" >文字</div>
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
          return Promise.resolve(sketchSchema);
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
