import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import OnChainIdentityJson from "@/assets/lottie/on-chainIdentity.json";
import OnChainIdentityDarkJson from "@/assets/lottie/on-chainIdentity-dark.json";
import AssetAnalysisIcon from "@/assets/svg/home/asset-analysis.svg?react";
import AssetsIcon from "@/assets/svg/home/assets.svg?react";
import IdIcon from "@/assets/svg/home/id.svg?react";
import MultiChainIcon from "@/assets/svg/home/multi-chain.svg?react";
import SdkIcon from "@/assets/svg/home/sdk.svg?react";
import CommonButton from "@/components/comm/button/CommonButton";
import useApplicationStore from "@/store/applicationStore";

const tips = [
  {
    icon: <IdIcon className="text-t1"></IdIcon>,
    title: "did",
  },
  {
    icon: <MultiChainIcon className="text-t1"></MultiChainIcon>,
    title: "multiChainInteraction",
  },
  {
    icon: <AssetsIcon className="text-t1"></AssetsIcon>,
    title: "transactionAnalysis",
  },
  {
    icon: <AssetAnalysisIcon className="text-t1"></AssetAnalysisIcon>,
    title: "assetAnalysis",
  },
  {
    icon: <SdkIcon className="text-t1"></SdkIcon>,
    title: "sdk-api",
  },
];
export const OnChainIdentity = () => {
  const { t, i18n } = useTranslation("home");

  const { isLight } = useApplicationStore();
  return <div className="relative">
    <div className="container overflow-x-hidden">
      <div className="flex py-[40px] max-md:flex-col md:py-[80px] gap-[140px] items-center w-full justify-between">
        <div className="flex-1">
          <div className="text-[24px] md:text-[48px] leading-[140%] mb-4 md:mb-6 font-bold">
            {t("chainIdentityTitle")}
          </div>
          <div className="text-t2 leading-[140%] text-base md:text-[20px] mb-6 md:mb-8">
            {t("chainIdentityDesc1")}
            <Link
              to={"https://ens.domains/"}
              className="text-[--link1]"
              target="_blank"
            >
              {t("ENS")}
            </Link>
            {t("chainIdentityDesc2")}
          </div>
          <Lottie className="shrink-0 mb-6 md:hidden w-full h-auto" animationData={isLight ? OnChainIdentityJson : OnChainIdentityDarkJson} loop={true} ></Lottie>
          {tips &&
            tips.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-[14px] mb-4 md:mb-5"
                >
                  {item.icon}
                  <span className="leading-[140%] font-medium">
                    {t(item.title)}
                  </span>
                </div>
              );
            })}
          <CommonButton
            onClick={() => window.open(`https://xid.world/${i18n.language}`)}
            className="mt-6 md:mt-8 md:min-w-[148px] max-md:!w-full max-md:!h-[40px] max-md:!text-[16px] !rounded-[12px] h-[48px]"
          >
            {t("try")}
          </CommonButton>
        </div>
        <Lottie className="shrink-0 max-md:hidden w-[45%] h-auto" animationData={isLight ? OnChainIdentityJson : OnChainIdentityDarkJson} loop={true} ></Lottie>
      </div>
    </div>
  </div>;
};
