import clsx from "clsx";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import IconSvgDark1 from "@/assets/imgs/grants/dark/icon_13.png";
import IconSvgDark2 from "@/assets/imgs/grants/dark/icon_14.png";
import IconSvgDark3 from "@/assets/imgs/grants/dark/icon_15.png";
import IconSvgDark4 from "@/assets/imgs/grants/dark/icon_16.png";
import IconSvgDark5 from "@/assets/imgs/grants/dark/icon_17.png";
import IconSvgLight1 from "@/assets/imgs/grants/light/icon_13.png";
import IconSvgLight2 from "@/assets/imgs/grants/light/icon_14.png";
import IconSvgLight3 from "@/assets/imgs/grants/light/icon_15.png";
import IconSvgLight4 from "@/assets/imgs/grants/light/icon_16.png";
import IconSvgLight5 from "@/assets/imgs/grants/light/icon_17.png";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

import styles from "../index.module.less";

export const SupportProvided = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const { isLight } = useCurrentTheme();
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const list = useMemo(() => {
    return [
      {
        title: t("grants:supportProvidedTitle01"),
        desc: t("grants:supportProvidedDesc01"),
        icon: isLight ? IconSvgLight1 : IconSvgDark1,
        button: t("grants:supportProvidedButton01"),
      },
      {
        title: t("grants:supportProvidedTitle02"),
        desc: t("grants:supportProvidedDesc02"),
        icon: isLight ? IconSvgLight2 : IconSvgDark2,
        button: t("grants:supportProvidedButton02"),
      },
      {
        title: t("grants:supportProvidedTitle03"),
        desc: t("grants:supportProvidedDesc03"),
        icon: isLight ? IconSvgLight3 : IconSvgDark3,
        button: t("grants:supportProvidedButton03"),
      },
      {
        title: t("grants:supportProvidedTitle04"),
        desc: t("grants:supportProvidedDesc04"),
        icon: isLight ? IconSvgLight4 : IconSvgDark4,
        button: t("grants:supportProvidedButton04"),
      },
      {
        title: t("grants:supportProvidedTitle05"),
        desc: t("grants:supportProvidedDesc05"),
        icon: isLight ? IconSvgLight5 : IconSvgDark5,
        button: t("grants:supportProvidedButton05"),
      },
    ];
  }, [isLight, t]);

  const detail = useMemo(() => {
    if (!list[activeIndex]) return null;
    return list[activeIndex];
  }, [list, activeIndex]);

  // 进度条自动切换逻辑
  useEffect(() => {
    // 清除之前的定时器
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // 重置进度
    setProgress(0);

    // 开始新的进度条
    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          // 进度条满了，切换到下一个卡片
          setActiveIndex((prevIndex) => (prevIndex + 1) % list.length);
          return 0; // 重置进度
        }
        return prevProgress + 2; // 每50ms增加2%，总共5秒完成
      });
    }, 120);

    // 清理函数
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeIndex, list.length]);

  return (
    <div className="mt-[80px] md:mt-[180px]">
      <h2 className="text-[var(--t1)] text-[24px] md:text-[48px] font-bold">
        {t("grants:supportProvidedTitle")}
      </h2>
      <p className="text-[var(--t2)] text-[15px] md:text-[16px] mt-2 md:mt-1">
        {t("grants:supportProvidedDesc")}
      </p>
      <div className="mt-10 flex gap-x-[10px] items-stretch justify-between">
        <div className="md:w-[410px] w-full flex flex-col gap-y-[26px]">
          {list.map((item, index) => (
            <Fragment key={index}>
              <div
                className={clsx(
                  "border-l-[4px] md:pl-[20px] pl-[20px] cursor-pointer flex flex-col items-start gap-[10px] md:gap-[16px] hover:border-l-[var(--primary)] [&>h3]:hover:text-[var(--primary)] [&>h3]:hover:text-[32px] [&>img]:hover:w-[54px] [&>img]:hover:h-[54px]",
                  activeIndex === index
                    ? "border-l-[var(--primary)]"
                    : "border-l-[transparent]"
                )}
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className={clsx(
                    activeIndex === index
                      ? "w-[54px] h-[54px]"
                      : "w-[40px] h-[40px]"
                  )}
                />
                <h3
                  className={clsx(
                    "font-bold",
                    activeIndex === index
                      ? "text-[var(--primary)] text-[32px]"
                      : "text-[var(--t1)] text-[24px]"
                  )}
                >
                  {item.title}
                </h3>
              </div>
              {detail?.title === item.title && (
                <div className="block md:hidden w-full md:w-[752px]">
                  <div className="w-full h-[210px] md:h-[445px] bg-[var(--layer2)] md:rounded-[28px] rounded-[8px]"></div>
                  <p className="text-[var(--t2)] mt-4 md:mt-12 text-[16px] md:text-[17px] line-clamp-3">
                    {detail.desc}
                  </p>
                  <SeeMore
                    className={`mt-3 md:mt-6 ${styles.seeMore} ${styles.seeMoreSupport}`}
                    href="https://docs.xone.org/study/grants"
                    text={detail.button}
                    target="_blank"
                  ></SeeMore>

                  <div className="mt-[15px] w-full">
                    <div className="w-full h-[4px] bg-[var(--b3)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded-full transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
        {detail && (
          <div className="hidden flex-col justify-between md:flex md:flex-1">
            <div className="w-full h-[460px] bg-[var(--layer2)] rounded-[28px]"></div>
            <p className="text-[var(--t2)] mt-2 text-[17px] line-clamp-3">
              {detail.desc}
            </p>
            <div className="mt-6">
              <SeeMore
                className={`${styles.seeMore} ${styles.seeMoreSupport}`}
                href="https://docs.xone.org/study/grants"
                text={detail.button}
                target="_blank"
              ></SeeMore>

              <div className="mt-5 w-full">
                <div className="w-full h-[4px] bg-[var(--b3)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--primary)] rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
