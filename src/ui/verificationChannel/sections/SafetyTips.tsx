import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import SafetyTips1 from "@/assets/imgs/channel/hint_icon1.png";
import SafetyTips2 from "@/assets/imgs/channel/hint_icon2.png";
import SafetyTips3 from "@/assets/imgs/channel/hint_icon3.png";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

const SafetyTips = () => {
  const { t } = useTranslation();
  const { lg } = useTailwindBreakpoint();

  // 安全提示数据
  const safetyTipsData = [
    {
      image: SafetyTips1,
      title: t("channel:safetyTip1Title"),
      alt: "SafetyTips1",
    },
    {
      image: SafetyTips2,
      title: t("channel:safetyTip2Title"),
      alt: "SafetyTips2",
    },
    {
      image: SafetyTips3,
      title: t("channel:safetyTip3Title"),
      alt: "SafetyTips3",
    },
  ];

  return (
    <Box className={`${lg ? "pb-32" : "pb-16"} ${lg ? null : "mt-10"} w-full`}>
      <Box>
        <h4
          className={`font-black text-center color-[b5]`}
          style={{
            fontSize: lg ? "40px" : "24px",
          }}
        >
          {t("channel:safetyTipsTitle")}
        </h4>
        <Box
          className={`flex gap-[24px] justify-center ${lg ? "flex-row mt-12" : "flex-col mt-7"}`}
        >
          {safetyTipsData.map((tip, index) => (
            <Box
              key={index}
              className={`${lg ? "w-1/3" : "w-full"} bg-[var(--b2)] box-border flex flex-col justify-center items-center  ] pt-[68px] pb-[80px] rounded-[16px]`}
            >
              <img src={tip.image} className="w-2/5" alt={tip.alt} />
              <h5 className="font-black text-center mt-[30px] text-[24px] color-[t1]">
                {tip.title}
              </h5>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SafetyTips;
