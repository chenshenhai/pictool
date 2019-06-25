import { filterDrawingImageData } from '../../core/filter/drawing';
import { asyncWorker } from '../../util/worker';
import schemaParser from './../../service/schema-parser';

export const filerDrawing = function(imageData: ImageData): Promise<any> {
  return new Promise(function(resolve, reject) {
    asyncWorker(filterDrawingImageData, imageData).then(function(result: ImageData) {
      const newSchema = schemaParser.parseImageDataToSchema(result);
      resolve(newSchema)
    }).catch(function(err){
      reject(err)
    })
  });
}