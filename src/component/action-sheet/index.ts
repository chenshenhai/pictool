import './index.less';

export interface ActionSheetLifeCycleArgs {
  contentMount: HTMLElement;
}

export interface ActionSheetOpts {
  height: number;
  beforeRender?: Function,
  afterRender?: Function,
  beforeShow?: Function,
  afterShow?: Function,
  beforeHide?: Function,
  afterHide?: Function,
}

export class ActionSheet {

  private _options: any;
  private _hasRendered: boolean = false;
  private _component: HTMLDivElement = null;
  private _contentMount: HTMLDivElement = null;

  constructor(opts: ActionSheetOpts) {
    this._options = opts;
    this._render();
  }
  
  show() {
    const { beforeShow, afterShow, } = this._options;
    const contentMount = this._contentMount;
    if (typeof beforeShow === 'function') {
      beforeShow({ contentMount });
    }
    this._component.classList.add('actionsheet-open');
    if (typeof afterShow === 'function') {
      afterShow({ contentMount });
    }
  }

  hide() {
    const { beforeHide, afterHide, } = this._options;
    const contentMount = this._contentMount;
    if (typeof beforeHide === 'function') {
      beforeHide({ contentMount });
    }
    this._component.classList.remove('actionsheet-open');
    if (typeof afterHide === 'function') {
      afterHide({ contentMount });
    }
  }

  private _render() {
    if (this._hasRendered === true) {
      return;
    }
    const { afterRender, beforeRender} = this._options;
    if (typeof beforeRender === 'function') {
      beforeRender();
    }
    const opts: ActionSheetOpts = this._options;
    const { height, } = opts;
    const html = `
    <div class="pictool-component-actionsheet" style="height:${height}px; ">
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

    const contentMount: HTMLDivElement = component.querySelector('div.pictool-actionsheet-content');

    if (typeof afterRender === 'function') {
      const args: ActionSheetLifeCycleArgs = { contentMount, };
      afterRender(args)
    }

    this._hasRendered = true;
    this._component = component;
    this._contentMount = contentMount;
  }
  

}

