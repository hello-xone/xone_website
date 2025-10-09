import { Box } from "@mui/material";

import { MotionScrollReveal } from "@/components/comm/animation/ScrollReveal";

import Channel from "./sections/Channel";
import SafetyTips from "./sections/SafetyTips";

export const VerificationChannel = () => {
  const boxStyle = {
    maxWidth: {
      xs: "100%", // H5: 小于768px
      sm: "100%", // Pad: 768-1023px
      md: "100%", // 小PC: 1024-1279px
      lg: "1200px", // 大PC: 大于1280px
    },
    margin: "0 auto",
    paddingLeft: {
      xs: "16px", // H5: 375-767px
      sm: "24px", // Pad: 768-1023px
      md: "40px", // 小PC: 1024-1279px
      lg: "0", // 大PC: 大于1280px
    },
    paddingRight: {
      xs: "16px", // H5: 375-767px
      sm: "24px", // Pad: 768-1023px
      md: "40px", // 小PC: 1024-1279px
      lg: "0", // 大PC: 大于1280px
    },
  };

  return (
    <Box className="w-full">
      <MotionScrollReveal delay={0}>
        <Channel sx={boxStyle} />
      </MotionScrollReveal>
      <MotionScrollReveal delay={0.2}>
        <Box sx={boxStyle}>
          <SafetyTips />
        </Box>
      </MotionScrollReveal>
    </Box>
  );
};
