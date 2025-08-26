import IntroducingIcon1 from "@/assets/imgs/home/introducing-1.png"
import IntroducingIcon2 from "@/assets/imgs/home/introducing-2.png"
import IntroducingIcon3 from "@/assets/imgs/home/introducing-3.png"
import IntroducingIcon4 from "@/assets/imgs/home/introducing-4.png"
import { SeeMore } from "@/components/comm/link/SeeMore"


const IntroducingLeft = [
  {
    icon: IntroducingIcon1,
    title: "Of infinite value",
    desc: "Discover Xone Chain’s native token.",
    link: "https://xonechain.com/"
  },
  {
    icon: IntroducingIcon2,
    title: "Extremely Low GAS",
    desc: "Ultra-low GAS Fee.",
    link: "https://xonechain.com/"
  },
  {
    icon: IntroducingIcon3,
    title: "Extensible modules",
    desc: "Discover Xone Chain’s native token.",
    link: "https://xonechain.com/"
  },
  {
    icon: IntroducingIcon4,
    title: "极低的 Gas",
    desc: "超低的 Gas Fee。",
    link: "https://xonechain.com/"
  }
]
const Introducing = () => {
  return (
    <div className="py-[40px] md:py-[80px] flex max-md:flex-col-reverse justify-between mt-[40px] md:mt-[80px] border-t-[1px] border-b-[1px] border-b4 border-solid">
      <div className="w-full md:w-[61%] shrink-0 grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[54px]">
        {
          IntroducingLeft && IntroducingLeft.map(el => <div key={`introducing-left-${el.title}`} className="w-full">
            <img alt="" src={el.icon} className="w-[40px] h-[40px] md:w-[54px] md:h-[54px]"></img>
            <div className="text-[20px] md:text-[28px] mt-3 mb-1 leading-[140%] font-bold">
              {el.title}
            </div>
            <div className="text-[14px] md:text-[16px] text-t2 leading-[140%] md:leading-[100%]">
              {el.desc}
            </div>
            <SeeMore className="mt-[16px] md:mt-[22px]" href="" text="See more"></SeeMore>
          </div>)
        }
      </div>
      <div className="w-full md:w-[32.7%] shrink-0 max-md:mb-[32px]">
        <div className="font-bold text-[24px] md:text-[48px] leading-[120%] mb-4 md:mb-5">Introducing Xone chain</div>
        <div className="text-t2 leading-[100%]">Discover an ecosystem with a mission — open, adaptable, and committed to advancing the future of blockchain.</div>
      </div>
    </div>
  );
};

export default Introducing;
