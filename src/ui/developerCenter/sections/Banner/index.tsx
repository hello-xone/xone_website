import { useTranslation } from "react-i18next";

// import bannerSVG from "@/assets/svg/developer/banner.svg";
import { Animation, AnimationType } from "@/components/comm/animation";
import { Title } from "@/components/comm/title";

import styles from "./index.module.less";

export const Banner = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[380px] md:h-[700px] mb-[20px]">
      <div className={styles.banner}>
        <div
          className={`${styles.bannerImg}`}
          // style={{
          //   backgroundImage: `url(${bannerSVG})`,
          // }}
        ></div>
        <div className={styles.box}>
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.1}>
            <Title className={`${styles.slogon}`}>
              <span
                dangerouslySetInnerHTML={{ __html: t("developer:bannerTitle") }}
              ></span>
            </Title>
          </Animation>
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.3}>
            <p className={`${styles.description}`}>
              {t("developer:bannerDesc")}
            </p>
          </Animation>
        </div>
      </div>
    </div>
  );
};
