import { useTranslation } from "react-i18next";

import bannerDark from "@/assets/imgs/lab/dark/banner.png";
import bannerMobileDark from "@/assets/imgs/lab/dark/banner-mobile.png";
import bannerLight from "@/assets/imgs/lab/light/banner.png";
import bannerMobileLight from "@/assets/imgs/lab/light/banner-mobile.png";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

export default function Banner() {
  const { t } = useTranslation();
  const { isLight } = useCurrentTheme();
  return (
    <div className="w-full md:h-[770px] h-[auto]relative">
      {/* 背景层 - 只在 md 及以上显示 */}
      <div
        className="hidden absolute inset-0 md:block"
        style={{
          backgroundImage: `url(${isLight ? bannerLight : bannerDark})`,
          backgroundSize: "100% 800px",
          backgroundPosition: "0px -45px",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* 内容层 */}
      <div className="relative md:pt-[200px] md:h-[auto] h-[380px] pt-[40px] px-[16px] flex flex-col md:items-center items-start md:gap-y-[16px] gap-y-[10px]">
        <h1 className="md:text-[56px] text-[32px] font-bold text-[var(--t1)]">
          {t("lab:bannerTitle")}
        </h1>
        <p className="md:text-[20px] text-[16px] text-[var(--t1)] font-normal">
          {t("lab:bannerDesc")}
        </p>
        <img
          src={isLight ? bannerMobileLight : bannerMobileDark}
          alt=""
          className="block w-full absolute bottom-[0px] left-0 right-0 h-[200px] md:hidden object-cover"
        />
      </div>
    </div>
  );
}
