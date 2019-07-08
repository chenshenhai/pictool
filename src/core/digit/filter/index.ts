import { FilterOpts } from './filter';
import { Effect } from './../effect/index';

export { filterPersonSkinImageData  as personSkin } from './person';
export { filterTransform as transform } from './transform';

export const gray = function(opts: FilterOpts ) {
  const { imageData } = opts;
  const effect = new Effect(imageData);
  const rsImageData = effect.process('grayscale').getImageData();
  return rsImageData;
}