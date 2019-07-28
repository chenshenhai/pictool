import { LanguageType } from './../language/index';

export interface EffectMenuItemType {
  name: string;
  filter: string;
}

export interface EffectMenuConfigType {
  title: string;
  menu: EffectMenuItemType[],
}

export function getEffectMenuConfig(lang: LanguageType): EffectMenuConfigType {
  const effectMenuConfig = {
    title: lang.EFFECT,
    menu: [
      {
        name: lang.EFFECT_ORIGIN,
        filter: 'origin',
      },
      {
        name: lang.EFFECT_OLD,
        filter: 'old',
      },
      {
        name: lang.EFFECT_LINEDRAWING,
        filter: 'lineDrawing',
      },
      {
        name: lang.EFFECT_OILDRAWING,
        filter: 'oilDrawing',
      },
      {
        name: lang.EFFECT_NATURAL,
        filter: 'natural',
      }
    ]
  }
  return effectMenuConfig;
}