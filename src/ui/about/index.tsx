import { MotionScrollReveal } from "@/components/comm/animation/ScrollReveal";

import Banner from "./sections/Banner";
import BeBorn from "./sections/BeBorn";
import Face from "./sections/Face";
import Govern from "./sections/Govern";
import JoinUs from "./sections/JoinUs";
import Significance from "./sections/Significance";

export const About = () => {
  return (
    <>
      <Banner />
      <MotionScrollReveal animation="fade" delay={0}>
        <BeBorn />
      </MotionScrollReveal>
      <div className="container">
        <MotionScrollReveal animation="slide" delay={0.1}>
          <Significance />
        </MotionScrollReveal>
        <MotionScrollReveal animation="slide" delay={0.2}>
          <Face />
        </MotionScrollReveal>
        <MotionScrollReveal animation="fade" delay={0.3}>
          <Govern />
        </MotionScrollReveal>
        <MotionScrollReveal animation="slide" delay={0.4}>
          <JoinUs />
        </MotionScrollReveal>
      </div>
    </>
  );
};
