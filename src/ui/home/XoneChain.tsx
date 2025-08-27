import { useState } from "react";
import { useTranslation } from "react-i18next";

import { fetchNetCountersByNet, fetchNftTotal, fetchStatsByNet } from "@/api/common";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import BigNumber from "bignumber.js";
import { EXTERNAL_LINKS } from "@/constants/external";

interface Data {
    totalAddress?: string;
    totalArtwork?: string;
    totalToken?: string;
    averageTransactionCost?: string;
}

export const XoneChain = () => {
    const { t } = useTranslation("home");
    const [datas, setDatas] = useState<Data>();

    const getTotalAddress = async () => {
        try {
            const res = await fetchStatsByNet();
            return res?.total_addresses;
        } catch (err) {
            console.error(err);
        }
    };

    const getTotalNFT = async () => {
        try {
            const res = await fetchNftTotal();
            return res?.total;
        } catch (err) {
            console.error(err);
        }
    };

    const getMainNetData = async () => {
        const data: Data = {
            totalAddress: undefined,
            totalArtwork: undefined,
            totalToken: undefined,
            averageTransactionCost: undefined,
        };
        data.totalAddress = await getTotalAddress();
        data.totalArtwork = await getTotalNFT();
        const counter = await fetchNetCountersByNet();
        data.totalToken = counter.find((item) => item.id === "totalTokens")?.value;
        data.averageTransactionCost = counter.find(
            (item) => item.id === "averageTxnFee24h"
        )?.value;
        setDatas(data);
    };

    const { time } = useCountdownTimer({
        callback: async () => {
            await getMainNetData();
        },
        dependency: [],
    });

    const plusSymbol = (str: string) => {
        return /[K|M|B]+/gi.test(str) ? "+" : "";
    };
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
                            {datas?.totalAddress || '--'}
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            {t("addressAdd")}
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            {datas?.totalArtwork || '--'}
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            {t("artworkIsCast")}
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            {datas?.totalToken || '--'}
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            {t("tokenMinting")}
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            ≈${new BigNumber(datas?.averageTransactionCost || 0).toFixed(6, 1)}
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
