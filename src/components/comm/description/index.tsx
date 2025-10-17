import { PropsWithChildren } from "react";

import styles from "./index.module.less";

export const Description = ({
  children,
  className,
  ...rest
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <p
      {...rest}
      className={`__lineHeight150 ${styles.description} ${className || ""}`}
    >
      {children}
    </p>
  );
};
