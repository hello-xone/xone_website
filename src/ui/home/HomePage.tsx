import HelloXone from "./sections/HelloXone/index";
import { XoneChain } from "./sections/XoneChain/index";
import { ExploreNature } from "./sections/ExploreNature";
import { Governance } from "./sections/Governance";
// import { Explore } from "./sections/Explore";
import { Start } from "./sections/Start";
import { Banner } from "./sections/Banner/index";
import { Community } from "./sections/Community";

type Props = {};

const HomePage = (props: Props) => {
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
    </div>
  );
};

export default HomePage;
