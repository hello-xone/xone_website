import { useMemo } from "react";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

import ArrowIcon from "@/assets/svg/home/arrow-right-line.svg?react";
import { Button } from "@/components/comm/button";
import { Description } from "@/components/comm/description";
import { Link } from "@/components/comm/link";
import { Title } from "@/components/comm/title";
import { EXTERNAL_LINKS } from "@/constants/external";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

import styles from "./index.module.less";

export const ExploreNature = () => {
  const { t, i18n } = useTranslation();
  useScrollreveal();

  const { md } = useTailwindBreakpoint();

  const imageLinks: Record<string, string> = {
    "aleta planet.svg": "https://aletaplanet.com/",
    "color-black.svg": "https://pancakeswap.finance/home",
    "Fenwick.svg": "/",
    "HL.svg": "https://hyperfoundation.org/",
    "Huobi.svg": "https://www.htx.com/",
    "MateMask.svg": "https://metamask.io/",
    "Movement.svg": "https://movementlabs.xyz/",
    "rainlink.svg": "https://rainlink.co/",
    "Sui.svg": "https://sui.io/",
    "SunSwap.svg": "https://sun.io/",
    "SwapX.svg": "https://swapx.exchange/en",
    "thunes.svg": "https://www.thunes.com/",
    "TokenUp.svg": "https://tokenup.org/en",
    "TRON.svg": "https://tron.network/",
    "Uniswap.svg": "https://app.uniswap.org/",
    "Xion.svg": "https://xion.burnt.com/",
  };

  const images = useMemo(() => {
    return import.meta.glob("@/assets/imgs/partners/*", {
      eager: true,
    }) as Record<string, { default: string }>;
  }, []);

  const imagesArr = useMemo(() => {
    const keys = Object.keys(images);
    const partSize = Math.ceil(keys.length / 4);
    const parts = [];
    for (let i = 0; i < 4; i++) {
      const start = i * partSize;
      const end = start + partSize;
      const part = keys.slice(start, end);
      parts.push(part.map((key) => images[key]));
    }
    return parts;
  }, [images]);

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={`${styles.info} wow animated slideInUp`}>
        <Title className={`${styles.title} ${AnimationName.SLIDE_IN_BOTTOM}`}>
          {t("home:exploreNatureTitle")}
        </Title>
        <Description
          className={`${styles.description} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_2}`}
        >
          {t("home:exploreNatureDesc")}
        </Description>
        {md && (
          <Link
            href={EXTERNAL_LINKS.dashboard + i18n.language + "/ecology"}
            className={`${styles.knowMore} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_2}`}
          >
            <h2>{t("common:knowMore")}</h2>
            <div className={styles.arrowIcon}>
              <ArrowIcon></ArrowIcon>
            </div>
          </Link>
        )}
      </div>
      <div
        className={`${styles.animationWrapper} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_4}`}
        data-wow-delay="0.3s"
      >
        <div className={styles.leftTransition}></div>
        <div className={styles.rightTransition}></div>
        <div className={styles.animation}>
          {imagesArr.map((imgs, i) => {
            return (
              <Marquee
                key={i}
                className={styles.marquee}
                pauseOnHover
                direction={(i + 1) % 2 === 0 ? "left" : "right"}
              >
                {imgs.map((img, index) => {
                  const imgName = img.default;
                  const lastIndex = imgName.lastIndexOf("/");
                  const indexImg = imgName.substring(
                    lastIndex + 1,
                    imgName.length
                  );
                  const link = imageLinks[indexImg];
                  return (
                    <div className={styles.logo} key={index}>
                      <Link href={link}>
                        <img className="h-full" src={img.default} alt="" />
                      </Link>
                    </div>
                  );
                })}
              </Marquee>
            );
          })}
        </div>
      </div>
      {!md && (
        <Button
          className={styles.btn}
          onClick={() =>
            window.open(EXTERNAL_LINKS.dashboard + i18n.language + "/community")
          }
        >
          {t("common:knowMore")}
          <div className={`${styles.btnIcon} `}>
            <ArrowIcon></ArrowIcon>
          </div>
        </Button>
      )}
    </div>
  );
};
