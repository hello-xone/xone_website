import { useMemo, useRef } from "react";
import hellowXonePag from "@/assets/pag/hellow_xone.pag";
import InfoIcon1 from "@/assets/svg/home/info_icon1.svg?react";
import InfoIcon2 from "@/assets/svg/home/info_icon2.svg?react";
import InfoIcon3 from "@/assets/svg/home/info_icon3.svg?react";
import InfoIcon4 from "@/assets/svg/home/info_icon4.svg?react";
import InfoArrowIcon from "@/assets/svg/home/info_arrow.svg?react";
import ArrowIcon from "@/assets/svg/home/arrow.svg?react";
import { BaseContainer } from "@/components/layout/BaseContainer";
import { PagAnimation } from "@/components/comm/pagAnimation";
import styles from "./index.module.less";
import { Description } from "@/components/comm/description";
import { Link } from "@/components/comm/link";
import { useTranslation } from "react-i18next";
import { EXTERNAL_LINKS } from "@/constants/external";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";
import video1 from "@/assets/video/hellow_xone1.mp4";
import video2 from "@/assets/video/hellow_xone2.mp4";
import video3 from "@/assets/video/hellow_xone3.mp4";
import video4 from "@/assets/video/hellow_xone4.mp4";
import { useStartupLoaded } from "@/hooks/useStartupLoaded";

const HelloXone = () => {
  const { t, i18n } = useTranslation();
  useScrollreveal();
  const operationAnimationMap = useRef<{ [key: string]: HTMLVideoElement }>({});
  const infos = useMemo(() => {
    return [
      {
        icon: <InfoIcon1></InfoIcon1>,
        title: t("home:ofInfiniteValue"),
        description: t("home:hellowXoneDesc1"),
        url: EXTERNAL_LINKS.docs + "study/xoc",
      },
      {
        icon: <InfoIcon2></InfoIcon2>,
        title: t("home:lowGas"),
        description: t("home:hellowXoneDesc2"),
        url: EXTERNAL_LINKS.docs + "study/gas",
      },
      {
        icon: <InfoIcon3></InfoIcon3>,
        title: t("home:extensible"),
        description: t("home:hellowXoneDesc3"),
        url: EXTERNAL_LINKS.docs + "study/modules",
      },
      {
        icon: <InfoIcon4></InfoIcon4>,
        title: t("home:AheadOfTheTimesPOBVI"),
        description: t("home:hellowXoneDesc4"),
        url: EXTERNAL_LINKS.docs + "bvi/readme",
      },
    ];
  }, [i18n.language]);

  const addAnimationMethod = (id: number, data: HTMLVideoElement) => {
    if (operationAnimationMap.current) {
      operationAnimationMap.current[String(id)] = data;
    }
  };

  const operations = useMemo(() => {
    return [
      {
        id: 1,
        file: video1,
        title: t("home:hellowXoneTitle5"),
        description: t("home:hellowXoneDesc5"),
        linkText: t("home:linkText1"),
        url: EXTERNAL_LINKS.docs + "developers/ready",
      },
      {
        id: 2,
        file: video2,
        title: t("home:hellowXoneTitle6"),
        description: t("home:hellowXoneDesc6"),
        linkText: t("home:linkText2"),
        url: EXTERNAL_LINKS.docs + "developers/operators/practices",
      },
      {
        id: 3,
        file: video3,
        title: t("home:hellowXoneTitle7"),
        description: t("home:hellowXoneDesc7"),
        linkText: t("home:linkText3"),
        url: EXTERNAL_LINKS.docs + "bvi/identity",
      },
      {
        id: 4,
        file: video4,
        title: t("home:hellowXoneTitle8"),
        description: t("home:hellowXoneDesc8"),
        linkText: t("home:linkText4"),
        url: EXTERNAL_LINKS.docs + "developers/tools",
      },
    ];
  }, [i18n.language]);

  const refreshVideo = (target: HTMLVideoElement) => {
    if (!target) return;
    target.play();
    window.setTimeout(() => {
      target.pause();
      window.setTimeout(() => {
        target.currentTime = 0;
      }, 30)
    }, 30)
  }

  useStartupLoaded(() => {
    Object.keys(operationAnimationMap.current).forEach((key) => {
      const videoEl = operationAnimationMap.current[key];
      window.setTimeout(() => {
        refreshVideo(videoEl);
      }, 400)
    })
  }, []);

  return (
    <BaseContainer className={styles.wrapper}>
      <div className={`${styles.banner} ${AnimationName.SLIDE_IN_BOTTOM}`}>
        <div className={styles.bannerAnimation}>
          <h1 className={`${styles.bannerSlogon}`}>
            <span className={``}>{t("home:hellowXone")}</span>
          </h1>
          <PagAnimation
            pag={hellowXonePag}
            aspectRatio={0.148}
            infinite
          ></PagAnimation>
        </div>
      </div>
      <div className={styles.list}>
        {infos.map((item, index) => {
          return (
            <Link
              href={item.url}
              className={`${styles.info} flex items-center wow animated slideInUp`}
              key={index}
              data-wow-delay={parseFloat(String(index * 0.2)).toFixed(1) + "s"}
            >
              <div className={styles.infoIconWrapper}>
                <div className={styles.infoIcon}>{item.icon}</div>
              </div>
              <div className={styles.infoRight}>
                <div
                  className={`${styles.infoTitle} ${AnimationName.SLIDE_IN_BOTTOM}`}
                >
                  {item.title}
                </div>
                <Description
                  className={`${styles.infoDescription} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_2}`}
                >
                  {item.description}
                </Description>
              </div>
              <div className={styles.infoArrow}>
                <InfoArrowIcon></InfoArrowIcon>
              </div>
            </Link>
          );
        })}
      </div>

      <div className={styles.list}>
        {operations.map((item) => {
          return (
            <div
              className={`${styles.operation} ${AnimationName.SLIDE_IN_BOTTOM}`}
              key={item.id}
              onMouseEnter={() => {
                operationAnimationMap.current[String(item.id)]?.play();
              }}
              onMouseLeave={() => {
                if (operationAnimationMap.current[String(item.id)]) {
                  operationAnimationMap.current[String(item.id)].pause();
                  window.setTimeout(() => {
                    operationAnimationMap.current[String(item.id)].currentTime =
                      0;
                  }, 16);
                }
              }}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className={styles.videoWrapper}>
                    <video
                      key={item.id}
                      muted
                      controls={false}
                      data-wf-ignore="true"
                      preload="auto"
                      playsInline
                      webkit-playsinline
                      x5-video-player-type="h5"
                      x-webkit-airplay="true"
                      webkit-airplay="allow"
                      ref={(data: HTMLVideoElement) => {
                        addAnimationMethod(item.id, data);
                      }}
                    >
                      <source src={item.file} type="video/mp4" />
                    </video>
                  </div>
                  <div
                    className={`${styles.operationTitle} ${AnimationName.SLIDE_IN_BOTTOM}`}
                  >
                    {item.title}
                  </div>
                  <Description
                    className={`${styles.infoDescription} __lineHeight150 ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_3}`}
                  >
                    {item.description}
                  </Description>
                </div>
                {item.url ? (
                  <Link
                    className={`${styles.operationMore} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_6}`}
                    href={item.url}
                  >
                    {item.linkText}
                    <div className={styles.arrowIcon}>
                      <ArrowIcon></ArrowIcon>
                    </div>
                  </Link>
                ) : (
                  <div
                    className={`${styles.operationMore} ${styles.comingSoon}  ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_6}`}
                  >
                    {t("common:comingSoon")}...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </BaseContainer>
  );
};

export default HelloXone;
