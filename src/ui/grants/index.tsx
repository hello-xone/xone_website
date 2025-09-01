import { useTranslation } from "react-i18next";

import IconSvg from "@/assets/svg/grants/icon.svg?react";
import { SeeMore } from "@/components/comm/link/SeeMore";

import styles from "./index.module.less";
import { CardList } from "./sections/CardList";
import { CommonProblem } from "./sections/CommonProblem";
import { Header } from "./sections/Header";
import { Start } from "./sections/Start";
import { SupportProvided } from "./sections/SupportProvided";

export const Grants = () => {
  const { t } = useTranslation();

  const card01List = [
    {
      title: t("grants:cardDesc01InfrastructureTitle"),
      description: t("grants:cardDesc01InfrastructureDesc"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc01DefiTitle"),
      description: t("grants:cardDesc01DefiDesc"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc01RwaTitle"),
      description: t("grants:cardDesc01RwaDesc"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc01MemefiTitle"),
      description: t("grants:cardDesc01MemefiDesc"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc01GamefiTitle"),
      description: t("grants:cardDesc01GamefiDesc"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc01DataTitle"),
      description: t("grants:cardDesc01DataDesc"),
      icon: IconSvg,
    },
  ];

  const card02List = [
    {
      title: t("grants:cardDesc02OpenSourceTitle"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc02MvpTitle"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc02TeamTitle"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc02BudgetTitle"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc02ChainTitle"),
      icon: IconSvg,
    },
    {
      title: t("grants:cardDesc02CommunityTitle"),
      icon: IconSvg,
    },
  ];

  return (
    <>
      <Header />
      <div className="container">
        <div className="pt-[20px]">
          <CardList
            title={t("grants:cardTitle01")}
            description={t("grants:cardDesc01")}
            list={card01List}
          />
        </div>
        <div className="mt-[80px] md:mt-[150px]">
          <CardList
            title={t("grants:cardTitle02")}
            description={t("grants:cardDesc02")}
            list={card02List}
            isMobileTow={true}
          />
          <div className="mt-10 w-[90px] md:block hidden mx-auto">
            <SeeMore
              className={styles.seeMore}
              href="https://docs.xone.org/study/grants"
              text={t("grants:seeAllButton")}
              target="_blank"
            ></SeeMore>
          </div>
        </div>
        <SupportProvided />
        <CommonProblem />
        <Start />
      </div>
    </>
  );
};
