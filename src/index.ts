import Mask from './mask/index';

class Pictool {
  private _options: any;
  private _mask: Mask;

  constructor(options = {}) {
    this._options = options;
    this._mask = new Mask({});
  }

  show() {
    this._mask.show();
  }

  hide() {
    this._mask.hide();
  }
}

export default Pictool;