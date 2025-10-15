import { forwardRef, PropsWithChildren, useMemo, useState } from "react";

import { useStartupLoaded } from "@/hooks/useStartupLoaded";

export enum AnimationType {
  SLIDE_IN_DOWN = "__slideInDown",
  SLIDE_IN_UP = "__slideInUp",
}

interface AnimationProps {
  delay?: number;
  className?: string;
  animationClassName: string;
  [key: string]: any;
}

export const Animation = forwardRef<
  HTMLDivElement,
  PropsWithChildren<AnimationProps>
>((props, ref: any) => {
  const { children, delay = 0, className, animationClassName, ...rest } = props;
  const [name, setName] = useState("");
  useStartupLoaded(() => {
    window.setTimeout(
      () => {
        setName(animationClassName);
      },
      delay * 1000 || 1
    );
  }, []);

  const baseClass = useMemo(() => {
    switch (animationClassName) {
      case AnimationType.SLIDE_IN_DOWN:
        return "__slideInDownBase";
      case AnimationType.SLIDE_IN_UP:
        return "__slideInUpBase";
    }
    return "";
  }, [animationClassName]);

  return (
    <div
      ref={ref}
      {...rest}
      className={`${className || ""} __animation ${baseClass} ${name || ""}`}
    >
      {children}
    </div>
  );
});
