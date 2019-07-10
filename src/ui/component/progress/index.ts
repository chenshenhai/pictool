import './index.less';

import { mergeCSS2StyleAttr } from './../../../util/style';
import istype from './../../../util/istype';


export interface ProgressOpts {
  mount: HTMLElement;
  customStyle: {};
  percent: number; // [0, 100];
  onChange: Function|null;
  max?: number, // default 100
  min?: number, // default 0
}


export interface ProcessOnChangeData {
  value: number; // [0, 100]
}

export class Progress {
  private _options: ProgressOpts = null;
  private _hasRendered: boolean = false;
  private _component: HTMLElement = null;
  private _rangeList: number[];

  constructor(opts: ProgressOpts) {
    this._options = opts;
    this._render();
    this._rangeList = [];

    const options = this._options;
    const { max = 100,  min = 0 } = options;
    this.resetRange(max, min);
  }

  private _render() {
    if (this._hasRendered === true) {
      return;
    }
    const options = this._options;
    const { mount, customStyle, percent, } = options;
    const styleAttr = mergeCSS2StyleAttr(customStyle);
    const html = `
      <div class="pictool-component-progress" style="${styleAttr}">
        <div class="pictool-progress-outer">
          <div class="pictool-progress-inner"></div>
        </div>
      </div>
    `;

    const tempDom = document.createElement('div');;
    tempDom.innerHTML = html;
    const component: HTMLDivElement = tempDom.querySelector('div.pictool-component-progress');
    mount.appendChild(component);
    this._component = component;
    this._setInnerMovePercent(percent);
    this._triggerEvent();
  }

  show() {
    this._component.classList.remove('progress-hidden');
  }

  hide() {
    this._component.classList.add('progress-hidden');
  }

  resetPercent(percent: number) {
    this._setInnerMovePercent(percent);
  }

  resetOnChange(onChange: Function) {
    this._options.onChange = onChange;
  }

  resetRange(min: number, max: number) {
    this._rangeList = [];
    const item = (max - min) / 100;
    for (let i = min; i < max; i += item) {
      this._rangeList.push(i);
    }
    this._rangeList.push(max);
  }

  private _triggerEvent() {
    const that = this;
    const options = this._options;
    const component: HTMLElement = this._component;
    const outer = component.querySelector('.pictool-progress-outer');
    const inner = component.querySelector('.pictool-progress-inner');
    
    outer.addEventListener('touchstart', function(event: TouchEvent) {
      const touchClientX = event.touches[0].clientX;
      let movePercent = that._calculateMovePercent(touchClientX);
      that._setInnerMovePercent(movePercent);
    })
    outer.addEventListener('touchmove', function(event: TouchEvent) {
      const touchClientX = event.touches[0].clientX;
      let movePercent = that._calculateMovePercent(touchClientX);
      that._setInnerMovePercent(movePercent);
    });
    outer.addEventListener('touchend', function() {
      const value = that._getInnerValue();
      const data: ProcessOnChangeData = {
        value,
      }
      const options = that._options;
      const { onChange, } = options;
      if (istype.function(onChange)) {
        onChange(data);
      }
    });


    outer.addEventListener('mousedown', function(event: MouseEvent) {
      const touchClientX = event.clientX;
      let movePercent = that._calculateMovePercent(touchClientX);
      that._setInnerMovePercent(movePercent);
    })
    // outer.addEventListener('mousemove', function(event: MouseEvent) {
    //   const touchClientX = event.clientX;
    //   let movePercent = that._calculateMovePercent(touchClientX);
    //   that._setInnerMovePercent(movePercent);
    // });
    outer.addEventListener('mouseup', function() {
      const value = that._getInnerValue();
      const data: ProcessOnChangeData = {
        value,
      }
      const options = that._options;
      const { onChange, } = options;
      if (istype.function(onChange)) {
        onChange(data);
      }
    });
  }

  private _calculateMovePercent(touchClientX: number) {
    const component: HTMLElement = this._component;
    const outer = component.querySelector('.pictool-progress-outer');
    const outerLeft = this._getViewAbsoluteLeft(outer);
    const outerWidth = outer.clientWidth;
    const moveLelf = touchClientX - outerLeft;
    let movePercent = Math.ceil(moveLelf * 100 / outerWidth);
    return movePercent;
  }

  private _setInnerMovePercent(percent: number) {
    const component = this._component;
    const inner = component.querySelector('.pictool-progress-inner');
    let displayPercent = percent > 0 ? percent : 0;
    displayPercent = Math.min(displayPercent, 100);
    displayPercent = Math.max(displayPercent, 0);
    const innerStyleAttr = mergeCSS2StyleAttr({
      left: `-${100 - displayPercent}%`
    });
    inner.setAttribute('style', innerStyleAttr);
    inner.setAttribute('data-component-inner-percent', `${displayPercent}`);
  }

  private _getInnerValue() {
    const component = this._component;
    const inner = component.querySelector('.pictool-progress-inner');
    const percentAttr: string = inner.getAttribute('data-component-inner-percent');
    let percent = parseInt(percentAttr, 10);
    percent = Math.min(100, percent);
    percent = Math.max(0, percent);
    const value = this._rangeList[percent]
    return value;
  }

  private _getViewAbsoluteLeft(elem){
    let actualLeft = elem.offsetLeft;
    let current = elem.offsetParent;

    while (current !== null){
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    return actualLeft;
  }
  
}