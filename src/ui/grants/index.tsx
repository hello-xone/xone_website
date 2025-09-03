import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import IconSvgDark1 from "@/assets/imgs/grants/dark/icon_1.png";
import IconSvgDark2 from "@/assets/imgs/grants/dark/icon_2.png";
import IconSvgDark3 from "@/assets/imgs/grants/dark/icon_3.png";
import IconSvgDark4 from "@/assets/imgs/grants/dark/icon_4.png";
import IconSvgDark5 from "@/assets/imgs/grants/dark/icon_5.png";
import IconSvgDark6 from "@/assets/imgs/grants/dark/icon_6.png";
import IconSvgDark7 from "@/assets/imgs/grants/dark/icon_7.png";
import IconSvgDark8 from "@/assets/imgs/grants/dark/icon_8.png";
import IconSvgDark9 from "@/assets/imgs/grants/dark/icon_9.png";
import IconSvgDark10 from "@/assets/imgs/grants/dark/icon_10.png";
import IconSvgDark11 from "@/assets/imgs/grants/dark/icon_11.png";
import IconSvgDark12 from "@/assets/imgs/grants/dark/icon_12.png";
import IconSvgLight1 from "@/assets/imgs/grants/light/icon_1.png";
import IconSvgLight2 from "@/assets/imgs/grants/light/icon_2.png";
import IconSvgLight3 from "@/assets/imgs/grants/light/icon_3.png";
import IconSvgLight4 from "@/assets/imgs/grants/light/icon_4.png";
import IconSvgLight5 from "@/assets/imgs/grants/light/icon_5.png";
import IconSvgLight6 from "@/assets/imgs/grants/light/icon_6.png";
import IconSvgLight7 from "@/assets/imgs/grants/light/icon_7.png";
import IconSvgLight8 from "@/assets/imgs/grants/light/icon_8.png";
import IconSvgLight9 from "@/assets/imgs/grants/light/icon_9.png";
import IconSvgLight10 from "@/assets/imgs/grants/light/icon_10.png";
import IconSvgLight11 from "@/assets/imgs/grants/light/icon_11.png";
import IconSvgLight12 from "@/assets/imgs/grants/light/icon_12.png";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

import styles from "./index.module.less";
import { CardList } from "./sections/CardList";
import { CommonProblem } from "./sections/CommonProblem";
import { Header } from "./sections/Header";
import { Start } from "./sections/Start";
import { SupportProvided } from "./sections/SupportProvided";

export const Grants = () => {
  const { t } = useTranslation();
  const { isLight } = useCurrentTheme();

  const card01List = useMemo(() => {
    return [
      {
        title: t("grants:cardDesc01InfrastructureTitle"),
        description: t("grants:cardDesc01InfrastructureDesc"),
        icon: isLight ? IconSvgLight1 : IconSvgDark1,
      },
      {
        title: t("grants:cardDesc01DefiTitle"),
        description: t("grants:cardDesc01DefiDesc"),
        icon: isLight ? IconSvgLight2 : IconSvgDark2,
      },
      {
        title: t("grants:cardDesc01RwaTitle"),
        description: t("grants:cardDesc01RwaDesc"),
        icon: isLight ? IconSvgLight3 : IconSvgDark3,
      },
      {
        title: t("grants:cardDesc01MemefiTitle"),
        description: t("grants:cardDesc01MemefiDesc"),
        icon: isLight ? IconSvgLight4 : IconSvgDark4,
      },
      {
        title: t("grants:cardDesc01GamefiTitle"),
        description: t("grants:cardDesc01GamefiDesc"),
        icon: isLight ? IconSvgLight5 : IconSvgDark5,
      },
      {
        title: t("grants:cardDesc01DataTitle"),
        description: t("grants:cardDesc01DataDesc"),
        icon: isLight ? IconSvgLight6 : IconSvgDark6,
      },
    ];
  }, [isLight, t]);

  const card02List = useMemo(() => {
    return [
      {
        title: t("grants:cardDesc02OpenSourceTitle"),
        icon: isLight ? IconSvgLight7 : IconSvgDark7,
      },
      {
        title: t("grants:cardDesc02MvpTitle"),
        icon: isLight ? IconSvgLight8 : IconSvgDark8,
      },
      {
        title: t("grants:cardDesc02TeamTitle"),
        icon: isLight ? IconSvgLight9 : IconSvgDark9,
      },
      {
        title: t("grants:cardDesc02BudgetTitle"),
        icon: isLight ? IconSvgLight10 : IconSvgDark10,
      },
      {
        title: t("grants:cardDesc02ChainTitle"),
        icon: isLight ? IconSvgLight11 : IconSvgDark11,
      },
      {
        title: t("grants:cardDesc02CommunityTitle"),
        icon: isLight ? IconSvgLight12 : IconSvgDark12,
      },
    ];
  }, [isLight, t]);

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
          <div className="mt-10 md:block">
            <SeeMore
              className={`${styles.seeMore} flex justify-center`}
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
