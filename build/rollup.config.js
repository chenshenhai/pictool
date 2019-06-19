const path = require('path');
const typescript = require('rollup-plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const less = require('less');

const isProductionEnv = process.env.NODE_ENV === 'production';

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const processLess = function(context, payload) {
  return new Promise(( resolve, reject ) => {
    less.render({
      file: context
    }, function(err, result) {
      if( !err ) {
        resolve(result);
      } else {
        reject(err);
      }
    });

    less.render(context, {})
    .then(function(output) {
      // output.css = string of css
      // output.map = string of sourcemap
      // output.imports = array of string filenames of the imports referenced
      if( output && output.css ) {
        resolve(output.css);
      } else {
        reject({})
      }
    },
    function(err) {
      reject(err)
    });

  })
}



module.exports = [
  {
    input: resolveFile('src/index.ts'),
    output: {
      file: resolveFile('dist/index.js'),
      format: 'umd',
      name: 'Pictool',
    }, 
    plugins: [
      postcss({
        extract: false,
        minimize: isProductionEnv,
        process: processLess,
      }),
      typescript()
    ],
  },
]