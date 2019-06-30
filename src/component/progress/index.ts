import './index.less';

import { mergeCSS2StyleAttr } from './../../util/style';


export interface ProgressOpts {
  mount: HTMLElement;
  customStyle: {};
  percent: number; // [0, 100];
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
    const { mount, customStyle, percent, } = options;
    const styleAttr = mergeCSS2StyleAttr(customStyle);
    let displayPercent = percent > 0 ? percent : 0;
    displayPercent = Math.min(displayPercent, 100);
    displayPercent = Math.max(displayPercent, 0);

    const innerStyleAttr = mergeCSS2StyleAttr({
      left: `-${100 - displayPercent}%`
    });
    const html = `
      <div class="pictool-component-progress" style="${styleAttr}">
        <div class="pictool-progress-outer">
          <div class="pictool-progress-inner" style=${innerStyleAttr}></div>
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