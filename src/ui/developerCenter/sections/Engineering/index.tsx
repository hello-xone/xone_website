import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import GithubIcon from "@/assets/svg/developer/github.svg?react";
import { Description } from "@/components/comm/description";
import { Link } from "@/components/comm/link";

import styles from "./index.module.less";

export const Engineering = () => {
  const { t, i18n } = useTranslation();
  const gits = useMemo(() => {
    return [
      {
        name: "Xone Chain",
        link: "https://github.com/hello-xone/xone_chain",
      },
      {
        name: "Go-Ethereum",
        link: "https://github.com/hello-xone/xone_go-ethereum",
      },
      {
        name: "Cosmos-SDK",
        link: "https://github.com/hello-xone/xone_cosmos-sdk",
      },
      {
        name: "Evmos",
        link: "https://github.com/hello-xone/xone_evmos",
      },
      {
        name: "Assets",
        link: "https://github.com/hello-xone/xone_assets",
      },
      {
        name: "Website",
        link: "https://github.com/hello-xone/xone_website",
      },
      {
        name: "Explorer",
        link: "https://github.com/hello-xone/xone_explorer",
      },
      {
        name: "Faucet",
        link: "https://github.com/hello-xone/xone_faucet",
      },
      {
        name: "Dashboard",
        link: "https://github.com/hello-xone/xone_dashboard",
      },
      {
        name: "Xone Docs",
        link: "https://github.com/hello-xone/official_docs",
      },
    ];
  }, [i18n.language]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h1 className={`${styles.slogon}`}>
          {t("developer:engineeringTitle")}
        </h1>
        <Description
          className={`${styles.description}`}
        >
          {t("developer:engineeringDesc")}
        </Description>
      </div>
      <div
        className={`${styles.content}`}
      >
        <Swiper
          className="w-full"
          direction="horizontal"
          freeMode={true}
          slidesPerView="auto"
          modules={[FreeMode]}
          mousewheel={{
            forceToAxis: true,
            invert: false,
          }}
        >
          <SwiperSlide className={styles.githubsWrapper}>
            <div className={styles.gits}>
              {gits.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className={`${styles.git}`}
                  >
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.githubIcon}>
                      <GithubIcon></GithubIcon>
                    </div>
                    <h2>Github</h2>
                  </Link>
                );
              })}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
