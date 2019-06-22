// Copyright 2019 The Authors chenshenhai. All rights reserved. MIT license.
// https://github.com/chenshenhai/logox/blob/master/src/layer/draw_action.ts

import istype from './../../util/istype';

const context2dRenderActionMap = {
  fillStyle: {
    type: 'attribute',
    argumentsType: 'string',
    executeAction(ctx: CanvasRenderingContext2D, args: string) {
      ctx.fillStyle = args;
    }
  },

  fillRect: {
    type: 'function',
    argumentsType: 'array',
    executeAction(ctx: CanvasRenderingContext2D, args: number[]) {
      ctx.fillRect(args[0], args[1], args[2], args[3]);
    }
  },
  
  clearRect: {
    type: 'function',
    argumentsType: 'array',
    executeAction(ctx: CanvasRenderingContext2D, args: number[]) {
      ctx.clearRect(args[0], args[1], args[2], args[3]);
    }
  },

  putImageData: {
    type: 'function',
    argumentsType: 'array',
    executeAction(ctx: CanvasRenderingContext2D, args: any[]) {
      ctx.putImageData(args[0], args[1], args[2]);
    }
  },
}


const drawAction = function(ctx: CanvasRenderingContext2D, method: string, args: any) {
  const action = context2dRenderActionMap[method];
  if (action && istype.type(args, true) === action.argumentsType) {
    action.executeAction(ctx, args);
  } else {
    console.warn(`Layer can't support execute context.${method}`);
  }
}

export default drawAction;