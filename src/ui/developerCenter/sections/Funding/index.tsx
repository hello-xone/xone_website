import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import FundingIcon from "@/assets/svg/developer/funding.svg?react";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { AnimationName, useScrollreveal } from "@/hooks/useScrollreveal";

import styles from "./index.module.less";

export const Funding = () => {
  const { t, i18n } = useTranslation();
  const { delayClassNames } = useScrollreveal();
  const list = useMemo(() => {
    return [
      {
        icon: <FundingIcon></FundingIcon>,
        title: t("developer:fundingFaucet"),
        url: "https://faucet.xone.org/",
      },
      {
        icon: <FundingIcon></FundingIcon>,
        title: t("developer:fundingBountyHunter"),
        url: "https://docs.xone.org/study/bug",
      },
    ];
  }, [i18n.language]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1 className={`${styles.slogon} ${AnimationName.SLIDE_IN_BOTTOM}`}>
          {t("developer:fundingTitle")}
        </h1>
        <div className={`${styles.card} ${AnimationName.SLIDE_IN_BOTTOM}`}>
          <div className={styles.icon}>
            <FundingIcon></FundingIcon>
          </div>
          <div>
            <h1 className={styles.name}>{t("developer:fundingGrants")}</h1>
            <SeeMore
              href="https://xone.org/grants"
              className={`${styles.viewDetails}`}
              text={t("common:viewDetails")}
              target="_blank"
            ></SeeMore>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles.card} ${AnimationName.SLIDE_IN_BOTTOM} ${delayClassNames[index * 2] || ""}`}
            >
              <div className={styles.icon}>{item.icon}</div>
              <div>
                <h1 className={styles.name}>{item.title}</h1>
                <SeeMore
                  href={item.url}
                  className={`${styles.viewDetails}`}
                  text={t("common:viewDetails")}
                  target="_blank"
                ></SeeMore>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
