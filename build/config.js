const config = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'Pictool.UI',
      amd: {
        id: 'Pictool.UI'
      }
    }
  },
  {
    input: 'src/worker.ts',
    output: {
      file: 'dist/worker.js',
      format: 'iife',
    }, 
  },
  {
    input: 'src/core/digit/transform/index.ts',
    output: {
      file: 'dist/core/digit/transform.js',
      format: 'umd',
      name: 'Pictool.core.digit.transform',
      amd: {
        id: 'Pictool.core.digit.transform'
      }
    }
  },
  {
    input: 'src/util/index.ts',
    output: {
      file: 'dist/util/index.js',
      format: 'umd',
      name: 'Pictool.util',
      amd: {
        id: 'Pictool.util'
      }
    }
  }
];

module.exports = config;
