import { MotionScrollReveal } from "@/components/comm/animation/ScrollReveal";

import { Advantage } from "./sections/Advantage";
import { Banner } from "./sections/Banner";
import { Building } from "./sections/Building/index";
import { Business } from "./sections/Business";
import { Engineering } from "./sections/Engineering";
import { Funding } from "./sections/Funding";
import { Net } from "./sections/Net/index";

export const DeveloperCenter = () => {
  return (
    <>
      <MotionScrollReveal delay={0}>
        <Banner></Banner>
      </MotionScrollReveal>
      <div className="container">
        <MotionScrollReveal delay={0}>
          <Net></Net>
        </MotionScrollReveal>
        <MotionScrollReveal delay={0.2}>
          <Building></Building>
        </MotionScrollReveal>
        <MotionScrollReveal delay={0.2}>
          <Funding></Funding>
        </MotionScrollReveal>
        <MotionScrollReveal delay={0.3}>
          <Advantage></Advantage>
        </MotionScrollReveal>
        <MotionScrollReveal delay={0.2} animation="slide">
          <Business></Business>
        </MotionScrollReveal>
        <MotionScrollReveal delay={0.3} animation="slide">
          <Engineering></Engineering>
        </MotionScrollReveal>
      </div>
    </>
  );
};
