const path = require('path');
const typescript = require('rollup-plugin-typescript');
const postcss = require('rollup-plugin-postcss');
// const buble = require('rollup-plugin-buble'); 
const babel = require('rollup-plugin-babel');
const less = require('less');
const config = require('./config');

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


function getPlugins() {
  return [
    postcss({
      extract: false,
      minimize: process.env.NODE_ENV === 'production',
      process: processLess,
    }),
    typescript(),
    // buble(),
    babel({
      babelrc: false,
      presets: [
        ['@babel/preset-env', { modules: false }]
      ],
      plugins: [
        ["@babel/plugin-transform-classes", {
          "loose": true
        }]
      ]
    }),
  ]
}



function parseConfig (config = []) {
  const rsConfig = [];
  if (Array.isArray(config) && config.length > 0) {
    config.forEach(function(item = {}) {
      item.output.file = resolveFile(item.output.file);
      const output = item.output;
      rsConfig.push({
        input: resolveFile(item.input),
        output,
        plugins: getPlugins(),
      })
    });
  }
  return rsConfig;
}

module.exports = parseConfig(config);