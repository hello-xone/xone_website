import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

import BgIcon from "@/assets/imgs/home/bg-1.png";
import BannerJson from "@/assets/lottie/banner.json";
import BannerDarkJson from "@/assets/lottie/banner-dark.json";
import CommonButton from "@/components/comm/button/CommonButton";
import AnimatedTitles from "@/components/comm/title/AnimatedTitles";
import { EXTERNAL_LINKS } from "@/constants/external";
import useApplicationStore from "@/store/applicationStore";

export const Banner = () => {
  const { t } = useTranslation("home");
  const { isLight } = useApplicationStore()
  return (
    <div className="relative">
      <img
        alt=""
        src={BgIcon}
        className="max-md:hidden absolute scale-90 left-0 ml-[-5%]"
      ></img>
      <div className="container overflow-x-hidden">
        <div className="flex items-center max-md:flex-col-reverse w-full max-md:gap-[20px] justify-between">
          <div className="w-full md:w-[57.25%] shrink-0 text-t1">
            <AnimatedTitles
              activeEffect="float"
              className="!text-[32px] !mb-0 md:!text-[64px] !text-left leading-[140%] relative z-[2] font-bold"
              text={t("bannerTitle1")}
            ></AnimatedTitles>
            {t("bannerTitle2") && (
              <AnimatedTitles
                activeEffect="float"
                className="!text-[32px] md:!text-[64px] !text-left leading-[140%] relative z-[2] font-bold"
                text={t("bannerTitle2")}
              ></AnimatedTitles>
            )}
            <div className="text-base md:text-[20px] relative z-[2] text-t2 md:text-t1 leading-[140%] mt-4 md:mt-6">
              {t("bannerDescription")}
            </div>
            <div className="grid max-md:grid-cols-1 relative z-[2] md:flex items-center md:gap-[32px] mt-6 md:mt-10">
              <CommonButton
                onClick={() => window.open(`https://swapx.exchange/en`)}
                className="text-base z-[1] md:text-[18px] max-md:h-12 h-[56px] md:px-[20px] max-md:w-full !rounded-[12px]"
              >
                <>
                  <span className="capitalize">
                    {t("deposit")} / {t("withdrawal")}
                  </span>
                </>
              </CommonButton>
              <CommonButton
                type="black"
                onClick={() =>
                  window.open(`${EXTERNAL_LINKS.docs}developers/ready`)
                }
                className=" text-base md:text-[18px] max-md:h-12 h-[56px] md:px-[20px] max-md:w-full max-md:mt-4 !rounded-[12px]"
              >
                {t("startBuilding")}
              </CommonButton>
            </div>
          </div>
          <div className="w-full md:w-[41.5%] shrink-0">
            <Lottie className="w-full h-auto object-contain" animationData={isLight ? BannerJson : BannerDarkJson} loop={true} ></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};
