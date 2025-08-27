import { useTranslation } from "react-i18next"

import BgIcon from "@/assets/imgs/home/bg-3.png"
import GovernanceIcon from "@/assets/imgs/home/Governance-left.png"
import GovernanceLightIcon from "@/assets/imgs/home/Governance-left-light.png"
import { SeeMore } from "@/components/comm/link/SeeMore"
import useApplicationStore from "@/store/applicationStore"

export const Governance = () => {
    const { t } = useTranslation("home");

    const { isLight } = useApplicationStore()
    return <div className="flex pt-[40px] max-md:flex-col-reverse md:pt-[80px] gap-[40px] pb-[40px] md:pb-[160px] items-center w-full justify-between">
        <img alt="" src={BgIcon} className="max-md:hidden absolute left-0"></img>
        <img alt="" src={isLight ? GovernanceLightIcon : GovernanceIcon} className="shrink-0 w-full md:w-[48.6%] h-auto"></img>
        <div className="flex-1">
            <div className="text-[24px] md:text-[48px] leading-[140%] md:leading-[120%] mb-4 md:mb-6 font-bold">{t("governanceTitle")}</div>
            <div className="text-t2 leading-[140%] text-base md:text-[20px] mb-6 md:mb-8">{t("governanceDesc")}</div>
            <SeeMore className="max-md:hidden" text={t("getStarted")} href=""></SeeMore>
        </div>
    </div>
}