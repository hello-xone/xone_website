import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

import { Banner } from "./Banner";
import { Ecosystem } from "./Ecosystem";
import { Governance } from "./Governance";
import Introducing from "./Introducing";
import MarketChart from "./MarketChart";
import { OnChainIdentity } from "./OnChainIdentity";
import { Community } from "./sections/Community";
import { ExploreNature } from "./sections/ExploreNature";
import HelloXone from "./sections/HelloXone/index";
// import { Explore } from "./sections/Explore";
import { Start } from "./sections/Start";
import { XoneChain } from "./XoneChain";

const HomePage = () => {
      const { md } = useTailwindBreakpoint();

      return (
            <div className="container">
                  <Banner></Banner>
                  <XoneChain></XoneChain>
                  <Introducing></Introducing>
                  <MarketChart></MarketChart>
                  <Governance></Governance>
                  <OnChainIdentity></OnChainIdentity>
                  {!md && <Ecosystem></Ecosystem>}
                  <HelloXone />
                  <Community></Community>
                  {/* <Governance></Governance> */}
                  {/* <Explore></Explore> */}
                  {!md && <ExploreNature></ExploreNature>}
                  <Start></Start>
            </div>
      );
};

export default HomePage;
