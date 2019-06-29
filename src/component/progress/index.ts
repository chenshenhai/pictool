import './index.less';


export interface ProgressOpts {
  mount: HTMLElement;
  customStyle: {};
}
export class Progress {
  private _options: ProgressOpts = null;
  private _hasRendered: boolean = false;
  private _component: HTMLDivElement = null;

  constructor(opts: ProgressOpts) {
    this._options = opts;
    this._render();
  }

  private _render() {
    if (this._hasRendered === true) {
      return;
    }
    const options = this._options;
    const { mount } = options;
    const html = `
      <div class="pictool-component-progress">
        <div class="pictool-progress-outer">
          <div class="pictool-progress-inner">hello world</div>
        </div>
      </div>
    `;
    mount.innerHTML = html;
    const component: HTMLDivElement = mount.querySelector('div.pictool-component-progress');
    this._component = component;
  }
  
}