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
      <BeBorn />
      <div className="container">
        <Significance />
        <Face />
        <Govern />
        <JoinUs />
      </div>
    </>
  );
};
