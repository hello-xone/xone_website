import { useTranslation } from "react-i18next"

import BgIcon from "@/assets/imgs/home/bg-2.png"
import IntroducingIcon1 from "@/assets/imgs/home/introducing-1.png"
import IntroducingIcon2 from "@/assets/imgs/home/introducing-2.png"
import IntroducingIcon3 from "@/assets/imgs/home/introducing-3.png"
import IntroducingIcon4 from "@/assets/imgs/home/introducing-4.png"
import IntroducingDarkIcon1 from "@/assets/imgs/home/introducing-dark-1.png"
import IntroducingDarkIcon2 from "@/assets/imgs/home/introducing-dark-2.png"
import IntroducingDarkIcon3 from "@/assets/imgs/home/introducing-dark-3.png"
import IntroducingDarkIcon4 from "@/assets/imgs/home/introducing-dark-4.png"
import { SeeMore } from "@/components/comm/link/SeeMore"
import { EXTERNAL_LINKS } from "@/constants/external"
import useApplicationStore from "@/store/applicationStore"

const IntroducingLeft = [
  {
    icon: IntroducingIcon1,
    dark: IntroducingDarkIcon1,
    title: "ofInfiniteValue",
    check: "seeMore",
    desc: "ofInfiniteValueDesc",
    link: `${EXTERNAL_LINKS.docs}study/xoc`
  },
  {
    icon: IntroducingIcon2,
    dark: IntroducingDarkIcon2,
    title: "lowGas",
    check: "seeMore",
    desc: "lowGasDesc",
    link: `${EXTERNAL_LINKS.docs}study/gas`
  },
  {
    icon: IntroducingIcon3,
    dark: IntroducingDarkIcon3,
    title: "extensible",
    check: "seeMore",
    desc: "extensibleDesc",
    link: `${EXTERNAL_LINKS.docs}study/modules`
  },
  {
    icon: IntroducingIcon4,
    dark: IntroducingDarkIcon4,
    title: "AheadOfTheTimesPOBVI",
    check: "seeMore",
    desc: "AheadOfTheTimesPOBVIDesc",
    link: `${EXTERNAL_LINKS.docs}bvi/readme`
  }
]
const Introducing = () => {
  const { t } = useTranslation("home");
  const { isLight } = useApplicationStore()

  return (
    <div className="py-[40px] md:py-[80px] mt-[40px] md:mt-[80px] border-b-[1px] border-t-[1px] border-solid border-[--border5]">
      <div className="container">
        <div className="flex max-md:flex-col-reverse justify-between">
          <img alt="" src={BgIcon} className="max-md:hidden absolute right-0 ml-[5px] mt-[-6%]"></img>
          <div className="w-full md:w-[61%] shrink-0 grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[54px]">
            {
              IntroducingLeft && IntroducingLeft.map(el => <div key={`introducing-left-${el.title}`} className="w-full">
                <img alt="" src={isLight ? el.icon : el.dark} className="w-[40px] h-[40px] md:w-[54px] md:h-[54px]"></img>
                <div className="text-[20px] md:text-[28px] mt-3 mb-1 leading-[140%] font-bold">
                  {t(el.title)}
                </div>
                <div className="text-[14px] md:text-[16px] text-t2 leading-[140%] md:leading-[140%] md:h-[44px]">
                  {t(el.desc)}
                </div>
                <SeeMore className="mt-[16px] md:mt-[22px]" textClassName="md:!text-[16px]" href={el.link} text={t(el.check)}></SeeMore>
              </div>)
            }
          </div>

          <div className="w-full md:w-[32.7%] shrink-0 max-md:mb-[32px]">
            <div className="font-bold text-[24px] md:text-[48px] leading-[120%] mb-4 md:mb-5">{t("introducingTitle")}</div>
            <div className="text-t2 leading-[140%]">{t("introducingDesc")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introducing;
