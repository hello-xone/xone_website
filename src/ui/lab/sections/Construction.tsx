import { useTranslation } from "react-i18next";

import constructionDark01 from "@/assets/imgs/lab/dark/construction01.png";
import constructionDark02 from "@/assets/imgs/lab/dark/construction02.png";
import constructionDark03 from "@/assets/imgs/lab/dark/construction03.png";
import constructionLight01 from "@/assets/imgs/lab/light/construction01.png";
import constructionLight02 from "@/assets/imgs/lab/light/construction02.png";
import constructionLight03 from "@/assets/imgs/lab/light/construction03.png";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

export default function Construction() {
  const { t } = useTranslation();
  const { isLight } = useCurrentTheme();

  const listLink = [
    {
      title: t("lab:constructionLink01"),
      link: "https://xone.org",
      img: isLight ? constructionLight01 : constructionDark01,
    },
    {
      title: t("lab:constructionLink03"),
      link: "https://xone.org",
      img: isLight ? constructionLight03 : constructionDark03,
    },
    {
      title: t("lab:constructionLink02"),
      link: "https://xone.org",
      img: isLight ? constructionLight02 : constructionDark02,
    },
  ];

  return (
    <div className="flex gap-[24px] flex-wrap mt-[90px] md:mt-[160px]">
      <div className="md:w-[48%] w-full">
        <h2
          className="hidden md:block color-t1 font-bold text-[48px] leading-[66px]"
          dangerouslySetInnerHTML={{ __html: t("lab:constructionTitle") }}
        />
        <h2 className="md:hidden color-t1 font-bold text-[24px]">
          {t("lab:constructionTitle").replace(/<br\s*\/?>/gi, " ")}
        </h2>
      </div>
      {listLink.map((item, index) => (
        <div
          className="md:w-[48%] w-full bg-[var(--b2)] rounded-[16px] p-[24px]"
          key={index}
        >
          <img
            className="block w-[54px] h-[54px]"
            src={item.img}
            alt={item.title}
          />
          <h3 className="text-t1 font-bold text-[20px] md:text-[24px] mt-[6px] mb-[16px]">
            {item.title}
          </h3>
          <div className="w-fit">
            <SeeMore
              className="lab-see-more"
              href={item.link}
              text={t("lab:viewDetails")}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
