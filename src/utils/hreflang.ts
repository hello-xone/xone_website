import { LanguageType } from "@/i18n/settings";

// 语言代码映射到标准的 hreflang 格式
export const HREFLANG_MAP: Record<LanguageType, string> = {
  [LanguageType.en]: "en-US",
  [LanguageType.zh_cn]: "zh-Hans", 
  [LanguageType.zh_tw]: "zh-Hant",
  [LanguageType.ja]: "ja",
  [LanguageType.ko]: "ko", 
  [LanguageType.ms]: "ms",
  [LanguageType.vi]: "vi",
  [LanguageType.th]: "th",
};

// 获取基础URL
export const getBaseUrl = (): string => {
  return 'https://xone.org/';
};

// 生成特定语言的URL（这里由于是客户端路由，所有语言共享相同URL）
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateLanguageUrl = (_language: LanguageType, _currentPath: string = '/'): string => {
  const baseUrl = getBaseUrl();
  // 如果将来需要不同的URL结构，可以在这里修改
  return baseUrl;
};

// 动态更新页面的当前语言 hreflang 标签
export const updateCurrentLanguageHreflangTag = (currentLanguage: LanguageType, currentPath: string = '/'): void => {
  if (typeof document === 'undefined') return;
  
  // 移除现有的 hreflang 标签
  const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
  existingTags.forEach(tag => tag.remove());
  
  // 只生成当前语言的 hreflang 标签
  const hreflangCode = getCurrentHreflang(currentLanguage);
  const url = generateLanguageUrl(currentLanguage, currentPath);
  const link = document.createElement('link');
  link.rel = 'alternate';
  link.hreflang = hreflangCode;
  link.href = url;
  document.head.appendChild(link);
};

// 获取当前语言对应的 hreflang 代码
export const getCurrentHreflang = (currentLanguage: LanguageType): string => {
  return HREFLANG_MAP[currentLanguage] || HREFLANG_MAP[LanguageType.en];
};
