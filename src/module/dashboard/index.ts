import './index.less';

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
          <div class="pictool-nav-btn">滤镜</div>
          <div class="pictool-nav-btn">编辑</div>
          <div class="pictool-nav-btn">文字</div>
          <div class="pictool-nav-btn">标签</div>
        </div>
      </div>
    `;
    this._mount.innerHTML = html;
    this._hasRendered = true;
  }


}
