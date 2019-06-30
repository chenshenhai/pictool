import transform from './../digit/transform/index';
import { FilterOpts } from './filter';

export const filterTransform = function(filerOpts : FilterOpts): ImageData {
  const { imageData,  options = {}, } = filerOpts;
  const filteredImageData: ImageData = transform.transformImageData(imageData, options);
  return filteredImageData;
};
