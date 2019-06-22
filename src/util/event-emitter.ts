import istype from './istype';

class EventEmitter {

  private _listeners: Map<string, Function>;

  constructor() {
    this._listeners = new Map();
  }

  on(eventKey, callback) {
    this._listeners.set(eventKey, callback);
  }
  
  remove(eventKey) {
    this._listeners.delete(eventKey);
  }

  trigger(eventKey, ...args) {
    let listener = this._listeners.get(eventKey);
    if (istype.function(listener)) {
      listener(...args);
      return true;
    } else {
      return false;
    }
  }

}

export default EventEmitter;
