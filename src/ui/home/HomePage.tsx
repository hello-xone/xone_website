import { useState } from "react";

import { fetchChart, fetchNetCountersByNet } from "@/api/common";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";
import { ChartRes } from "@/types/response";

import { Banner } from "./Banner";
import { Ecosystem } from "./Ecosystem";
import { Governance } from "./Governance";
import Introducing from "./Introducing";
import MarketChart from "./MarketChart";
import { OnChainIdentity } from "./OnChainIdentity";
import { Community } from "./sections/Community";
import HelloXone from "./sections/HelloXone/index";
// import { Explore } from "./sections/Explore";
import { Start } from "./sections/Start";
import { XoneChain } from "./XoneChain";

const HomePage = () => {
      const { md } = useTailwindBreakpoint();
      const [chartData, setChartData] = useState<ChartRes | null>(null)
      const getMainNetData = async () => {
            const data = await fetchChart();
            if (data) {
                  setChartData(data)
            }
      };

      const { time } = useCountdownTimer({
            callback: async () => {
                  await getMainNetData();
            },
            dependency: [],
      });

      return (
            <div className="container overflow-x-hidden">
                  <Banner></Banner>
                  <XoneChain time={time} chartData={chartData}></XoneChain>
                  <Introducing></Introducing>
                  <MarketChart chartData={chartData}></MarketChart>
                  <Governance></Governance>
                  <OnChainIdentity></OnChainIdentity>
                  {md && <Ecosystem></Ecosystem>}
                  <HelloXone />
                  <Community></Community>
                  {/* <Governance></Governance> */}
                  {/* <Explore></Explore> */}
                  {!md && <Ecosystem></Ecosystem>}
                  <Start></Start>
            </div>
      );
};

export default HomePage;
