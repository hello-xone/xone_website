import { useEffect, useState } from "react";

// Tailwind CSS 断点值
const BREAKPOINTS = {
  sm: 640, // sm: 640px+
  md: 768, // md: 768px+
  lg: 1024, // lg: 1024px+
  xl: 1280, // xl: 1280px+
  "2xl": 1536, // 2xl: 1536px+
};

export const useTailwindBreakpoint = () => {
  const [breakpoints, setBreakpoints] = useState({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
  });

  useEffect(() => {
    const checkBreakpoints = () => {
      const width = window.innerWidth;
      setBreakpoints({
        sm: width >= BREAKPOINTS.sm,
        md: width >= BREAKPOINTS.md,
        lg: width >= BREAKPOINTS.lg,
        xl: width >= BREAKPOINTS.xl,
        "2xl": width >= BREAKPOINTS["2xl"],
      });
    };

    // 初始检查
    checkBreakpoints();

    // 监听窗口大小变化
    window.addEventListener("resize", checkBreakpoints);

    // 清理事件监听器
    return () => window.removeEventListener("resize", checkBreakpoints);
  }, []);

  return breakpoints;
};
