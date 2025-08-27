import { useTranslation } from "react-i18next";

import BannerIcon from "@/assets/imgs/home/banner-right.png"
import BgIcon from "@/assets/imgs/home/bg-1.png"
import CommonButton from "@/components/comm/button/CommonButton"
import { EXTERNAL_LINKS } from "@/constants/external";

export const Banner = () => {
    const { t } = useTranslation("home");

    return <div className="flex items-center max-md:flex-col-reverse w-full max-md:gap-[20px] justify-between">
        <img alt="" src={BgIcon} className="max-md:hidden absolute left-0"></img>
        <div className="w-full md:w-[57.25%] shrink-0 text-t1">
            <div className="text-[32px] md:text-[64px] leading-[140%] font-bold">{t("bannerTitle")}</div>
            <div className="text-base md:text-[20px] text-t2 md:text-t1 leading-[140%] mt-4 md:mt-6">{t("bannerDescription")}</div>
            <div className="grid max-md:grid-cols-1 md:flex items-center md:gap-[32px] mt-6 md:mt-10">
                <CommonButton onClick={() => window.open(`https://swapx.exchange/en`)} className="text-base md:text-[18px] rounded-[12px] max-md:h-12 max-md:rounded-[12px] max-md:w-full"><><span className="capitalize">{t('deposit')} / {t('withdrawal')}</span></></CommonButton>
                <CommonButton onClick={() => window.open(`${EXTERNAL_LINKS.docs}developers/ready`)} className="!bg-b5 text-base md:text-[18px] text-t5 max-md:h-12 max-md:rounded-[12px] max-md:w-full max-md:mt-4 rounded-[12px]">{t("startBuilding")}</CommonButton>
            </div>
        </div>
        <div className="w-full md:w-[41.5%] shrink-0">
            <img alt="" src={BannerIcon} className="w-full h-auto object-contain"></img>
        </div>
    </div>
}