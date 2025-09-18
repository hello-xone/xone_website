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
    <>
      <MotionScrollReveal delay={0} animation="scale">
        <Banner></Banner>
      </MotionScrollReveal>
      <div className="container overflow-hidden">
        <MotionScrollReveal animation="slide">
          <XoneChain></XoneChain>
        </MotionScrollReveal>
      </div>
      <MotionScrollReveal animation="slide">
        <Introducing></Introducing>
      </MotionScrollReveal>
      <div className="container overflow-hidden">
        <MotionScrollReveal animation="slide">
          <MarketChart></MarketChart>
        </MotionScrollReveal>
      </div>
      <MotionScrollReveal animation="slide">
        <Governance></Governance>
      </MotionScrollReveal>
      <MotionScrollReveal animation="slide">
        <OnChainIdentity></OnChainIdentity>
      </MotionScrollReveal>
      <div className="container pb-[12px] overflow-hidden">
        {md && (
          <MotionScrollReveal animation="slide">
            <Ecosystem></Ecosystem>
          </MotionScrollReveal>
        )}
      </div>
      <MotionScrollReveal animation="slide">
        <HelloXone />
      </MotionScrollReveal>
      <MotionScrollReveal animation="slide">
        <Community></Community>
      </MotionScrollReveal>
      <div className="container overflow-x-hidden">
        {/* <Governance></Governance> */}
        {/* <Explore></Explore> */}
        {!md && (
          <MotionScrollReveal animation="slide">
            <Ecosystem></Ecosystem>{" "}
          </MotionScrollReveal>
        )}
        <MotionScrollReveal animation="slide">
          <Start></Start>
        </MotionScrollReveal>
      </div>
    </>
  );
};

export default HomePage;
