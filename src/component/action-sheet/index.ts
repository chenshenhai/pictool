import './index.less';

export interface ActionSheetAfterRenderArgs {
  contentMount: HTMLElement;
}

export interface ActionSheetOpts {
  height: number;
}

export class ActionSheet {

  private _options: any;
  private _hasRendered: boolean = false;
  private _component: HTMLDivElement = null;

  constructor(opts: ActionSheetOpts) {
    this._options = opts;
    this._render();
  }
  
  show() {
    this._component.classList.add('actionsheet-open');
  }

  hide() {
    this._component.classList.remove('actionsheet-open');
  }

  private _render() {
    if (this._hasRendered === true) {
      return;
    }
    const opts: ActionSheetOpts = this._options;
    const { height, } = opts;
    const html = `
    <div class="pictool-component-actionsheet" style="height:${height}px">
      <div class="pictool-actionsheet-container">
        <div class="pictool-actionsheet-header"></div>
        <div class="pictool-actionsheet-content"></div>
        <div class="pictool-actionsheet-footer"></div>
      </div>
    </div>
    `;
    const body = document.querySelector('body');
    const mountDom = document.createElement('div');;
    mountDom.innerHTML = html;
    const component : HTMLDivElement = mountDom.querySelector('div.pictool-component-actionsheet')
    body.appendChild(component);

    const { afterRender, } = this._options;
    const contentMount: HTMLDivElement = component.querySelector('div.pictool-actionsheet-content');

    if (typeof afterRender === 'function') {
      const args: ActionSheetAfterRenderArgs = { contentMount, };
      afterRender(args)
    }

    this._hasRendered = true;
    this._component = component;
  }
  

}

