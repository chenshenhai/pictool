import { LanguageType } from './../language/index';

export interface AdjustMenuItemType {
  name: string;
  percent: number;
  filter: string;
  range: any;
  parseOptions(data: any): any;
}

export interface AdjustMenuConfigType {
  title: string;
  menu: AdjustMenuItemType[],
}

export function getAdjustMenuConfig(lang: LanguageType = {}): AdjustMenuConfigType {
  const adjustMenuConfig: AdjustMenuConfigType = {
    title: lang.ADJUST,
    menu: [
      {
        name: lang.ADJUST_LIGHTNESS,
        percent: 50,
        range: {
          min: -100,
          max: 100, 
        },
        filter: 'lightness',
        parseOptions(data: any) {
          const percent = Math.round(data.value);
          console.log('lightness.percent = ', percent);
          return {
            percent,
          }
        }
      },
      {
        name: lang.ADJUST_HUE,
        percent: 50,
        range: {
          min: 0,
          max: 360, 
        },
        filter: 'hue',
        parseOptions(data: any) {
          const value = Math.round(data.value);
          console.log('hue.value = ', value);
          return {
            value,
          }
        }
      },
      {
        name: lang.ADJUST_SATURATION,
        percent: 50,
        range: {
          min: -100,
          max: 100, 
        },
        filter: 'saturation',
        parseOptions(data: any) {
          const percent = Math.round(data.value);
          console.log('saturation.percent = ', percent);
          return {
            percent,
          }
        }
      },
      {
        name: lang.ADJUST_ALPHA,
        percent: 50,
        range: {
          min: 0,
          max: 100, 
        },
        filter: 'alpha',
        parseOptions(data: any) {
          const value = Math.round(data.value);
          console.log('alpha.value = ', value);
          return {
            value,
          }
        }
      },
      {
        name: lang.ADJUST_GAMMA,
        percent: 50,
        range: {
          min: 0,
          max: 100, 
        },
        filter: 'gamma',
        parseOptions(data: any) {
          const value = Math.round(data.value);
          console.log('gamma.value = ', value);
          return {
            value,
          }
        }
      },
      {
        name: lang.ADJUST_POSTERIZE,
        percent: 50,
        range: {
          min: 0,
          max: 100, 
        },
        filter: 'posterize',
        parseOptions(data: any) {
          const value = Math.round(data.value);
          console.log('posterize.value = ', value);
          return {
            value,
          }
        }
      },
    ]
  }

  return adjustMenuConfig;
}
