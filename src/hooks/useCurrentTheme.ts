import { useEffect, useState } from "react";

/**
 * 获取当前主题的 Hook
 */
export const useCurrentTheme = () => {
  const [isLight, setIsLight] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("theme") !== "dark";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 获取当前主题
    const getCurrentTheme = () => {
      const theme = localStorage.getItem("theme");
      setIsLight(theme !== "dark");
    };

    // 初始化
    getCurrentTheme();

    // 监听 localStorage 变化（跨标签页同步）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        getCurrentTheme();
      }
    };

    // 监听 DOM 属性变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          getCurrentTheme();
        }
      });
    });

    // 开始监听
    window.addEventListener("storage", handleStorageChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // 清理
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  return { isLight };
};
