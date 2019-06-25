// Copyright 2019 The Authors chenshenhai. All rights reserved. MIT license.
// https://github.com/chenshenhai/blog/issues/35

export const syncWorker = function (func: Function, params: any, feedback: Function) {
  const uuid = Math.random().toString(26).substr(2);
  const scriptCode = `(${func.toString()})(event.data.params)`;
  const feedbackMap = new Map();
  const workerCode = `
    onmessage = function (event) {
      const result = eval(event.data.code);
      postMessage({
        'id': event.data.id,
        'result': result
      });
    }
  `;
  const workerCodeStr: string = encodeURIComponent(workerCode);
  const worker: Worker = new Worker('data:text/javascript;charset=US-ASCII,' + workerCodeStr);

  worker.onmessage = function (event) {
    const callback = feedbackMap.get(event.data.id);
    if (typeof callback === 'function') {
      callback(event.data.result, event.data.error);
    }
    feedbackMap.delete(event.data.id);
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
    id: uuid,
    params: params,
    code: scriptCode
  });
};

export const asyncWorker = function(func: Function, params: any) {
  return new Promise(function (resolve, reject) {
    try {
      syncWorker(func, params, function(result, err) {
        if (!err) {
          resolve(result);  
        } else {
          reject(err)
        }
      });
    } catch (err) {
      reject(err);
    }
  })
}