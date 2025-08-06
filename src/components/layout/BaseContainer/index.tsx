import { PropsWithChildren } from "react";
import styles from "./index.module.less";

interface ContainerProps {
  className?: string;
}

export const BaseContainer = ({
  children,
  className,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${className}`}>{children}</div>
    </div>
  );
};
