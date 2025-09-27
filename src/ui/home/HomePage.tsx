import Announcement from "@/components/Announcement";

import { Banner } from "./sections/Banner/index";
import { Community } from "./sections/Community";
import { ExploreNature } from "./sections/ExploreNature";
import { Governance } from "./sections/Governance";
import HelloXone from "./sections/HelloXone/index";
// import { Explore } from "./sections/Explore";
import { Start } from "./sections/Start";
import { XoneChain } from "./sections/XoneChain/index";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <XoneChain></XoneChain>
      <HelloXone />
      <ExploreNature></ExploreNature>
      <Community></Community>
      <Governance></Governance>
      {/* <Explore></Explore> */}
      <Start></Start>

      {/* 公告弹窗 */}
      <Announcement />
    </div>
  );
};

export default HomePage;
