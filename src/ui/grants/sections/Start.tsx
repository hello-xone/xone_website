import { useTranslation } from "react-i18next";

import StartIcon from "@/assets/imgs/home/start.png";
import { SeeMore } from "@/components/comm/link/SeeMore";

import styles from "../index.module.less";

export const Start = () => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col-reverse justify-between items-start md:items-center gap-[30px] md:gap-10 md:flex-row mt-[90px] md:mt-[120px] mb-[40px] md:mb-[160px]`}
    >
      <div className="flex flex-col items-start md:w-[850px] w-full">
        <h2
          className={`text-[var(--b5)] color-[var(--b1)] md:text-[48px] text-[24px] leading-[1.2]`}
        >
          {t("grants:startTitle")}
        </h2>
        <p
          className={`w-full md:w-[800px] text-[var(--t1)] md:text-[18px] text-[15px] md:mt-[40px] mt-[16px]`}
        >
          {t("grants:startDesc")}
        </p>
        <p
          className={`w-full md:w-[800px] text-[var(--t1)] md:text-[18px] text-[15px] md:mt-[40px] mt-[16px]`}
        >
          {t("grants:startDesc1")}
        </p>
        <p
          className={`w-full md:w-[800px] text-[var(--t1)] md:text-[18px] text-[15px] md:mt-[40px] mt-[16px]`}
        >
          {t("grants:startDesc2")}
        </p>
        <div
          className={`flex justify-start w-full gap-[50px] mt-[30px] md:mt-[34px]`}
        >
          <SeeMore
            className={styles.seeMore}
            href={"https://forms.gle/U7yatCsQzY7LS1NY7"}
            text={t("grants:startButton1")}
            target="_blank"
          ></SeeMore>
          <SeeMore
            className={styles.seeMore}
            href={"https://docs.xone.org/study/grants"}
            text={t("grants:startButton2")}
            target="_blank"
          ></SeeMore>
        </div>
      </div>
      <img
        src={StartIcon}
        alt="start"
        className={`block md:w-[220px] md:h-[229px] w-[88px] h-[88px]`}
      />
    </div>
  );
};
