import { PropsWithChildren } from "react";

import styles from "./index.module.less";

export const Title = ({
  children,
  className,
  ...rest
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <h1 {...rest} className={`text-[24px] md:text-[48px] text-center leading-[140%] mb-4 md:mb-6 font-bold ${styles.title} ${className || ""}`}>
      {children}
    </h1>
  );
};
