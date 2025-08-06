import { BaseContainer } from "@/components/layout/BaseContainer";
import styles from "./index.module.less";
import { Description } from "@/components/comm/description";
import { Button } from "@/components/comm/button";
import ArrowIcon from "@/assets/svg/home/info_arrow.svg?react";
import { EXTERNAL_LINKS } from "@/constants/external";

import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";
import { useTranslation } from "react-i18next";

export const Start = () => {
  const { t, i18n } = useTranslation();
  useScrollreveal();
  return (
    <BaseContainer
      className={`${styles.box} ${AnimationName.SLIDE_IN_FADE} ${DelayClassName.DELAY_2}`}
    >
      <h1 className={`${styles.title} ${AnimationName.SLIDE_IN_BOTTOM}`}>
        {t("home:startTitle")}
      </h1>
      <Description
        className={`${styles.description} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_5}`}
      >
        {t("home:startDesc")}
      </Description>
      <div
        className={`${styles.btnWrapper} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_7}`}
      >
        <Button
          type="gradient"
          className={`${styles.btn} wow animated fadeIn`}
          data-wow-delay="0.4s"
          disabled
        >
          {t("home:exploreBVI")}{" "}
          <div className={styles.btnIcon}>
            <ArrowIcon></ArrowIcon>
          </div>
        </Button>
        <Button
          type="white"
          className={`${styles.btn} ${styles.whiteBtn}  wow animated fadeIn`}
          data-wow-delay="0.7s"
          onClick={() => window.open(EXTERNAL_LINKS.dashboard + i18n.language + "/community")}
        >
          {t("home:joinNow")}{" "}
          <div className={`${styles.btnIcon} `}>
            <ArrowIcon></ArrowIcon>
          </div>
        </Button>
      </div>
    </BaseContainer>
  );
};
