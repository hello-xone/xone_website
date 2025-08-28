import { PropsWithChildren, useState } from "react";

import { useStartupLoaded } from "@/hooks/useStartupLoaded";
import { useWindowResize } from "@/hooks/useWindowResize";
import { useNoticeStore } from "@/store/noticeStore";

import styles from "./index.module.less";

export const BannerWrapper = ({ children }: PropsWithChildren) => {
  const [bannerAnimationClassName, setBannerAnimationClassName] = useState("");
  const [isFixedHeight, setIsFixedHeight] = useState(false);
  const { closed } = useNoticeStore();

  const calculatedHeight = () => {
    const body = document.getElementsByTagName("body")[0];
    if (body) {
      const height = window.innerHeight;
      const width = window.innerWidth;
      const rate = height / width;
      setIsFixedHeight(rate < 0.7);
    }
  };

  useWindowResize(() => {
    calculatedHeight();
  }, []);
  useStartupLoaded(() => {
    setBannerAnimationClassName("__bannerAnimation");
    calculatedHeight();
  }, []);
  return (
    <div
      className={`${styles.bannerWrapper} ${bannerAnimationClassName}`}
      style={{
        height: isFixedHeight
          ? `calc(100vh - ${!closed ? "64px" : "0px"})`
          : "unset",
      }}
    >
      {children}
    </div>
  );
};
