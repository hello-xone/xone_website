import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import pic1 from "@/assets/imgs/developer/building1.png";
import pic2 from "@/assets/imgs/developer/building2.png";
import pic3 from "@/assets/imgs/developer/building3.png";
import pic4 from "@/assets/imgs/developer/dark/building1.png";
import pic5 from "@/assets/imgs/developer/dark/building2.png";
import pic6 from "@/assets/imgs/developer/dark/building3.png";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { AnimationName, useScrollreveal } from "@/hooks/useScrollreveal";

import styles from "./index.module.less";

export const Building = () => {
  const { t, i18n } = useTranslation();
  const { isLight } = useCurrentTheme();
  const apps = useMemo(() => {
    return [
      {
        img: isLight ? pic1 : pic4,
        name: t("developer:app1"),
        url: "https://docs.xone.org/developers/architecture/account",
      },
      {
        img: isLight ? pic2 : pic5,
        name: t("developer:app2"),
        url: "https://docs.xone.org/developers/architecture/transaction",
      },
      {
        img: isLight ? pic3 : pic6,
        name: t("developer:app3"),
        url: "https://docs.xone.org/developers/architecture/replay",
      },
    ];
  }, [i18n.language, isLight]);

  const { delayClassNames } = useScrollreveal();

  return (
    <div className={styles.wrapper}>
      <div>
        <div className="flex justify-center w-full">
          <h1 className={`${styles.title} ${AnimationName.SLIDE_IN_BOTTOM}`}>
            {t("developer:buildingTitle")}
          </h1>
        </div>

        <div className={styles.appWrapper}>
          <div className={`${styles.apps}`}>
            {apps.map((item, index) => {
              return (
                <div
                  className={`${styles.app}  ${AnimationName.SLIDE_IN_BOTTOM} ${delayClassNames[index * 2]}`}
                  key={index}
                >
                  <div className={styles.img}>
                    <img className="w-full" src={item.img} alt="" />
                  </div>
                  <h1
                    className={`${styles.appName} ${AnimationName.SLIDE_IN_BOTTOM} ${delayClassNames[index * 2 + 2]}`}
                  >
                    {item.name}
                  </h1>
                  <SeeMore
                    href={item.url}
                    className={`${styles.viewDetails} ${AnimationName.SLIDE_IN_BOTTOM} ${delayClassNames[index * 2 + 4]}`}
                    text={t("common:viewDetails")}
                    target="_blank"
                  ></SeeMore>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
