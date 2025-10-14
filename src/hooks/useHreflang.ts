import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { LanguageType } from '@/i18n/settings';
import { getCurrentHreflang, updateCurrentLanguageHreflangTag } from '@/utils/hreflang';

/**
 * Hook to manage hreflang tags dynamically based on current language and route
 */
export const useHreflang = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const currentLang = i18n.language as LanguageType;
    
    // 当路由或语言改变时只更新当前语言的 hreflang 标签
    updateCurrentLanguageHreflangTag(currentLang, location.pathname);
    
    // 更新页面的 lang 属性
    if (document.documentElement) {
      const hreflangCode = getCurrentHreflang(currentLang);
      
      // 设置 HTML lang 属性为标准格式
      document.documentElement.lang = hreflangCode;
    }
  }, [location.pathname, i18n.language]);
  
  return {
    currentLanguage: i18n.language as LanguageType,
    currentHreflang: getCurrentHreflang(i18n.language as LanguageType),
    currentPath: location.pathname
  };
};
