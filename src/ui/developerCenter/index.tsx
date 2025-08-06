import { Banner } from "./sections/Banner";
import { Net } from "./sections/Net/index";
import { Building } from "./sections/Building/index";
import { Funding } from "./sections/Funding";
import { Advantage } from "./sections/Advantage";
import { Business } from "./sections/Business";
import { Engineering } from "./sections/Engineering";
// import { useScrollreveal } from "@/hooks/useScrollreveal";
// import { useEffect } from "react";

export const DeveloperCenter = () => {
  // useScrollreveal();
  return (
    <div>
      <Banner></Banner>
      {/* <div className="wow animate__fadeIn fadeIn">222222222222222</div>
      <div className="wow  slideInLeft">222222222222222</div>
      <div className="wow">222222222222222</div> */}
      <Net></Net>
      <Building></Building>
      <Funding></Funding>
      {/* <div className="wow animate__animated animate__fadeIn">
        222222222222222
      </div> */}
      <Advantage></Advantage>
      <Business></Business>
      <Engineering></Engineering>
    </div>
  );
};
