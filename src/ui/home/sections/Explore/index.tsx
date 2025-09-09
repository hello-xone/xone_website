import { useTranslation } from "react-i18next";

import { Description } from "@/components/comm/description";
import { Title } from "@/components/comm/title";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";

import styles from "./index.module.less";

export const Explore = () => {
  const { t } = useTranslation();
  useScrollreveal();
  return (
    <div className={`${styles.wrapper} ${AnimationName.SLIDE_IN_BOTTOM}`}>
      <div className={`${styles.info}`}>
        <Title
          className={`${AnimationName.SLIDE_IN_BOTTOM} ${styles.title} ${DelayClassName.DELAY_4}`}
        >
          {t("home:exploreTitle")}
        </Title>
        <Description
          className={`${styles.description} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_6}`}
        >
          {t("home:exploreDesc")}
        </Description>
      </div>
      <div className={`${styles.video}`}>
      </div>
    </div>
  );
};
