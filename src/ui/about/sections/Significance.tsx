import { useTranslation } from "react-i18next";

import bannerCardIconDark from "@/assets/imgs/about/dark/card-icon-01.png";
import bannerCardIconLight from "@/assets/imgs/about/light/card-icon-01.png";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

export default function Significance() {
  const { t } = useTranslation();

  const { isLight } = useCurrentTheme();

  const list = [
    {
      title: t("about:significanceListTitle01"),
      desc: t("about:significanceListDesc01"),
    },
    {
      title: t("about:significanceListTitle02"),
      desc: t("about:significanceListDesc02"),
    },
    {
      title: t("about:significanceListTitle03"),
      desc: t("about:significanceListDesc03"),
    },
  ];

  return (
    <div className="mt-[40px] md:mt-[160px]">
      <div>
        <p className="text-[16px] font-normal text-[var(--t2)]">
          {t("about:significanceSubTitle")}
        </p>
        <h2 className="mt-[12px] md:mt-[14px] text-[24px] md:text-[48px] font-bold text-[var(--t1)]">
          {t("about:significanceTitle")}
        </h2>
      </div>
      <div className="mt-[20px] md:mt-[32px] flex flex-col md:flex-row md:gap-[36px] gap-[24px]">
        <div className="flex-1 flex flex-col md:gap-[30px] gap-[22px]">
          <div className="hidden md:block">
            <p className="text-[16px] font-normal text-[var(--t1)]">
              {t("about:significanceDesc01")}
            </p>
            <p className="text-[16px] font-normal text-[var(--t1)]">
              {t("about:significanceDesc02")}
            </p>
          </div>
          <div className="block md:hidden">
            <p className="text-[16px] font-normal text-[var(--t1)]">
              {t("about:significanceDesc01")}
              {t("about:significanceDesc02")}
            </p>
          </div>
          <div className="w-full md:h-full h-[232px] rounded-[8px] bg-[var(--b3)] md:ml-[10px] ml-[0]"></div>
        </div>
        <div className="flex-1 flex flex-col md:gap-[48px] gap-[16px]">
          {list.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-[20px] bg-[var(--b2)] rounded-[24px] p-[24px]"
            >
              <img
                className="block w-[54px] h-[54px]"
                src={isLight ? bannerCardIconLight : bannerCardIconDark}
                alt={item.title}
              />
              <div className="flex flex-col gap-[16px]">
                <h3 className="md:text-[24px] text-[20px] font-bold text-[var(--t1)]">
                  {item.title}
                </h3>
                <p className="text-[16px] font-normal text-[var(--t2)]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
