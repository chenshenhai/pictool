import './index.less';

import { ActionSheet, } from '../../component/action-sheet/index';

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
          <div class="pictool-nav-btn" data-nav-action="filter" >滤镜</div>
          <div class="pictool-nav-btn" data-nav-action="edit" >编辑</div>
          <div class="pictool-nav-btn" data-nav-action="text" >文字</div>
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


    
    btnFiler.addEventListener('click', function() {
      setTimeout(function() {
        const filterActionSheet = new ActionSheet({
          height: 80,
        });
        filterActionSheet.show();
      }, 0);
      console.log('filter');
    });
    btnEdit.addEventListener('click', function() {
      console.log('edit')
    });
    btnText.addEventListener('click', function() {
      console.log('text')
    });
  }


}
