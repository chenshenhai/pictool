import { LanguageType } from './../language/index';

export interface ProcessMenuItemType {
  name: string;
  filter: string;
}

export interface ProcessMenuConfigType {
  title: string;
  menu: ProcessMenuItemType[],
}

export function getProcessMenuConfig(lang: LanguageType): ProcessMenuConfigType {
  const processMenuConfig: ProcessMenuConfigType = {
    title: lang.PROCESS,
    menu: [
      {
        name: lang.PROCESS_ORIGIN,
        filter: 'origin',
      },
      {
        name: lang.PROCESS_GRAYSCALE,
        filter: 'grayscale',
      },
      {
        name: lang.PROCESS_SOBEL,
        filter: 'sobel',
      },
      {
        name: lang.PROCESS_INVERT,
        filter: 'invert',
      },
      {
        name: lang.PROCESS_SEPIA,
        filter: 'sepia',
      }
    ]
  };
  return processMenuConfig;
}