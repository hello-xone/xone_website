import { PropsWithChildren } from "react";

import styles from "./index.module.less";

export const Title = ({
  children,
  className,
  ...rest
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <h1 {...rest} className={`${styles.title} ${className || ""}`}>
      {children}
    </h1>
  );
};
