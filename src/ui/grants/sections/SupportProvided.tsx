import clsx from "clsx";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import IconSvg from "@/assets/svg/grants/icon.svg?react";
import { SeeMore } from "@/components/comm/link/SeeMore";

import styles from "../index.module.less";

export const SupportProvided = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const list = [
    {
      title: t("grants:supportProvidedTitle01"),
      desc: t("grants:supportProvidedDesc01"),
      icon: IconSvg,
      button: t("grants:supportProvidedButton01"),
    },
    {
      title: t("grants:supportProvidedTitle02"),
      desc: t("grants:supportProvidedDesc02"),
      icon: IconSvg,
      button: t("grants:supportProvidedButton02"),
    },
    {
      title: t("grants:supportProvidedTitle03"),
      desc: t("grants:supportProvidedDesc03"),
      icon: IconSvg,
      button: t("grants:supportProvidedButton03"),
    },
    {
      title: t("grants:supportProvidedTitle04"),
      desc: t("grants:supportProvidedDesc04"),
      icon: IconSvg,
      button: t("grants:supportProvidedButton04"),
    },
    {
      title: t("grants:supportProvidedTitle05"),
      desc: t("grants:supportProvidedDesc05"),
      icon: IconSvg,
      button: t("grants:supportProvidedButton05"),
    },
  ];

  const detail = useMemo(() => {
    if (!list[activeIndex]) return null;
    return list[activeIndex];
  }, [list, activeIndex]);

  return (
    <div className="mt-[80px] md:mt-[180px]">
      <h2 className="text-[var(--t1)] text-[24px] md:text-[48px] font-bold">
        {t("grants:supportProvidedTitle")}
      </h2>
      <p className="text-[var(--t2)] text-[15px] md:text-[16px] mt-2 md:mt-1">
        {t("grants:supportProvidedDesc")}
      </p>
      <div className="mt-10 flex gap-x-[24px] items-center justify-between">
        <div className="w-full md:w-auto flex flex-col gap-y-[26px]">
          {list.map((item, index) => (
            <>
              <div
                className={clsx(
                  "border-l-[4px] md:pl-[20px] pl-[24px] cursor-pointer flex flex-col items-start gap-[10px] md:gap-[16px]",
                  activeIndex === index
                    ? "border-l-[var(--primary)]"
                    : "border-l-[transparent]"
                )}
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                <item.icon />
                <h3
                  className={clsx(
                    "text-[24px] font-bold",
                    activeIndex === index
                      ? "text-[var(--primary)]"
                      : "text-[var(--t1)]"
                  )}
                >
                  {item.title}
                </h3>
              </div>
              {detail?.title === item.title && (
                <div className="block md:hidden w-full md:w-[752px]">
                  <div className="w-full h-[210px] md:h-[445px] bg-[var(--layer2)] md:rounded-[28px] rounded-[8px]"></div>
                  <p className="text-[var(--t2)] mt-4 md:mt-12 text-[16px] md:text-[17px]">
                    {detail.desc}
                  </p>
                  <SeeMore
                    className={`mt-3 md:mt-6 ${styles.seeMore} ${styles.seeMoreSupport}`}
                    href="https://docs.xone.org/study/grants"
                    text={detail.button}
                    target="_blank"
                  ></SeeMore>
                </div>
              )}
            </>
          ))}
        </div>
        {detail && (
          <div className="hidden md:block w-[752px]">
            <div className="w-full h-[445px] bg-[var(--layer2)] rounded-[28px]"></div>
            <p className="text-[var(--t2)] mt-12 text-[17px]">{detail.desc}</p>
            <SeeMore
              className={`mt-6 ${styles.seeMore} ${styles.seeMoreSupport}`}
              href="https://docs.xone.org/study/grants"
              text={detail.button}
              target="_blank"
            ></SeeMore>
          </div>
        )}
      </div>
    </div>
  );
};
