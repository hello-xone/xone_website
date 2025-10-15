import "./index.less";

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
        <Describe />
        <Construction />
        <CaseStudy />
        <InHarness />
        <GetTouch />
      </div>
    </>
  );
};
