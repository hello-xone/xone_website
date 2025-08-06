import { BaseContainer } from "@/components/layout/BaseContainer";
import { useMemo } from "react";
import ArrowIcon from "@/assets/svg/home/arrow.svg?react";
import { Link } from "@/components/comm/link";
import { useTranslation } from "react-i18next";
import pic1 from "@/assets/imgs/developer/building1.png";
import pic2 from "@/assets/imgs/developer/building2.png";
import pic3 from "@/assets/imgs/developer/building3.png";
import fatherStyles from "../index.module.less";
import styles from "./index.module.less";
import { AnimationName, useScrollreveal } from "@/hooks/useScrollreveal";

export const Building = () => {
  const { t, i18n } = useTranslation();
  const apps = useMemo(() => {
    return [
      {
        img: pic1,
        name: t("developer:app1"),
        url: "https://docs.xone.org/developers/architecture/account",
      },
      {
        img: pic2,
        name: t("developer:app2"),
        url: "https://docs.xone.org/developers/architecture/transaction",
      },
      {
        img: pic3,
        name: t("developer:app3"),
        url: "https://docs.xone.org/developers/architecture/replay",
      },
    ];
  }, [i18n.language]);

  const { delayClassNames } = useScrollreveal();

  return (
    <BaseContainer className={styles.wrapper}>
      <div>
        <div className="flex w-full justify-center">
          <h1
            className={`${fatherStyles.title} ${styles.title} ${AnimationName.SLIDE_IN_BOTTOM}`}
          >
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
                  <Link
                    href={item.url}
                    className={`${styles.viewDetails} ${AnimationName.SLIDE_IN_BOTTOM} ${delayClassNames[index * 2 + 4]}`}
                  >
                    {t("common:viewDetails")}
                    <div className={styles.arrowIcon}>
                      <ArrowIcon></ArrowIcon>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};
