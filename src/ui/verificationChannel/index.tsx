import { Box } from "@mui/material";

import { MotionScrollReveal } from "@/components/comm/animation/ScrollReveal";

import Channel from "./sections/Channel";
import SafetyTips from "./sections/SafetyTips";

export const VerificationChannel = () => {
  return (
    <Box className="w-full" sx={{ paddingTop: "var(--app-header-height)" }}>
      <Box
        sx={{
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
        }}
      >
        <MotionScrollReveal delay={0}>
          <Channel />
        </MotionScrollReveal>
        <MotionScrollReveal delay={0.2}>
          <SafetyTips />
        </MotionScrollReveal>
      </Box>
    </Box>
  );
};
