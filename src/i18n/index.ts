import i18next from "i18next";
import { LanguageType } from "./settings";

export const changeLanguage = async (type: LanguageType) => {
  const res = await i18next.changeLanguage(type);
  if (document.documentElement) {
    document.documentElement.lang = type;
  }
  return res;
};
