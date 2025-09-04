import BigNumber from 'bignumber.js';
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { fetchChart } from '@/api/common';
import MarketSource2 from "@/assets/imgs/home/market-source-2.png";
import MarketSource1 from "@/assets/imgs/home/market-source1.png";
import NumberCounter from '@/components/comm/animation/NumberCounter';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { useScrollreveal } from '@/hooks/useScrollreveal';
import useApplicationStore from '@/store/applicationStore';
import { ChartRes } from "@/types/response";
import { formatNumber } from '@/utils/number';

const BottomMenu = [
    {
        title: "currentPrice",
    },
    {
        title: "transactionValue",
    },
    {
        title: "transactionCount",
    },
];

export const MarketChart = () => {
    const { t } = useTranslation("home");
    const [chartData, setChartData] = useState<ChartRes | null>(null)
    useScrollreveal();
    const { isLight } = useApplicationStore()
    const getMainNetData = async () => {
        const data = await fetchChart();
        if (data) {
            setChartData(data)
        }
    };

    useCountdownTimer({
        callback: async () => {
            await getMainNetData();
        },
        dependency: [],
    });

    const data = useMemo(() => {
        if (chartData && chartData.prices.length > 0) {
            return chartData.prices.map((el) => ({
                ...el,
                date: dayjs(el.date * 1000).format("YYYY-MM-DD"),
                xLabel: dayjs(el.date * 1000).format("MM-DD"),
            })).reverse();
        }
        return [];
    }, [chartData]);
    const CustomTooltip = ({ active, payload }: any) => {
        const isVisible = active && payload && payload.length;
        return (
            <>
                {isVisible ? (
                    <div className="p-2 text-left text-xs shadow-[0px_10px_32px_0px_#1F1F1F26] rounded bg-b1">
                        <div className="flex items-center font-medium gap-[32px] justify-between">
                            <span className="text-[--link1]">
                                {t("price")}: ${new BigNumber(payload[0].payload.avg_price).toFixed(4, 1)}
                            </span>
                            <span className="text-t2">{payload[0].payload.date}</span>
                        </div>
                        <div className="mt-1 text-t3 leading-[140%]">
                            {t("avgPrice")}: {new BigNumber(payload[0].payload.avg_price).toFixed(4, 1)}
                        </div>
                        <div className="mt-1 text-t3 leading-[140%]">
                            {t("transactionCount1")}: {formatNumber(payload[0].payload.tx_count)}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </>
        );
    };
    return <div className="py-[40px] md:py-[80px] text-center">
        <div className="w-screen absolute left-0 mt-[-40px] md:mt-[-80px] h-[1px] bg-[--border5]"></div>
        <div className="text-[24px] md:text-[48px] max-md:text-left font-bold leading-[120%] mb-4 md:mb-6">
            {t("marketTitle")}
        </div>
        <div className="text-base md:text-[20px] max-md:text-left font-medium text-t2 mb-6 md:mb-10 leading-[140%]">
            {t("marketDesc")}
        </div>
        <div className="flex items-center mb-2 text-t3 font-medium text-[20px]">
            {t("source")}:
            <div className="flex items-center gap-[6px] ml-[14px]">
                <img
                    alt=""
                    onClick={() =>
                        window.open("https://www.kexb.com/spot/XOCUSDT?ts=1755508711507")
                    }
                    src={MarketSource1}
                    className="w-[26px] cursor-pointer"
                ></img>
                <img
                    alt=""
                    onClick={() =>
                        window.open(
                            "https://swapx.exchange/en/pool/v2?id=0x865ec1f3c313e2f050933fb264950fac535839f8"
                        )
                    }
                    src={MarketSource2}
                    className="w-[26px] cursor-pointer"
                ></img>
            </div>
        </div>
        <div
            className="w-full flex max-md:flex-col items-center justify-between gap-[24px] md:h-[364px]"
            style={{ width: "100%" }}
        >
            <ResponsiveContainer
                className={"max-md:h-[364px] max-md:min-h-[364px]"}
            >
                <AreaChart
                    data={data}
                    syncId="anyId"
                    height={364}
                    margin={{
                        top: 10,
                        right: 0,
                        left: -16,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        vertical={false}
                        strokeDasharray="0"
                        stroke={isLight ? "#EAEAED" : "#373737"}
                    />
                    <XAxis
                        dataKey="xLabel"
                        tickLine={false}
                        stroke={isLight ? "#C4C7CA" : "#C3C3C7"}
                        className="text-sm"
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        stroke={isLight ? "#C4C7CA" : "#C3C3C7"}
                        className="text-sm"
                    />
                    <Tooltip content={CustomTooltip} />
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="0%"
                                stopColor={isLight ? "#FF8082" : "#7d0513"}
                                stopOpacity={1}
                            />
                            <stop
                                offset="97%"
                                stopColor={isLight ? "#FF8082" : "#3E0F14"}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="avg_price"
                        stroke={isLight ? "#FF0420" : "#FF0420"}
                        fill="url(#colorSales)"
                    />
                </AreaChart>
            </ResponsiveContainer>
            <div className="w-full md:w-[262px] shrink-0 py-[36px] md:py-[24px] text-center bg-[--layer2] rounded-[16px]">
                <div className="text-t1 leading-[100%] mb-2">
                    {t("totalMarketCap")}
                </div>
                <div className="text-t1 font-bold text-[32px] leading-[100%] mb-12">
                    <NumberCounter value={chartData?.market_cap || 0}></NumberCounter>
                </div>
                <div className="text-t1 leading-[100%] mb-2">
                    {t("accountsHoldingCOX")}
                </div>
                <div className="text-t1 font-bold text-[32px] leading-[100%]">
                    <NumberCounter value={chartData?.total_accounts || 0}></NumberCounter>

                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-4 md:mt-10 gap-[16px] md:gap-[24px]">
            {BottomMenu &&
                BottomMenu.map((el) => (
                    <div
                        key={`market-chart-bottom-${el.title}`}
                        className="w-full py-[12px] rounded-[8px] text-center bg-[--layer2]"
                    >
                        <div className="text-[32px] font-bold leading-[100%]">
                            <NumberCounter value={el.title === "currentPrice" ? (chartData?.current_price || 0) : el.title === "transactionCount" ? (chartData?.transactions_today || 0) : (chartData?.transaction_amounts_today || 0)}></NumberCounter>
                        </div>
                        <div className="text-[16px] mt-2 font-normal leading-[100%]">
                            {t(el.title)}
                        </div>
                    </div>
                ))}
        </div>
    </div>;
};
