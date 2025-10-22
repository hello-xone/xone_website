import "./index.less";

import { MotionScrollReveal } from "@/components/comm/animation/ScrollReveal";

import Banner from "./sections/Banner";
import CaseStudy from "./sections/CaseStudy";
import Construction from "./sections/Construction";
import Describe from "./sections/Describe";
import GetTouch from "./sections/GetTouch";
import InHarness from "./sections/InHarness";
import RecentProject from "./sections/RecentProject";

export const Lab = () => {
  return (
    <>
      <Banner />
      <div className="container">
        <RecentProject />
        <MotionScrollReveal animation="slide" delay={0}>
          <Describe />
        </MotionScrollReveal>
        <MotionScrollReveal animation="slide" delay={0.1}>
          <Construction />
        </MotionScrollReveal>
        <MotionScrollReveal animation="fade" delay={0.2}>
          <CaseStudy />
        </MotionScrollReveal>
        <MotionScrollReveal animation="slide" delay={0.3}>
          <InHarness />
        </MotionScrollReveal>
        <MotionScrollReveal animation="fade" delay={0.4}>
          <GetTouch />
        </MotionScrollReveal>
      </div>
    </>
  );
};
