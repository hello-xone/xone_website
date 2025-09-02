import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";

import { SeeMore } from "@/components/comm/link/SeeMore";
import { EXTERNAL_LINKS } from "@/constants/external";
import { ChartRes } from "@/types/response";
import Price from "@/components/comm/Price";

export const XoneChain = ({ chartData, time }: { chartData: ChartRes | null; time: number }) => {
    const { t } = useTranslation("home");
    return (
        <div className="flex w-full max-md:flex-col justify-between mt-10 md:mt-[162px]">
            <div className="shrink-0 text-t1 max-md:flex max-md:items-center max-md:justify-between">
                <div className="text-[24px] md:text-[48px] leading-[140%] font-bold">
                    {t("xoneMainNet")}
                </div>
                <div className="text-[14px] md:text-[20px] leading-[140%] md:mt-6">
                    {t("update")} : {time}s
                </div>
            </div>
            <div className="shrink-0 max-md:mt-3 w-full md:w-[57%]">
                <div className="grid grid-cols-2 gap-[16px] md:gap-[24px]">
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            {chartData?.total_addresses || '--'}
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            {t("addressAdd")}
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            {chartData?.total_nfts || '--'}
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            {t("artworkIsCast")}
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            {chartData?.total_tokens || '--'}
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            {t("tokenMinting")}
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] flex items-center md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            <Price show$ price={chartData?.average_txn_fee24h || 0} className1={""}></Price>
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            {t("averageTransactionCost")}
                        </div>
                    </div>
                </div>
                <SeeMore className="mt-3 md:mt-6 md:pl-6" href={`${EXTERNAL_LINKS.MainExplorer}stats`} text={t('seeMore')}></SeeMore>
            </div>
        </div>
    );
};
