
import * as filterMap from './../../core/digit/filter/index';
import { FilterEnum } from './../../core/digit/filter/enum';

export interface WorkerConfig {
  use: boolean;
  path: string;
}

export interface WorkerAction {
  key: string;
  param?: any;
  feedback?: Function;
}

export const syncWorker = function (action: WorkerAction, config: WorkerConfig) {
  const { key, param, feedback } = action;

  if (config && config.use === true) {
    const { path } = config;
    const worker: Worker = new Worker(path);
    worker.onmessage = function (event) {
      if (typeof feedback === 'function') {
        feedback(event.data.result, event.data.error);
        worker.terminate();
      }
    };
    worker.onerror = function (err) {
      if (typeof feedback === 'function') {
        feedback(null, err.message);
        worker.terminate();
      }
    };
    worker.postMessage({
      key,
      param,
    });
  } else {
    setTimeout(() => {
      let error: Error|null = null;
      let result = null;
      try {
        const filerAction = filterMap[key];
        result = filerAction(param);
      } catch (err) {
        error = err;
      }
      if (typeof feedback === 'function') {
        feedback(result, error);
      }
    }, 1);
  }
};

export const asyncWorker = function(action: WorkerAction, config: WorkerConfig): Promise<any|Error> {
  
  return new Promise(function (resolve, reject) {
    try {
      const asyncAction: WorkerAction = {
        key: action.key,
        param: action.param,
        feedback: function(result: any, err: Error|null) {
          if (!err) {
            resolve(result);  
          } else {
            reject(err);
          }
        }
      }
      syncWorker(asyncAction, config);
    } catch (err) {
      reject(err);
    }
  })
}