import { FilterOpts } from './../../core/filter/filter';
import { filterGrayImageData } from '../../core/filter/gray';
import { asyncWorker } from '../../util/worker';
import schemaParser from './../../service/schema-parser';

export const filerGray = function(opts: FilterOpts): Promise<any> {
  return new Promise(function(resolve, reject) {
    asyncWorker(filterGrayImageData, opts).then(function(result: ImageData) {
      const newSchema = schemaParser.parseImageDataToSchema(result);
      resolve(newSchema)
    }).catch(function(err){
      reject(err)
    })
  });
}