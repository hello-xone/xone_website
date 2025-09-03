import i18next from "i18next";
import { PropsWithChildren, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { initReactI18next } from "react-i18next/initReactI18next";

import { cookieName, fallbackLng,getOptions, LanguageType } from "./settings";

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const [cookies, setCookies] = useCookies([cookieName]);
  const [isFinish, setIsFinish] = useState(false);

  const initI18next = async (lng: LanguageType) => {
    try {
      const options = getOptions(lng);
      await i18next.use(initReactI18next).init(options);
      setCookies(cookieName, fallbackLng);
      if (document.documentElement) {
        document.documentElement.lang = lng || fallbackLng;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsFinish(true);
    }
  };
  useEffect(() => {
    initI18next(cookies.i18next);
  }, []);
  return <>{isFinish && children}</>;
};
