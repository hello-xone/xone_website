import bannerSVG from "@/assets/svg/developer/banner.svg";
import styles from "./index.module.less";
import { useTranslation } from "react-i18next";
import { BannerWrapper } from "@/components/layout/BannerWrapper";
import { Animation, AnimationType } from "@/components/comm/animation";

export const Banner = () => {
  const { t } = useTranslation();

  return (
    <BannerWrapper>
      <div className={styles.banner}>
        <div
          className={`${styles.bannerImg}`}
          style={{
            backgroundImage: `url(${bannerSVG})`,
          }}
        ></div>
        <div className={styles.box}>
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.1}>
            <h1 className={`${styles.slogon}`}>{t("developer:bannerTitle")}</h1>
          </Animation>
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.3}>
            <p className={`${styles.description}`}>
              {t("developer:bannerDesc")}
            </p>
          </Animation>
        </div>
      </div>
    </BannerWrapper>
  );
};
