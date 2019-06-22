import './index.less';
import istype from '../../util/istype';

export interface HeaderOpts {
  closeFeedback: Function;
  saveFeedback: Function;
}

export class Header {
  private _mount: HTMLElement = null;
  private _opts: HeaderOpts = null;
  private _hasRendered: boolean = false;

  constructor(mount: HTMLElement, opts: HeaderOpts) {
    this._mount = mount;
    this._opts = opts;
    this._render();
  }

  private _render() {
    if (this._hasRendered === true) {
      return;
    }
    const html = `
      <div class="pictool-module-header">
        <div class="pictool-header-btn-close"></div>
        <div class="pictool-header-btn-save"></div>
      </div>
    `;
    this._mount.innerHTML = html;
    this._registerEvent();
    this._hasRendered = true;
  }

  private _registerEvent() {
    const btnClose = this._mount.querySelector('div.pictool-header-btn-close');
    const btnSave = this._mount.querySelector('div.pictool-header-btn-save');
    const options = this._opts;
    btnClose.addEventListener('click', function() {
      if (istype.function(options.closeFeedback)) {
        options.closeFeedback();
      }
    });

    btnSave.addEventListener('click', function() {
      if (istype.function(options.saveFeedback)) {
        options.saveFeedback();
      }
    });
  }
  
}

export default Header;