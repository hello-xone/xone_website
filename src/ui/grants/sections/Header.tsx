import { useTranslation } from "react-i18next";

import logo from "@/assets/imgs/grants/logo.png";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <div className="lg:pt-20 md:pb-[160px] pb-[40px]">
      <div className="container flex flex-col-reverse justify-center items-center lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 mt-4 lg:mt-0">
          <h1
            className="text-[var(--t1)] text-[32px] md:text-[64px] leading-[1.3]"
            dangerouslySetInnerHTML={{ __html: t("grants:headerTitle") }}
          ></h1>
          <p className="text-[var(--t2)] md:text-[var(--t1)] text-[16px] md:text-[18px] leading-[1.6] mt-2 md:mt-7">
            {t("grants:headerDesc")}
          </p>
          <div className="flex flex-col md:flex-row gap-[14px] md:gap-[32px] mt-8 md:mt-14 items-center">
            <div
              onClick={() => window.open("https://forms.gle/U7yatCsQzY7LS1NY7")}
              className="bg-[var(--t1)] w-full md:w-[140px] h-[48px] md:h-[56px] text-center md:leading-[56px] leading-[48px] cursor-pointer rounded-[12px] text-[var(--t5)] text-[16px] md:text-[18px] font-semibold md:font-bold"
            >
              {t("grants:headerButton1")}
            </div>
            <div
              onClick={() => window.open("https://docs.xone.org/study/grants")}
              className="bg-[var(--b3)] w-full md:w-[140px] h-[48px] md:h-[56px] mt-1 text-center md:leading-[56px] leading-[48px] cursor-pointer rounded-[12px] text-[var(--t1)] text-[16px] md:text-[18px] font-semibold md:font-bold"
            >
              {t("grants:headerButton2")}
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <img
            className="w-[357px] h-[357px] lg:w-[496px] lg:h-[496px]"
            src={logo}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};
