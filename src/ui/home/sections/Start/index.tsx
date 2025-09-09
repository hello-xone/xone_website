import { useTranslation } from "react-i18next";

import StartIcon from "@/assets/imgs/home/start.png";
import StartDarkIcon from "@/assets/imgs/home/start-dark.png";
import { Description } from "@/components/comm/description";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { Title } from "@/components/comm/title";
import { EXTERNAL_LINKS } from "@/constants/external";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";
import useApplicationStore from "@/store/applicationStore";

import styles from "./index.module.less";

export const Start = () => {
  const { t, i18n } = useTranslation();
  const { isLight } = useApplicationStore();

  useScrollreveal();
  return (
    <div
      className={`${styles.start} ${AnimationName.SLIDE_IN_FADE} ${DelayClassName.DELAY_2}`}
    >
      <div className={styles.box}>
        <Title className={`${styles.title} ${AnimationName.SLIDE_IN_BOTTOM}`}>
          {t("home:startTitle")}
        </Title>
        <Description
          className={`${styles.description} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_5}`}
        >
          {t("home:startDesc")}
        </Description>
        <div
          className={`${styles.btnWrapper} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_7}`}
        >
          <SeeMore
            href={EXTERNAL_LINKS.dashboard + i18n.language}
            className={styles.btn}
            text={t("home:exploreBVI")}
            target="_blank"
          ></SeeMore>
          <SeeMore
            className={styles.btn}
            href={EXTERNAL_LINKS.dashboard + i18n.language + "/community"}
            text={t("home:joinNow")}
            target="_blank"
          ></SeeMore>
        </div>
      </div>
      <img
        src={isLight ? StartIcon : StartDarkIcon}
        alt="start"
        className={`${styles.startIcon} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_5}`}
      />
    </div>
  );
};
