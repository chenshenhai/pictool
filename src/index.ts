class Pictool {
  private _options

  constructor(options = {}) {
    this._options = options;
  }

  logData() {
    console.log('data is : ', this._options);
  }
}

export default Pictool;