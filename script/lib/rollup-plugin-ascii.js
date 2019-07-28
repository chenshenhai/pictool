// const extname = require("path").extname;
// const {createFilter, dataToEsm} = require('rollup-pluginutils');
const MagicString = require('magic-string');

// /**
//  * thanks to https://github.com/yinhaibo01/unicode-loader/
//  * @param {*} str 
//  * @param {*} identifier 
//  */
// function toAscii(str, identifier) {
//   return str.replace(/[\u0080-\uffff]/g, function (ch) {
//     // console.log('ch =', ch);
//     var code = ch.charCodeAt(0).toString(16);
//     if (code.length <= 2 && !identifier) {
//       while (code.length < 2) code = "0" + code;
//       return "\\x" + code;
//     } else {
//       while (code.length < 4) code = "0" + code;
//       return "\\u" + code;
//     }
//   });
// };

module.exports = function ascii (options = {}) {
  // const filter = createFilter(options.include, options.exclude);
  const sourcemap = options.sourcemap === true || options.sourceMap === true;

  return {
    name: 'rollup-plugin-ascii',

    // 插件处理代码编译
    transform (code, id) {
      // if (!filter(id) || extname(id) !== ".js"  || extname(id) !== ".ts") return;

      let codeStr = `${code}`;
      const magic = new MagicString(codeStr);

      // codeStr = toAscii(codeStr);

      // codeStr = toAscii(codeStr);

      codeStr = codeStr.replace(/[\u0080-\uffff]/g, function(match, offset) {
        
        let newStr = match;
        // console.log('match =', match);
        var code = match.charCodeAt(0).toString(16);
        if (code.length <= 2) {
          if (code.length < 2) {
            code = "0" + code
          };
          newStr = "\\x" + code;
        } else {
          if (code.length < 4) {
            code = "0" + code
          };
          newStr =  "\\u" + code;
        }

        const start = offset;
        const end = offset + match.length;
        magic.overwrite(start, end, newStr);
        return newStr;
      });


      const resultCode = magic.toString();
      let resultMap = false;
      if (sourcemap === true) {
        resultMap = magic.generateMap({
          hires: true,
        });
      }
	    return {
        code: resultCode,
        map: resultMap,
      };
    }
  };
  
}