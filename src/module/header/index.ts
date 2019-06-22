import './index.less';

export interface HeaderOpts {
  // TODO
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
    
  }
  
}

export default Header;