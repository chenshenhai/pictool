import './index.less';

import { mergeCSS2StyleAttr } from './../../util/style';


export interface ProgressOpts {
  mount: HTMLElement;
  customStyle: {};
}
export class Progress {
  private _options: ProgressOpts = null;
  private _hasRendered: boolean = false;
  private _component: HTMLElement = null;

  constructor(opts: ProgressOpts) {
    this._options = opts;
    this._render();
  }

  private _render() {
    if (this._hasRendered === true) {
      return;
    }
    const options = this._options;
    const { mount, customStyle, } = options;
    const styleAttr = mergeCSS2StyleAttr(customStyle);
    const html = `
      <div class="pictool-component-progress" style="${styleAttr}">
        <div class="pictool-progress-outer">
          <div class="pictool-progress-inner">hello world</div>
        </div>
      </div>
    `;

    const tempDom = document.createElement('div');;
    tempDom.innerHTML = html;
    const component: HTMLDivElement = tempDom.querySelector('div.pictool-component-progress');
    mount.appendChild(component);
    this._component = component;
  }

  show() {
    // TODO
  }

  hide() {
    // TODO
  }
  
}