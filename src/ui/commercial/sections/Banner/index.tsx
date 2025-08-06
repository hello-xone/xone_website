import XoneLogo from "@/assets/svg/home/loog_small.svg?react";
import CopyIcon from "@/assets/svg/home/copy.svg?react";
import styles from "./index.module.less";
import { useTranslation } from "react-i18next";
import { useScrollreveal } from "@/hooks/useScrollreveal";
import { useEffect } from "react";
import { AnimationType, Animation } from "@/components/comm/animation";
import { BannerWrapper } from "@/components/layout/BannerWrapper";
import { useCopy } from "@/hooks/useCopy";

export const Banner = () => {
  const { t } = useTranslation();
  const { update } = useScrollreveal();
  const { copy } = useCopy();
  useEffect(() => {
    update();
  }, []);

  const handleClick = () => {
    window.location.href = "mailto:business@xone.org";
  };

  return (
    <BannerWrapper>
      <div className={styles.banner}>
        <div
          className={`${styles.bannerImg}`}
          style={{
            backgroundImage: `url(/imgs/commercial_banner.jpg)`,
          }}
        ></div>
        <div className={styles.info}>
          <Animation
            className={`${styles.slogon}`}
            animationClassName={AnimationType.SLIDE_IN_UP}
            delay={0.1}
          >
            {t("commercial:bannerTitle")}
          </Animation>
          <Animation
            className={`${styles.description}`}
            animationClassName={AnimationType.SLIDE_IN_UP}
            delay={0.3}
          >
            {t("commercial:bannerDesc")}
          </Animation>
          <Animation
            className={styles.animation}
            animationClassName={AnimationType.SLIDE_IN_UP}
            delay={0.6}
          >
            <a
              href="javascript:void(0);"
              onClick={handleClick}
              className={`${styles.card}`}
            >
              <div className="flex items-center">
                <div className={styles.logo}>
                  <XoneLogo></XoneLogo>
                </div>
                <span>business@xone.org</span>
              </div>
              <div
                className={styles.copyIcon}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.nativeEvent.preventDefault();
                  copy("business@xone.org");
                }}
              >
                <CopyIcon></CopyIcon>
              </div>
            </a>
          </Animation>
        </div>
      </div>
    </BannerWrapper>
  );
};
