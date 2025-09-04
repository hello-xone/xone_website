import BigNumber from "bignumber.js";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { fetchChart } from "@/api/common";
import MarketSource2 from "@/assets/imgs/home/market-source-2.png";
import MarketSource1 from "@/assets/imgs/home/market-source1.png";
import NumberCounter from "@/components/comm/animation/NumberCounter";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";
import useApplicationStore from "@/store/applicationStore";
import { ChartRes } from "@/types/response";
import { formatNumber } from "@/utils/number";

const DATA_ZOOM_MIN_VALUE_SPAN = 3600 * 1000;
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
    const { md } = useTailwindBreakpoint();
    const { t } = useTranslation("home");
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
    const [chartData, setChartData] = useState<ChartRes | null>(null);
    const { isLight } = useApplicationStore();
    const getMainNetData = async () => {
        const data = await fetchChart();
        if (data) {
            setChartData(data);
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
            return chartData.prices
                .map((el) => ({
                    ...el,
                    date: dayjs(el.date * 1000).format("YYYY-MM-DD"),
                    xLabel: dayjs(el.date * 1000).format("MM-DD"),
                }))
                .reverse();
        }
        return [];
    }, [chartData]);

    const chartRef = useRef(null);
    useEffect(() => {
        let myChart: any;
        if (data && chartRef && chartRef.current) {
            const chartDom = chartRef.current;
            myChart = echarts.init(chartDom);
            setChartInstance(myChart)
            const option = {
                tooltip: {
                    show: true,
                    trigger: "axis",
                    borderWidth: 0,
                    formatter: function (params: any) {
                        const _value = params[0].value;
                        return `
                          <div style="padding: 8px;text-align: left;font-size: 12px;line-height: 16px;box-shadow: 0px 10px 32px 0px rgba(31, 31, 31, 0.15);">
                            <div style="display: flex;align-items: center;font-weight: 500;gap: 32px;justify-content: space-between;">
                                <span style="color: var(--link1)">
                                    ${t("price")}: $
                                    ${new BigNumber(_value[1]).toFixed(4, 1)}
                                </span>
                                <span style="color: var(--t2)">${dayjs(_value[0]).format("YYYY-MM-DD")}</span>
                            </div>
                            <div style=" margin-top: 4px;color: var(--t3);line-height: 140%;">
                                ${t("avgPrice")}:&nbsp;
                                ${new BigNumber(_value[1]).toFixed(4, 1)}
                            </div>
                            <div style=" margin-top: 4px;color: var(--t3);line-height: 140%;">
                                ${t("transactionCount1")}:&nbsp;
                                ${formatNumber(_value[2])}
                            </div>
                        </div>
                        `;
                    },
                    useHTML: true,
                    padding: 0,
                    border: 'none',
                    position: ["50%", "50%"],
                },
                grid: {
                    left: 0,
                    right: 20,
                    top: 20,
                    bottom: 40,
                    containLabel: true,
                    outerBounds: {
                        top: "20%",
                        bottom: "30%",
                    },
                },
                xAxis: [
                    {
                        type: "time",
                        interval: 1000 * 60 * 30,
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            showMinLabel: true,
                            showMaxLabel: true,
                            color: isLight ? "#C4C7CA" : "#C3C3C7",
                            formatter(timestamp: any, _: any, opt: any) {
                                if (opt.break) {
                                    return dayjs(timestamp).format("YYYY-MM-DD");
                                }
                                return dayjs(timestamp).format("MM-DD");
                            },
                            rich: {
                                weak: {
                                    color: "red",
                                },
                            },
                        },
                        breakArea: {
                            expandOnClick: false,
                            zigzagAmplitude: 0,
                            zigzagZ: 200,
                            itemStyle: {
                                borderColor: "none",
                                opacity: 0,
                            },
                        },
                    },
                ],
                yAxis: {
                    type: "value",
                    min: "dataMin",
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: isLight ? "#EAEAED" : "#373737",
                            width: 1,
                            type: "solid",
                        },
                    },
                    axisLabel: {
                        show: md,
                        color: isLight ? "#C4C7CA" : "#C3C3C7",
                    },
                },
                dataZoom: [
                    {
                        type: "inside",
                        minValueSpan: DATA_ZOOM_MIN_VALUE_SPAN,
                    },
                    {
                        type: "slider",
                        handleStyle: {
                            color: "rgba(255, 4, 32, 1)",
                            borderColor: "rgba(255, 4, 32, 0.8)",
                            borderWidth: 1,
                        },
                        backgroundColor: "rgba(255, 4, 32, 0.5)",
                        bottom: "0%",
                        minValueSpan: DATA_ZOOM_MIN_VALUE_SPAN,
                    },
                ],
                series: [
                    {
                        type: "line",
                        symbolSize: 0,
                        areaStyle: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: isLight ? "#FF8082" : "#7d0513" },
                            { offset: 1, color: isLight ? "#FF8082" : "#3E0F14" },
                        ]),
                        lineStyle: {
                            color: isLight ? "#FF0420" : "#FF0420", // 线的颜色
                        },
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: isLight
                                        ? "rgba(255, 128, 130, 1)"
                                        : "rgb(125, 5, 19, 1)",
                                },
                                {
                                    offset: 1,
                                    color: isLight
                                        ? "rgba(255, 128, 130, 0)"
                                        : "rgb(62, 15, 20, 0)",
                                },
                            ]),
                        },
                        data: data.map((el) => {
                            return [
                                new Date(el.date).getTime(),
                                new BigNumber(el.avg_price).toFixed(4, 1),
                                el.tx_count,
                            ];
                        }),
                    },
                ],
            };
            myChart.setOption(option);
            window.addEventListener("resize", myChart.resize);
        }
        return () => myChart.dispose();
    }, [isLight, md, t]);

    useEffect(() => {
        if (chartInstance) {
            // 只更新数据部分，ECharts 会自动增量渲染
            chartInstance.setOption({
                series: [{
                    data: data.map((el) => {
                        return [
                            new Date(el.date).getTime(),
                            new BigNumber(el.avg_price).toFixed(4, 1),
                            el.tx_count,
                        ];
                    })
                }]
            });
        }
    }, [chartInstance, data]);

    return (
        <div className="py-[40px] md:py-[80px] text-center">
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
                <div
                    id="main"
                    className="max-md:h-[500px]"
                    ref={chartRef}
                    style={{
                        width: "100%",
                        height: md ? "100%" : "364px",
                    }}
                ></div>
                {/* <ResponsiveContainer
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
            </ResponsiveContainer> */}
                <div className="w-full md:w-[262px] shrink-0 py-[36px] md:py-[24px] text-center bg-[--layer2] rounded-[16px]">
                    <div className="text-t1 leading-[21px] mb-2">
                        {t("totalMarketCap")}
                    </div>
                    <div className="text-t1 font-bold text-[32px] leading-[42px] mb-12">
                        <NumberCounter value={chartData?.market_cap || 0}></NumberCounter>
                    </div>
                    <div className="text-t1 leading-[21px] mb-2">
                        {t("accountsHoldingCOX")}
                    </div>
                    <div className="text-t1 font-bold text-[32px] leading-[42px]">
                        <NumberCounter
                            value={chartData?.total_accounts || 0}
                        ></NumberCounter>
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
                            <div className="text-[32px] font-bold leading-[42px]">
                                <NumberCounter
                                    decimalPlaces={el.title === "currentPrice" ? 4 : 0}
                                    value={
                                        el.title === "currentPrice"
                                            ? chartData?.current_price || 0
                                            : el.title === "transactionCount"
                                                ? chartData?.transactions_today || 0
                                                : chartData?.transaction_amounts_today || 0
                                    }
                                ></NumberCounter>
                            </div>
                            <div className="text-[16px] mt-2 font-normal leading-[21px]">
                                {t(el.title)}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};