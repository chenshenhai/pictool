import './index.less';

export interface MaskAfterRenderArgs {
  contentMount: HTMLElement;
  headerMount: HTMLElement;
  footerMount: HTMLElement;
}

export interface MaskOpts {
  zIndex: number;
  afterRender: Function;
}

export class Mask {

  private _options: MaskOpts;
  private _hasRendered: boolean = false;
  private _component: HTMLDivElement = null;

  constructor(opts: MaskOpts) {
    this._options = opts;
    this._render();
  }
  
  show() {
    this._component.classList.add('mask-open');
  }

  hide() {
    this._component.classList.remove('mask-open');
  }

  private _render() {
    if (this._hasRendered === true) {
      return;
    }
    const options = this._options;
    const { zIndex, afterRender } = options;
    const html = `
    <div class="pictool-component-mask" style="z-index: ${zIndex}">
      <div class="pictool-mask-container">
        <div class="pictool-mask-header"></div>
        <div class="pictool-mask-content"></div>
        <div class="pictool-mask-footer"></div>
      </div>
    </div>
    `;
    const body = document.querySelector('body');
    const mountDom = document.createElement('div');;
    mountDom.innerHTML = html;
    const component : HTMLDivElement = mountDom.querySelector('div.pictool-component-mask')
    body.appendChild(component);

    const contentMount: HTMLDivElement = component.querySelector('div.pictool-mask-content');
    const headerMount: HTMLDivElement = component.querySelector('div.pictool-mask-header');
    const footerMount: HTMLDivElement = component.querySelector('div.pictool-mask-footer');

    if (typeof afterRender === 'function') {
      const args: MaskAfterRenderArgs = { contentMount, headerMount, footerMount};
      afterRender(args)
    }

    this._hasRendered = true;
    this._component = component;
  }
  

}

