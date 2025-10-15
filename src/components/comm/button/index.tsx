import { PropsWithChildren } from "react";

import blur from "@/assets/imgs/home/blur.png";

import styles from "./index.module.less";

type ButtonType =
  | "primary"
  | "gradient"
  | "blackGradient"
  | "ghost"
  | "whiteGhost"
  | "white";
type ButtonSize = "large" | "middle" | "small";

interface ButtonProps {
  type?: ButtonType;
  onClick?: () => void;
  className?: string;
  size?: ButtonSize;
  disabled?: boolean;
}

export const Button = ({
  type = "primary",
  children,
  onClick,
  className,
  size = "middle",
  disabled,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={`${styles.button} ${styles[type]} ${styles[size]} ${
        className || ""
      } ${disabled ? styles.disabled : ""}`}
    >
      {children}
      {["gradient", "blackGradient"].includes(type) && (
        <img draggable={false} className={styles.blur} src={blur} />
      )}
    </button>
  );
};
