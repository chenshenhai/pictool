import { ActionSheet, ActionSheetOpts, ActionSheetLifeCycleArgs, } from '../../component/action-sheet/index';
import istype from './../../util/istype';
import eventHub from './../../service/event-hub';

import './index.less';

interface NavBtn {
  name: string;
  feedback(): Promise<any>;
  // useProgressBar?: boolean | false;
  receiveEventKey?: string | null;
}

export interface PanelOpts {
  navList: NavBtn[];
}

export class Panel {
  private _actionSheet: ActionSheet = null;
  private _opts: PanelOpts = null;
  private _hasRendered: boolean = false;

  constructor(opts: PanelOpts) {
    this._opts = opts;
    const that = this;
    const actionSheetOpts: ActionSheetOpts = {
      height: 80,
      afterRender(args: ActionSheetLifeCycleArgs) {
        const { contentMount, } = args;
        that._render(contentMount);
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
    const { navList, } = opts;
    const html = `
      <div class="pictool-module-panel">
        <div class="pictool-panel-navlist">
        ${istype.array(navList) && navList.map(function(nav: NavBtn, idx) {
          return ` 
          <div class="pictool-panel-nav-btn"
            data-panel-nav-idx="${idx}"
          >
            <span>${nav.name}</span>
          </div>
          `;
        }).join('')}
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
    const opts: PanelOpts = this._opts;
    const { navList, } = opts;
    const navElemList = mount.querySelectorAll('[data-panel-nav-idx]');
    if (istype.nodeList(navElemList) !== true) {
      return;
    }
    navElemList.forEach(function(navElem) {
      navElem.addEventListener('click', function(event) {
        const elem = this;
        const idx = elem.getAttribute('data-panel-nav-idx') * 1;
        const navConf = navList[idx];
        const primise = navConf.feedback();
        // TODO
        console.log(idx);
        if (istype.promise(primise)) {
          primise.then(function(rs) {
            // console.log(rs);
            eventHub.trigger('GlobalModule.Sketch.renderImage', rs)
          }).catch((err) => {
            console.log(err);
          })
        }
        
      });
    });
  }

}
