import enUS from './en-us';
import zhCN from './zh-cn';

export interface LanguageType {
  [key: string]: string;
}

const baseLang: LanguageType = enUS;

export function getLanguage(lang = 'en-us') {
  let result: LanguageType = baseLang;
  if (lang === 'zh-cn') {
    result = { ...{}, ...baseLang, ...zhCN };
  }
  return result;
}