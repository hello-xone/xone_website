import { useTranslation } from "react-i18next";

import bannerCardIconDark from "@/assets/imgs/about/dark/card-icon-01.png";
import bannerCardIconLight from "@/assets/imgs/about/light/card-icon-01.png";
import { EXTERNAL_LINKS } from "@/constants/external";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

export default function Banner() {
  const { t } = useTranslation();

  const { isLight } = useCurrentTheme();

  const cardList = [
    {
      icon: isLight ? bannerCardIconLight : bannerCardIconDark,
      title: t("about:bannerCardTitle1"),
      desc: t("about:bannerCardDesc1"),
    },
    {
      icon: isLight ? bannerCardIconLight : bannerCardIconDark,
      title: t("about:bannerCardTitle2"),
      desc: t("about:bannerCardDesc2"),
    },
  ];

  const handleButtonClick = () => {
    window.open(EXTERNAL_LINKS.docs + "study/wiki", "_blank");
  };

  return (
    <div className="w-full">
      <div className="w-full mt-[40px] md:mt-[110px] pb-[20px] md:pb-[260px] md:px-[60px] px-[16px]">
        <div className="flex flex-col md:gap-y-[20px] gap-y-[16px] items-start md:items-center">
          <h1 className="text-[32px] md:text-[56px] font-bold text-[var(--t1)]">
            {t("about:bannerTitle")}
          </h1>
          <p
            className="hidden md:block text-[20px] font-normal text-[var(--t1)]"
            dangerouslySetInnerHTML={{ __html: t("about:bannerDesc") }}
          ></p>
          <p className="block md:hidden text-[16px] font-normal text-[var(--t1)]">
            {t("about:bannerDesc").replace(/<br\s*\/?>/g, "\n")}
          </p>
        </div>
        <div
          className="md:w-fit w-full md:mt-[40px] mt-[16px] md:mx-auto bg-[var(--t1)] text-t5 font-medium text-[14px] text-center rounded-[8px] cursor-pointer hover:bg-[var(--b10)] px-[30px] py-[11px]"
          onClick={handleButtonClick}
        >
          {t("about:bannerButton")}
        </div>
      </div>
      <div className="container hidden md:block">
        <div className="flex gap-x-[48px]">
          {cardList.map((item) => (
            <div
              className="flex flex-1 flex-col gap-y-[20px] h-[205px] bg-[var(--b2)] rounded-[24px] p-[24px]"
              key={item.title}
            >
              <img
                className="block w-[54px] h-[54px] mx-auto"
                src={item.icon}
                alt={item.title}
              />
              <div className="flex flex-col gap-y-[16px] text-center">
                <h2 className="text-[28px] font-bold text-[var(--t1)]">
                  {item.title}
                </h2>
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
