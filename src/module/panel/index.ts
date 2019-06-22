import './index.less';

import { ActionSheet, ActionSheetOpts, ActionSheetLifeCycleArgs, } from '../../component/action-sheet/index';

export interface PanelOpts {
  // TODO
}

export class Panel {
  private _actionSheet: ActionSheet = null;
  private _opts: PanelOpts = null;

  constructor(opts) {
    this._opts = opts;
    const actionSheetOpts: ActionSheetOpts = {
      height: 80,
      afterRender(args: ActionSheetLifeCycleArgs) {
        const { contentMount } = args;
        contentMount.innerHTML = 'hello world';
      }
    }
    const actionSheet = new ActionSheet(actionSheetOpts);
    this._actionSheet = actionSheet;
  }

  show() {
    this._actionSheet.show();
  }

  hide() {
    this._actionSheet.hide();
  }

}
