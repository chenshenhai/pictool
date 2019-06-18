class Mask {

  private _hasRendered: boolean = false;


  constructor(opts) {
    
  }
  
  show() {
    this._render();
  }

  hide() {

  }

  private _render() {
    const html = `
    <div class="pictool-component-mask">
      <div class=""></div>
    </div>
    `;
    const body = document.querySelector('body');
    const mountDom = document.createElement('div');;
    mountDom.innerHTML = html;

    body.appendChild(mountDom.querySelector('.pictool-component-mask'));
  }
  

}

export default Mask;
