import { BaseContainer } from "@/components/layout/BaseContainer";
import styles from "./index.module.less";
import { Button } from "@/components/comm/button";
import { Description } from "@/components/comm/description";
import { Title } from "@/components/comm/title";
import { useTranslation } from "react-i18next";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";
import Logo from "@/assets/svg/home/logo.svg?react";
import { MessageBox } from "./components/MessageBox";

export const Governance = () => {
  const { t } = useTranslation();
  useScrollreveal();
  return (
    <BaseContainer className={styles.wrapper}>
      <div className={`${styles.animation} ${AnimationName.SLIDE_IN_FADE}`}>
        <div className={styles.propUp}></div>
        <div className={styles.animationContent}>
          <div className={styles.logo}>
            <Logo></Logo>
          </div>
          <div className={styles.cardWrapper}>
            <MessageBox></MessageBox>
          </div>
        </div>
      </div>
      <div className={`${styles.info}`}>
        <Title
          className={`${AnimationName.SLIDE_IN_BOTTOM}`}
          data-wow-delay="0.4s"
        >
          {t("home:governanceTitle")}
        </Title>
        <Description
          className={`${styles.description} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_2}`}
          data-wow-delay="0.6s"
        >
          {t("home:governanceDesc")}
        </Description>
        <Button
          size="large"
          className={`${styles.btn} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_2}`}
          data-wow-delay="0.8s"
          disabled
        >
          {t("common:getStarted")}
        </Button>
      </div>
    </BaseContainer>
  );
};
