import './index.less';

export class MaskAfterRenderArgs {
  contentMount: HTMLElement;
  headerMount: HTMLElement;
  footerMount: HTMLElement;
}

export class Mask {

  private _options: any;
  private _hasRendered: boolean = false;
  private _component: HTMLDivElement = null;

  constructor(opts) {
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
    const html = `
    <div class="pictool-component-mask">
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

    const { afterRender, } = this._options;
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

