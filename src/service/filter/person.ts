import { FilterOpts } from './../../core/filter/filter';
import { filterPersonImageData } from '../../core/filter/person';
import { asyncWorker } from '../../util/worker';
import schemaParser from '../schema-parser';

export const filterPerson = function(opts: FilterOpts): Promise<any> {
  return new Promise(function(resolve, reject) {
    asyncWorker(filterPersonImageData, opts).then(function(result: ImageData) {
      const newSchema = schemaParser.parseImageDataToSchema(result);
      resolve(newSchema)
    }).catch(function(err){
      reject(err)
    })
  });
}