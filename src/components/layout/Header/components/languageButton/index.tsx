import { Button } from "@/components/comm/button/index";
import GlobalIcon from "@/assets/svg/home/global.svg?react";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { LanguageType, langs, cookieName } from "@/i18n/settings";
import i18next from "i18next";
import { useCookies } from "react-cookie";
import SelectedIcon from "@/assets/svg/home/selected.svg?react";
import { Popover } from "@/components/comm/popover";
import ArrowICon from "@/assets/svg/home/arrow.svg?react";
import { changeLanguage } from "@/i18n";
import styles from "./index.module.less";

interface LanguageButtonProps {
  className?: string;
  type?: "icon" | "contained" | "text" | "whiteContained";
  popoverDirection?: "top" | "left" | "right" | "center";
  popoverStyle?: CSSProperties;
}

export const LanguageButton = ({
  className,
  type = "contained",
  popoverDirection = "right",
  popoverStyle,
}: LanguageButtonProps) => {
  const [open, setOpen] = useState(false);
  const [_, setCookies] = useCookies();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChangeLanguage = async (type: LanguageType) => {
    await changeLanguage(type);
    setCookies(cookieName, type);
    setOpen(false);
  };

  useEffect(() => {
    const handleMouseDown = () => {
      setOpen(false);
    };

    const stopPropagation = (event: any) => {
      event.stopPropagation();
    };

    window.addEventListener("mousedown", handleMouseDown, false);
    containerRef.current &&
      containerRef.current.addEventListener(
        "mousedown",
        stopPropagation,
        false
      );
    return () => {
      window.removeEventListener("mousedown", handleMouseDown, false);
      containerRef.current &&
        containerRef.current.removeEventListener(
          "mousedown",
          stopPropagation,
          false
        );
    };
  }, []);

  const currentLanguage = useMemo(() => {
    const fallback = langs.find((item) => item.type === LanguageType.en);
    return (
      langs.find((item) => {
        return item.type === i18next.language;
      }) || fallback
    );
  }, [i18next.language]);

  const renderButton = () => {
    switch (type) {
      case "whiteContained":
        return (
          <Button size="small" type="whiteGhost" onClick={() => setOpen(!open)}>
            <div className={styles.icon}>
              <GlobalIcon></GlobalIcon>
            </div>
            {currentLanguage?.name}
          </Button>
        );
      case "contained":
        return (
          <Button size="small" type="ghost" onClick={() => setOpen(!open)}>
            <div className={styles.icon}>
              <GlobalIcon></GlobalIcon>
            </div>
            {currentLanguage?.name}
          </Button>
        );
      case "icon":
        return (
          <div className={styles.iconButton} onClick={() => setOpen(!open)}>
            <GlobalIcon></GlobalIcon>
          </div>
        );
      case "text":
        return (
          <div className={styles.textButton} onClick={() => setOpen(!open)}>
            <div className={styles.icon}>
              <GlobalIcon></GlobalIcon>
            </div>
            {currentLanguage?.name}
            <div
              className={`${styles.arrowIcon} ${
                open ? styles.arrowIconOpen : ""
              }`}
            >
              <ArrowICon></ArrowICon>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative cursor-pointer ${className || ""}`}
      ref={containerRef}
    >
      {renderButton()}
      <Popover show={open} direction={popoverDirection} style={popoverStyle}>
        <div className={styles.menu}>
          <div className="w-full">
            {langs.map((item) => {
              const isSelected = item.type === i18next.language;
              return (
                <div
                  onClick={() => handleChangeLanguage(item.type)}
                  key={item.type}
                  className={`${styles.item} ${
                    isSelected ? styles.selected : ""
                  }`}
                >
                  {item.name}
                  {isSelected ? (
                    <div className={styles.selectedIcon}>
                      <SelectedIcon></SelectedIcon>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Popover>
      <div className={`${styles.popover} ${open ? styles.show : ""}`}></div>
    </div>
  );
};
