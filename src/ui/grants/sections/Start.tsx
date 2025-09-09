import { useTranslation } from "react-i18next";

import StartIcon from "@/assets/imgs/home/start.png";
import StartDarkIcon from "@/assets/imgs/home/start-dark.png";
import { SeeMore } from "@/components/comm/link/SeeMore";
import useApplicationStore from "@/store/applicationStore";

import styles from "../index.module.less";

export const Start = () => {
  const { t } = useTranslation();
  const { isLight } = useApplicationStore();

  return (
    <div
      className={`flex flex-col-reverse justify-between items-start md:items-center gap-[30px] md:gap-10 md:flex-row mt-[90px] md:mt-[120px] mb-[40px] md:mb-[160px]`}
    >
      <div className="flex flex-col items-start md:w-[850px] w-full">
        <h2
          className={`text-[var(--b5)] color-[var(--b1)] mb-[28px] md:text-[48px] text-[24px] leading-[1.2]`}
        >
          {t("grants:startTitle")}
        </h2>
        <p
          className={`mt-2 w-full md:w-[800px] text-[var(--t1)] md:text-[18px] text-[15px]`}
        >
          {t("grants:startDesc")}
        </p>
        <p
          className={`mt-2 w-full md:w-[800px] text-[var(--t1)] md:text-[18px] text-[15px]`}
        >
          {t("grants:startDesc1")}
        </p>
        <p
          className={`mt-2 w-full md:w-[800px] text-[var(--t1)] md:text-[18px] text-[15px]`}
        >
          {t("grants:startDesc2")}
        </p>
        <div
          className={`flex justify-start w-full gap-[24px] mt-[30px] md:mt-[34px]`}
        >
          <div
            className="py-[12px] px-[16px] bg-[var(--t1)] rounded-[8px] text-[var(--t5)] text-[14px] hover:bg-[var(--b10)] cursor-pointer"
            onClick={() => window.open("https://forms.gle/U7yatCsQzY7LS1NY7")}
          >
            {t("grants:startButton1")}
          </div>
          <div
            className="py-[12px] px-[16px] bg-[var(--b3)] rounded-[8px] text-[var(--t1)] text-[14px] hover:bg-[var(--layer4)] cursor-pointer"
            onClick={() => window.open("https://docs.xone.org/study/grants")}
          >
            {t("grants:startButton2")}
          </div>
        </div>
      </div>
      <img
        src={isLight ? StartIcon : StartDarkIcon}
        alt="start"
        className={`block md:w-[220px] md:h-[229px] w-[88px] h-[88px]`}
      />
    </div>
  );
};
