import { useState } from "react";
import { useTranslation } from "react-i18next";

import { fetchStatsByNet } from "@/api/common";
import NumberCounter from "@/components/comm/animation/NumberCounter";
import { SeeMore } from "@/components/comm/link/SeeMore";
import Price from "@/components/comm/Price";
import { AnimatedTitle } from "@/components/comm/title/AnimatedTitle";
import { EXTERNAL_LINKS } from "@/constants/external";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { Stats } from "@/types/response";

export const XoneChain = () => {
    const { t } = useTranslation("home");
    const [value, setValue] = useState<number>(10)
    const [statsData, setStatsData] = useState<Stats | null>(null)
    const getMainNetData = async () => {
        const data = await fetchStatsByNet();
        if (data) {
            setStatsData(data)
        }
    };

    const { time } = useCountdownTimer({
        callback: async () => {
            await getMainNetData();
        },
        dependency: [],
    });
    return (
        <div className="flex w-full md:pb-[12px] max-md:flex-col justify-between mt-10 md:mt-[162px]">
            <div className="shrink-0 text-t1 max-md:flex max-md:items-center max-md:justify-between">
                {/* <div className="text-[24px] md:text-[48px] leading-[140%] font-bold">
                    {t("xoneMainNet")}
                </div> */}
                <AnimatedTitle  text={t("xoneMainNet")}></AnimatedTitle>
                <div className="text-[14px] md:text-[20px] leading-[140%] md:mt-6">
                    {t("update")} : {time}s
                </div>
            </div>
            <div className="shrink-0 max-md:mt-3 w-full md:w-[57%]">
                <div className="grid grid-cols-2 gap-[16px] md:gap-[24px]">
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:h-[100px] md:text-[64px] mb-[6px] md:mb-2 leading-[140%] md:leading-[140%] font-bold">
                            <NumberCounter value={statsData?.mainnet?.total_addresses || 0}></NumberCounter>
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[140%]">
                            {t("addressAdd")}
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:h-[100px] md:text-[64px] mb-[6px] md:mb-2 leading-[140%] md:leading-[140%] font-bold">
                            <NumberCounter value={statsData?.mainnet?.total_nfts || 0}></NumberCounter>
                        </div>
                        <div onClick={() => {
                            setValue(value + 10)
                        }} className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[140%]">
                            {t("artworkIsCast")}
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:h-[100px] md:text-[64px] mb-[6px] md:mb-2 leading-[140%] md:leading-[140%] font-bold">
                            <NumberCounter value={statsData?.mainnet?.total_tokens || 0}></NumberCounter>
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[140%]">
                            {t("tokenMinting")}
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:h-[100px] flex items-center md:text-[64px] mb-[6px] md:mb-2 leading-[140%] md:leading-[140%] font-bold">
                            <Price show$ price={statsData?.mainnet?.average_txn_fee24h || 0} className1={""}></Price>
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[140%]">
                            {t("averageTransactionCost")}
                        </div>
                    </div>
                </div>
                <SeeMore className="mt-3 md:mt-6 md:pl-6" href={`${EXTERNAL_LINKS.MainExplorer}stats`} text={t('seeMore')}></SeeMore>
            </div>
        </div>
    );
};
