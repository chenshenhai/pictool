import istype from './istype';

export const mergeCSS2StyleAttr = function(cssMap = {}): string {
  const cssList = [];
  if (istype.json(cssMap) === true) {
    for (const key in cssMap) {
      let cssKey: string = `${key}`;
      let cssVal: string = `${cssMap[key]}`;
      cssKey = cssKey.trim();
      cssVal = cssVal.trim();
      cssList.push(`${cssKey}:${cssVal}`);
    }
  }
  const styleAttr = cssList.join('; ');
  return styleAttr;
}

export const parseStyleAttr2CSSMap = function() {
  const cssMap = {};
  // TODO
}