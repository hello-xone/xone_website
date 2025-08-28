import { useTranslation } from "react-i18next"

import BgIcon from "@/assets/imgs/home/bg-2.png"
import IntroducingIcon1 from "@/assets/imgs/home/introducing-1.png"
import IntroducingIcon2 from "@/assets/imgs/home/introducing-2.png"
import IntroducingIcon3 from "@/assets/imgs/home/introducing-3.png"
import IntroducingIcon4 from "@/assets/imgs/home/introducing-4.png"
import { SeeMore } from "@/components/comm/link/SeeMore"
import { EXTERNAL_LINKS } from "@/constants/external"


const IntroducingLeft = [
  {
    icon: IntroducingIcon1,
    title: "ofInfiniteValue",
    desc: "ofInfiniteValueDesc",
    link: `${EXTERNAL_LINKS.docs}study/xoc`
  },
  {
    icon: IntroducingIcon2,
    title: "lowGas",
    desc: "lowGasDesc",
    link: `${EXTERNAL_LINKS.docs}study/gas`
  },
  {
    icon: IntroducingIcon3,
    title: "extensible",
    desc: "extensibleDesc",
    link: `${EXTERNAL_LINKS.docs}study/modules`
  },
  {
    icon: IntroducingIcon4,
    title: "AheadOfTheTimesPOBVI",
    desc: "AheadOfTheTimesPOBVIDesc",
    link: `${EXTERNAL_LINKS.docs}bvi/readme`
  }
]
const Introducing = () => {
  const { t } = useTranslation("home");

  return (
    <div className="py-[40px] md:py-[80px] flex max-md:flex-col-reverse justify-between mt-[40px] md:mt-[80px] border-t-[1px] border-b-[1px] border-b4 border-solid">
      <img alt="" src={BgIcon} className="max-md:hidden absolute right-0"></img>
      <div className="w-full md:w-[61%] shrink-0 grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[54px]">
        {
          IntroducingLeft && IntroducingLeft.map(el => <div key={`introducing-left-${el.title}`} className="w-full">
            <img alt="" src={el.icon} className="w-[40px] h-[40px] md:w-[54px] md:h-[54px]"></img>
            <div className="text-[20px] md:text-[28px] mt-3 mb-1 leading-[140%] font-bold">
              {t(el.title)}
            </div>
            <div className="text-[14px] md:text-[16px] text-t2 leading-[140%] md:leading-[100%]">
              {t(el.desc)}
            </div>
            <SeeMore className="mt-[16px] md:mt-[22px]" href="" text="See more"></SeeMore>
          </div>)
        }
      </div>
      <div className="w-full md:w-[32.7%] shrink-0 max-md:mb-[32px]">
        <div className="font-bold text-[24px] md:text-[48px] leading-[120%] mb-4 md:mb-5">{t("introducingTitle")}</div>
        <div className="text-t2 leading-[140%]">{t("introducingDesc")}</div>
      </div>
    </div>
  );
};

export default Introducing;
