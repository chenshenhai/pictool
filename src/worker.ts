import * as filterMap from './core/digit/filter/index';

onmessage = function (event) {

  const filerAction = filterMap[event.data.key]
  const result = filerAction(event.data.param);

  postMessage({
    'key': event.data.key,
    'result': result
  }, undefined);
}

