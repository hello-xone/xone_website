import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import BgIcon2 from "@/assets/imgs/home/bg-2.png";
import BgIcon3 from "@/assets/imgs/home/bg-3.png";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { Title } from "@/components/comm/title";
import { EXTERNAL_LINKS } from "@/constants/external";
import { AnimationName } from "@/hooks/useScrollreveal";

import styles from "./index.module.less";

const HelloXone = () => {
  const { t } = useTranslation();

  const operations = useMemo(() => {
    return [
      {
        id: 1,
        title: t("home:hellowXoneTitle1"),
        description: t("home:hellowXoneDesc1"),
        linkText: t("home:hellowXoneLinkText5"),
        url: EXTERNAL_LINKS.docs + "developers/operators/practices",
        imagePosition: "left", // 图片在左侧
      },
      {
        id: 2,
        title: t("home:hellowXoneTitle2"),
        description: t("home:hellowXoneDesc2"),
        linkText: t("home:hellowXoneLinkText4"),
        imagePosition: "right", // 图片在右侧
      },
      {
        id: 3,
        title: t("home:hellowXoneTitle3"),
        description: t("home:hellowXoneDesc3"),
        linkText: t("home:hellowXoneLinkText3"),
        url: EXTERNAL_LINKS.docs + "developers/tools",
        imagePosition: "left", // 图片在左侧
      },
    ];
  }, [t]);

  return (
    <div className={`${styles.wrapper}`}>
      <img
        alt=""
        src={BgIcon2}
        className="absolute right-0 max-md:hidden"
      ></img>
      <img
        alt=""
        src={BgIcon3}
        className="max-md:hidden absolute mt-[30%] left-0"
      ></img>

      <div className={`${styles.header} ${AnimationName.SLIDE_IN_BOTTOM}`}>
        <Title className={styles.headerTitle}>
          {t("home:hellowXoneTitle")}
        </Title>
        <p
          className={` ${styles.headerDescription} ${AnimationName.SLIDE_IN_BOTTOM}`}
        >
          {t("home:hellowXoneDesc")}
          <SeeMore href="" className="inline-block" text={t("home:seeMore")}></SeeMore>
        </p>

      </div>
      <div className={styles.content}>
        {operations.map((operation) => (
          <div
            key={operation.id}
            className={`${styles.contentItem} ${styles[operation.imagePosition]} ${AnimationName.SLIDE_IN_FADE}`}
          >
            {operation.imagePosition === "left" ? (
              <>
                <div className={styles.contentItemImage}></div>
                <div className={styles.contentItemDetail}>
                  <h3 className={styles.contentItemDetailTitle}>
                    {operation.title}
                  </h3>
                  <p className={styles.contentItemDetailDescription}>
                    {operation.description}
                  </p>
                  <SeeMore
                    className={styles.btn}
                    href={operation.url ?? ""}
                    disabled={!operation.url}
                    text={operation.linkText}
                    target="_blank"
                  ></SeeMore>
                </div>
              </>
            ) : (
              <>
                <div className={styles.contentItemDetail}>
                  <h3 className={styles.contentItemDetailTitle}>
                    {operation.title}
                  </h3>
                  <p className={styles.contentItemDetailDescription}>
                    {operation.description}
                  </p>
                  <SeeMore
                    className={styles.btn}
                    href={operation.url ?? ""}
                    disabled={!operation.url}
                    text={operation.linkText}
                    target="_blank"
                  ></SeeMore>
                </div>
                <div className={styles.contentItemImage}></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelloXone;
