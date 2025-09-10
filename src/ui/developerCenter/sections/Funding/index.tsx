import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import FundingIcon01Dark from "@/assets/imgs/developer/dark/funding1.png";
import FundingIcon02Dark from "@/assets/imgs/developer/dark/funding2.png";
import FundingIcon03Dark from "@/assets/imgs/developer/dark/funding3.png";
import FundingIcon01Light from "@/assets/imgs/developer/funding1.png";
import FundingIcon02Light from "@/assets/imgs/developer/funding2.png";
import FundingIcon03Light from "@/assets/imgs/developer/funding3.png";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

import styles from "./index.module.less";

export const Funding = () => {
  const { t, i18n } = useTranslation();
  const { isLight } = useCurrentTheme();

  const list = useMemo(() => {
    return [
      {
        icon: isLight ? FundingIcon01Light : FundingIcon01Dark,
        title: t("developer:fundingFaucet"),
        url: "https://faucet.xone.org/",
      },
      {
        icon: isLight ? FundingIcon02Light : FundingIcon02Dark,
        title: t("developer:fundingBountyHunter"),
        url: "https://docs.xone.org/study/bug",
      },
    ];
  }, [i18n.language, isLight]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1 className={`${styles.slogon}`}>
          {t("developer:fundingTitle")}
        </h1>
        <div className={`${styles.card}`}>
          <div className={styles.icon}>
            <img
              className="w-full h-full"
              src={isLight ? FundingIcon03Light : FundingIcon03Dark}
            />
          </div>
          <div>
            <h1 className={styles.name}>{t("developer:fundingGrants")}</h1>
            <SeeMore
              href="/grants"
              className={`${styles.viewDetails}`}
              text={t("common:viewDetails")}
            ></SeeMore>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles.card}`}
            >
              <div className={styles.icon}>
                <img
                  className="w-full h-full"
                  src={item.icon}
                  alt={item.title}
                />
              </div>
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
