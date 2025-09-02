import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import SafetyDarkIcon1 from "@/assets/imgs/channel/dark/hint_icon1.png";
import SafetyDarkIcon2 from "@/assets/imgs/channel/dark/hint_icon2.png";
import SafetyDarkIcon3 from "@/assets/imgs/channel/dark/hint_icon3.png";
import SafetyLightIcon1 from "@/assets/imgs/channel/light/hint_icon1.png";
import SafetyLightIcon2 from "@/assets/imgs/channel/light/hint_icon2.png";
import SafetyLightIcon3 from "@/assets/imgs/channel/light/hint_icon3.png";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

const SafetyTips = () => {
  const { t } = useTranslation();
  const { lg } = useTailwindBreakpoint();
  const { isLight } = useCurrentTheme();

  // 安全提示数据
  const safetyTipsData = useMemo(() => {
    return [
      {
        image: isLight ? SafetyLightIcon1 : SafetyDarkIcon1,
        title: t("channel:safetyTip1Title"),
        desc: t("channel:safetyTip1Desc"),
        alt: "SafetyTips1",
      },
      {
        image: isLight ? SafetyLightIcon2 : SafetyDarkIcon2,
        title: t("channel:safetyTip2Title"),
        desc: t("channel:safetyTip2Desc"),
        alt: "SafetyTips2",
      },
      {
        image: isLight ? SafetyLightIcon3 : SafetyDarkIcon3,
        title: t("channel:safetyTip3Title"),
        desc: t("channel:safetyTip3Desc"),
        alt: "SafetyTips3",
      },
    ];
  }, [isLight, t]);

  return (
    <div className={`${lg ? "pb-32" : "pb-16"} ${lg ? null : "mt-10"} w-full`}>
      <div
        className={`flex gap-[24px] justify-center items-stretch ${lg ? "flex-row mt-12" : "flex-col mt-7"}`}
      >
        {safetyTipsData.map((tip, index) => (
          <div
            key={index}
            className={`${lg ? "flex-1" : "w-full"} bg-[var(--b2)] box-border flex flex-col justify-between items-center p-[24px] rounded-[16px] min-h-[200px]`}
          >
            <div className="flex flex-col items-center">
              <img
                src={tip.image}
                className="w-[160px] h-[160px]"
                alt={tip.alt}
              />
              <h5 className="font-black text-center text-[24px] text-[var(--t1)] mt-[16px] md:mt-[20px]">
                {tip.title}
              </h5>
            </div>
            <p className="text-center text-[16px] text-[var(--t2)] mt-[12px] leading-[1.5] flex-1 flex items-start">
              {tip.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyTips;
