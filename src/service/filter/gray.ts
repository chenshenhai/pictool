import { filterGrayImageData } from '../../core/filter/gray';
import { asyncWorker } from '../../util/worker';
import schemaParser from './../../service/schema-parser';

export const filerGray = function(imageData: ImageData): Promise<any> {
  return new Promise(function(resolve, reject) {
    asyncWorker(filterGrayImageData, imageData).then(function(result: ImageData) {
      const newSchema = schemaParser.parseImageDataToSchema(result);
      resolve(newSchema)
    }).catch(function(err){
      reject(err)
    })
  });
}