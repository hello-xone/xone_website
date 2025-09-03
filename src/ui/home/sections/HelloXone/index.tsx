import Lottie from "lottie-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import BgIcon2 from "@/assets/imgs/home/bg-2.png";
import BgIcon3 from "@/assets/imgs/home/bg-3.png";
import DeployingDappsJson from "@/assets/lottie/deploying-dapps.json";
import DeployingDappsDarkJson from "@/assets/lottie/deploying-dapps-dark.json";
import FinancialSystemJson from "@/assets/lottie/financial-system.json";
import FinancialSystemDarkJson from "@/assets/lottie/financial-system-dark.json";
import StartNodeJson from "@/assets/lottie/start-node.json";
import StartNodeDarkJson from "@/assets/lottie/start-node-dark.json";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { Title } from "@/components/comm/title";
import { EXTERNAL_LINKS } from "@/constants/external";
import { AnimationName } from "@/hooks/useScrollreveal";

import styles from "./index.module.less";
import useApplicationStore from "@/store/applicationStore";

const HelloXone = () => {
  const { t } = useTranslation();
  const { isLight } = useApplicationStore()
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
          <SeeMore
            href={EXTERNAL_LINKS.docs + "developers/guide"}
            target="_blank"
            className={`${styles.btn} ${styles.seeMoreBtn}`}
            text={t("home:hellowXoneLinkText2")}
          ></SeeMore>
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
                {/* <div className={styles.contentItemImage}></div> */}
                <Lottie animationData={operation.id === 1 ? (isLight ? StartNodeJson : StartNodeDarkJson) : (isLight ? DeployingDappsJson : DeployingDappsDarkJson)} loop={true} ></Lottie>
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
                <Lottie animationData={isLight ? FinancialSystemJson : FinancialSystemDarkJson} loop={true} ></Lottie>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelloXone;
