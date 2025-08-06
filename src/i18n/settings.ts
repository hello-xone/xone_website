import en from "./locales/en";
import zhTW from "./locales/zhTW";
import zh from "./locales/zh";
import ko from "./locales/ko";
import ja from "./locales/ja";
import ms from "./locales/ms";
import vi from "./locales/vi";
import th from "./locales/th";

export enum LanguageType {
  en = "en",
  ja = "ja",
  ko = "ko",
  ms = "ms",
  th = "th",
  vi = "vi",
  zh_cn = "zh-CN",
  zh_tw = "zh-TW",
}

export const langs = [
  {
    type: LanguageType.en,
    name: "English",
  },
  {
    type: LanguageType.ja,
    name: "日本語",
  },
  {
    type: LanguageType.ko,
    name: "한국인",
  },
  {
    type: LanguageType.ms,
    name: "Bahasa Melayu",
  },
  {
    type: LanguageType.th,
    name: "แบบไทย",
  },
  {
    type: LanguageType.vi,
    name: "Tiếng Việt",
  },
  {
    type: LanguageType.zh_cn,
    name: "简体中文",
  },
  {
    type: LanguageType.zh_tw,
    name: "繁体中文",
  },
];

export const fallbackLng = LanguageType.en;

export const languages = Object.values(LanguageType);
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    resources: {
      [LanguageType.en]: en,
      [LanguageType.zh_cn]: zh,
      [LanguageType.zh_tw]: zhTW,
      [LanguageType.ko]: ko,
      [LanguageType.ja]: ja,
      [LanguageType.ms]: ms,
      [LanguageType.vi]: vi,
      [LanguageType.th]: th,
    },
  };
}
