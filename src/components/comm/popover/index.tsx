import { CSSProperties, PropsWithChildren } from "react";
import styles from "./index.module.less";

export const Popover = ({
  show,
  children,
  direction = "right",
  space = 4,
  style,
}: PropsWithChildren<{
  show: boolean;
  space?: number;
  direction?: "left" | "right" | "center" | "top";
  style?: CSSProperties;
}>) => {
  return (
    <div
      className={`${styles.popover} ${show ? styles.show : ""} ${
        direction ? styles[direction] : ""
      }`}
      style={{
        transform: `${
          direction === "center" ? `translateX(-50%) ` : ""
        }translateY(calc(100% + ${space}px))`,
        ...(style || {}),
      }}
    >
      {children}
    </div>
  );
};
