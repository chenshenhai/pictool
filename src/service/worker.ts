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

  const uuid = Math.random().toString(26).substr(2);
  const feedbackMap = new Map();
  const worker: Worker = new Worker(path);

  worker.onmessage = function (event) {
    console.log('event = ', event);
    // const callback = feedbackMap.get(event.data.id);
    if (typeof feedback === 'function') {
      feedback(event.data.result, event.data.error);
    }
    // feedbackMap.delete(event.data.id);
  };

  worker.onerror = function (err) {
    const callback = feedbackMap.get(uuid);
    if (typeof callback === 'function') {
      callback(null, err.message);
    }
    feedbackMap.delete(uuid);
  };

  feedbackMap.set(uuid, feedback);
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
            reject(err)
          }
        }
      }
      syncWorker(asyncAction, config);
    } catch (err) {
      reject(err);
    }
  })
}