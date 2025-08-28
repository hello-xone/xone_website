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
      <Banner></Banner>
      <div className="container">
        <Net></Net>
        <Building></Building>
        <Funding></Funding>
        <Advantage></Advantage>
        <Business></Business>
        <Engineering></Engineering>
      </div>
    </>
  );
};
