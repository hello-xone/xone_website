import { BaseContainer } from "@/components/layout/BaseContainer";
import { useMemo } from "react";
import FaucetIcon from "@/assets/svg/developer/faucet.svg?react";
import KnightIcon from "@/assets/svg/home/knight.svg?react";
import ArrowIcon from "@/assets/svg/home/arrow.svg?react";
import { useTranslation } from "react-i18next";

import fatherStyles from "../index.module.less";
import styles from "./index.module.less";
import { Link } from "@/components/comm/link";
import { AnimationName, useScrollreveal } from "@/hooks/useScrollreveal";

export const Funding = () => {
  const { t, i18n } = useTranslation();
  const { delayClassNames } = useScrollreveal();
  const list = useMemo(() => {
    return [
      {
        icon: <FaucetIcon></FaucetIcon>,
        title: t("developer:fundingFaucet"),
        url: "https://faucet.xone.org/",
      },
      {
        icon: <KnightIcon></KnightIcon>,
        title: t("developer:fundingBountyHunter"),
        url: "https://docs.xone.org/study/bug",
      },
    ];
  }, [i18n.language]);

  return (
    <BaseContainer className={styles.wrapper}>
      <h1
        className={`${styles.slogon} ${fatherStyles.title} ${AnimationName.SLIDE_IN_BOTTOM}`}
      >
        {t("developer:fundingTitle")}
      </h1>
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
                <Link href={item.url} className={styles.viewDetails}>
                  {t("common:viewDetails")}
                  <div className={styles.arrowIcon}>
                    <ArrowIcon></ArrowIcon>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </BaseContainer>
  );
};
