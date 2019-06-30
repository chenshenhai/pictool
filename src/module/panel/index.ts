import { ActionSheet, ActionSheetOpts, ActionSheetLifeCycleArgs, } from '../../component/action-sheet/index';
import istype from '../../util/istype';
import eventHub from '../../service/event-hub';
import { SketchSchema } from '../../core/sketch';

import './index.less';

interface NavBtn {
  name: string;
  feedback(): Promise<any>|null;
  // useProgressBar?: boolean | false;
  receiveEventKey?: string | null;
}

export interface PanelOpts {
  title: string;
  navList: NavBtn[];
  zIndex: number;
  mount: HTMLElement;
}

export class Panel {
  private _actionSheet: ActionSheet = null;
  private _opts: PanelOpts = null;
  private _hasRendered: boolean = false;

  constructor(opts: PanelOpts) {
    this._opts = opts;
    const that = this;
    const { zIndex, mount, } = opts;
    const actionSheetOpts: ActionSheetOpts = {
      height: 120,
      mount,
      zIndex,
      afterRender(args: ActionSheetLifeCycleArgs) {
        const { contentMount, } = args;
        that._render(contentMount);
      },
      beforeHide: function() {
        eventHub.trigger('GlobalEvent.moduleDashboard.progress.hide');
      }
    }
    const actionSheet = new ActionSheet(actionSheetOpts);
    this._actionSheet = actionSheet;
  }

  show() {
    this._actionSheet.show();
  }

  hide() {
    this._actionSheet.hide();
  }

  private _render(mount: HTMLElement) {
    if (this._hasRendered === true) {
      return;
    }
    const opts: PanelOpts = this._opts;
    const { navList, title, } = opts;
    const isBeyond = navList.length > 4;
    const html = `
      <div class="pictool-module-panel">
        <div class="pictool-panel-header">
          <div class="pictool-panel-btn-close"></div>
          <div class="pictool-panel-title">${title || ''}</div>
        </div>
        <div class="pictool-panel-navigation">
          <div class="pictool-panel-navlist ${isBeyond === true ? 'panel-beyond-width' : ''}" 
            style="${isBeyond === true ? `width: ${(navList.length + 1) * 80}px` : ''}"
          >
          ${istype.array(navList) && navList.map(function(nav: NavBtn, idx) {
            return ` 
            <div class="pictool-panel-nav-btn panelnav-icon"
              data-panel-nav-idx="${idx}"
            >
              <span>${nav.name}</span>
            </div>
            `;
          }).join('')}
          </div>
        </div>
      </div>
    `;
    mount.innerHTML = html;
    this._registerEvent(mount);
    this._hasRendered = true;
  }

  private _registerEvent(mount: HTMLElement) {
    if (this._hasRendered === true) {
      return;
    }
    const that = this;
    const opts: PanelOpts = this._opts;
    const { navList, } = opts;
    const navElemList = mount.querySelectorAll('[data-panel-nav-idx]');
    const btnClose = mount.querySelector('div.pictool-panel-btn-close');

    btnClose.addEventListener('click', function() {
      that.hide();
    });

    if (istype.nodeList(navElemList) === true) {
      navElemList.forEach(function(navElem) {
        navElem.addEventListener('click', function(event) {

          const elem = this;
          const idx = elem.getAttribute('data-panel-nav-idx') * 1;
          const navConf = navList[idx];
          const primise = navConf.feedback();
          
          if (istype.promise(primise)) {
            primise.then(function(rs) {
              if (rs) {
                eventHub.trigger('GlobalEvent.moduleSketch.renderImage', rs)
              }
            }).catch((err) => {
              console.log(err);
            })
          } else {
            console.warn('feedback is not a promise')
          }
          navElemList.forEach(function(nav){
            nav.classList.remove('panelnav-active');
          })
          elem.classList.add('panelnav-active');
        });
      });
    }
    
  }

}
