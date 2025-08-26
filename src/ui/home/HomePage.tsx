import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

import { Banner } from "./sections/Banner/index";
import { Community } from "./sections/Community";
import { ExploreNature } from "./sections/ExploreNature";
import { Governance } from "./sections/Governance";
import HelloXone from "./sections/HelloXone/index";
// import { Explore } from "./sections/Explore";
import { Start } from "./sections/Start";
import { XoneChain } from "./sections/XoneChain/index";

type Props = {};

const HomePage = (props: Props) => {
  const { md } = useTailwindBreakpoint();

  return (
    <div className="relative">
      <Banner />
      <XoneChain></XoneChain>
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
