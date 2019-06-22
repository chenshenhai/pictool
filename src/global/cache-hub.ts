const cacheStorage: Map<string, any> = new Map();

const cacheHub = {
  set(key, val) {
    cacheStorage.set(key, val);
  },

  get(key) {
    return cacheStorage.get(key);
  }
};

export default cacheHub;