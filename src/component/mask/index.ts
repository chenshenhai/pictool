import './index.less';

class Mask {

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
      <div class="pictool-component-mask-container"></div>
    </div>
    `;
    const body = document.querySelector('body');
    const mountDom = document.createElement('div');;
    mountDom.innerHTML = html;
    const component : HTMLDivElement = mountDom.querySelector('div.pictool-component-mask')
    body.appendChild(component);
    this._hasRendered = true;
    this._component = component;
  }
  

}

export default Mask;
