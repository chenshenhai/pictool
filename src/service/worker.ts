export interface WorkerConfig {
  path: string;
}

export interface WorkerAction {
  key: string;
  param?: any;
  feedback?: Function;
}

export const syncWorker = function (action: WorkerAction, config: WorkerConfig) {
  const { key, param, feedback } = action;
  const { path } = config;
  const worker: Worker = new Worker(path);

  worker.onmessage = function (event) {
    if (typeof feedback === 'function') {
      feedback(event.data.result, event.data.error);
    }
  };

  worker.onerror = function (err) {
    if (typeof feedback === 'function') {
      feedback(null, err.message);
    }
  };
  worker.postMessage({
    key,
    param,
  });
};

export const asyncWorker = function(action: WorkerAction, config: WorkerConfig) {
  
  return new Promise(function (resolve, reject) {
    try {
      const asyncAction: WorkerAction = {
        key: action.key,
        param: action.param,
        feedback: function(result, err) {
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