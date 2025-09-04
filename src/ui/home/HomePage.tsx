import { MotionScrollReveal } from "@/components/comm/animation/ScrollReveal";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

import { Banner } from "./Banner";
import { Ecosystem } from "./Ecosystem";
import { Governance } from "./Governance";
import Introducing from "./Introducing";
import { MarketChart } from "./MarketChart";
import { OnChainIdentity } from "./OnChainIdentity";
import { Community } from "./sections/Community";
import HelloXone from "./sections/HelloXone/index";
// import { Explore } from "./sections/Explore";
import { Start } from "./sections/Start";
import { XoneChain } from "./XoneChain";

const HomePage = () => {
      const { md } = useTailwindBreakpoint();

      return (
            <div className="container overflow-x-hidden">
                  <MotionScrollReveal delay={0}>
                        <Banner></Banner>
                  </MotionScrollReveal>
                  <MotionScrollReveal>
                        <XoneChain></XoneChain>
                  </MotionScrollReveal>
                  <MotionScrollReveal>
                        <Introducing></Introducing>
                  </MotionScrollReveal>
                  <MotionScrollReveal>
                        <MarketChart></MarketChart>
                  </MotionScrollReveal>
                  <MotionScrollReveal>
                        <Governance></Governance>
                  </MotionScrollReveal>
                  <MotionScrollReveal>
                        <OnChainIdentity></OnChainIdentity>
                  </MotionScrollReveal>
                  {md && <MotionScrollReveal><Ecosystem></Ecosystem></MotionScrollReveal>}
                  <MotionScrollReveal>
                        <HelloXone />
                  </MotionScrollReveal>
                  <MotionScrollReveal>
                        <Community></Community>
                  </MotionScrollReveal>
                  {/* <Governance></Governance> */}
                  {/* <Explore></Explore> */}
                  {!md && <MotionScrollReveal><Ecosystem></Ecosystem> </MotionScrollReveal>}
                  <MotionScrollReveal>
                        <Start></Start>
                  </MotionScrollReveal>
            </div>
      );
};

export default HomePage;
