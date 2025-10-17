import { useTranslation } from "react-i18next";

import bannerCardIconDark from "@/assets/imgs/about/dark/card-icon-01.png";
import bannerCardIconLight from "@/assets/imgs/about/light/card-icon-01.png";
import { EXTERNAL_LINKS } from "@/constants/external";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

const LinkArrow = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer text-[var(--t1)] hover:text-[var(--link1)] transition-colors duration-200 md:ml-[10px] ml-[0] mt-[10px]"
    >
      <path
        d="M21 12L16 7M21 12L16 17M21 12H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function Face() {
  const { t } = useTranslation();

  const { isLight } = useCurrentTheme();

  const list = [
    {
      title: t("about:faceListTitle01"),
      desc: t("about:faceListDesc01"),
      link: EXTERNAL_LINKS.docs + "bvi/identity/individual",
    },
    {
      title: t("about:faceListTitle02"),
      desc: t("about:faceListDesc02"),
      link: EXTERNAL_LINKS.docs + "bvi/identity/organize",
    },
  ];

  const handleLinkProjectClick = () => {
    window.open(EXTERNAL_LINKS.docs + "bvi/identity/project", "_blank");
  };

  const handleLinkCardClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="mt-[40px] md:mt-[200px] flex flex-col-reverse md:flex-row md:gap-[40px] gap-[24px]">
      <div className="flex flex-col flex-1 gap-[16px] md:gap-[24px] pb-[6px]">
        <div className="flex flex-col md:flex-row md:gap-[24px] gap-[16px]">
          {list.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col justify-between gap-[24px] bg-[var(--b2)] rounded-[24px] p-[24px]"
            >
              <div className="flex flex-row md:flex-col md:gap-[0] gap-[24px]">
                <img
                  className="block w-[54px] h-[54px]"
                  src={isLight ? bannerCardIconLight : bannerCardIconDark}
                  alt={item.title}
                />
                <div className="flex flex-col gap-[8px] md:mt-[20px] mt-[0]">
                  <h3 className="md:text-[24px] text-[20px] font-bold text-[var(--t1)]">
                    {item.title}
                  </h3>
                  <p className="text-[16px] font-normal text-[var(--t2)] mt-[8px] md:mt-[0]">
                    {item.desc}
                  </p>
                  <div
                    className="block md:hidden w-fit"
                    onClick={() => handleLinkCardClick(item.link)}
                  >
                    <LinkArrow />
                  </div>
                </div>
              </div>
              <div
                className="hidden md:block w-fit"
                onClick={() => handleLinkCardClick(item.link)}
              >
                <LinkArrow />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col justify-between gap-[24px] bg-[var(--b2)] rounded-[24px] p-[24px]">
          <div className="flex flex-row md:flex-col md:gap-[0] gap-[24px]">
            <img
              className="block w-[54px] h-[54px]"
              src={isLight ? bannerCardIconLight : bannerCardIconDark}
              alt={t("about:faceListTitle03")}
            />
            <div className="flex flex-col gap-[8px] md:mt-[20px] mt-[0]">
              <h3 className="md:text-[24px] text-[20px] font-bold text-[var(--t1)]">
                {t("about:faceListTitle03")}
              </h3>
              <p className="text-[16px] font-normal text-[var(--t2)] mt-[8px] md:mt-[0]">
                {t("about:faceListDesc03")}
              </p>
              <div
                className="block md:hidden w-fit"
                onClick={handleLinkProjectClick}
              >
                <LinkArrow />
              </div>
            </div>
          </div>
          <div
            className="hidden md:block w-fit"
            onClick={handleLinkProjectClick}
          >
            <LinkArrow />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-[16px] font-normal text-[var(--t2)]">
          {t("about:faceSubTitle")}
        </p>
        <h2 className="mt-[12px] md:text-[48px] text-[24px] font-bold text-[var(--t1)]">
          {t("about:faceTitle")}
        </h2>
        <p className="mt-[20px] md:mt-[28px] text-[16px] font-normal text-[var(--t1)]">
          {t("about:faceDesc")}
        </p>
        <div className="w-full md:h-[363px] h-[232px] rounded-[8px] bg-[var(--b3)] mt-[25px]"></div>
      </div>
    </div>
  );
}
