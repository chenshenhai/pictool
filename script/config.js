const config = [
  {
    input: 'src/ui.ts',
    output: {
      file: 'dist/ui.js',
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
    input: 'src/digit.ts',
    output: {
      file: 'dist/digit.js',
      format: 'umd',
      name: 'Pictool.digit',
      amd: {
        id: 'Pictool.digit'
      }
    }
  },
  {
    input: 'src/browser.ts',
    output: {
      file: 'dist/browser.js',
      format: 'umd',
      name: 'Pictool.browser',
      amd: {
        id: 'Pictool.browser'
      }
    }
  }
];

module.exports = config;
