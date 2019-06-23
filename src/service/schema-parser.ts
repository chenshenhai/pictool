import { SketchSchema } from './../core/sketch/index';

const schemaParser = {
  parseImageData(schema: SketchSchema): ImageData {
    const layerList = schema.layerList;
    const layer = layerList[0];
    const drawActionList = layer.drawActionList;
    const action = drawActionList[0];
    const actionArgs = action.args;
    const imageData = actionArgs[0];
    return imageData;
  },

  parseImageDataToSchema(imageData: ImageData): SketchSchema {
    const schema = {
      layerList: [
        { 
          key: 'image',
          drawActionList: [{
            method: 'putImageData',
            args: [imageData, 0, 0],
          }],
        },
      ]
    }
    return schema;
  },

  updateSchemaImageData(schema: SketchSchema, imageData: ImageData) {
    const layerList = schema.layerList;
    const layer = layerList[0];
    const drawActionList = layer.drawActionList;
    const action = drawActionList[0];
    const actionArgs = action.args;
    actionArgs[0] = imageData;
    return schema;
  }
}

export default schemaParser;
