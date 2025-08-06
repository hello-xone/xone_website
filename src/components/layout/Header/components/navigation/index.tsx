import {
  NavigationData,
  useNavigationData,
  NavigationType,
  InfoMenuId,
} from "@/hooks/useNavigationData";
import ArrowIcon from "@/assets/svg/home/arrow.svg?react";
import styles from "./index.module.less";
import { useEffect, useState } from "react";
import { Link } from "@/components/comm/link";
import KnightIcon from "@/assets/svg/home/knight.svg?react";
import CopyIcon from "@/assets/svg/home/copy.svg?react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Animation, AnimationType } from "@/components/comm/animation";
import { CustomTooltip } from "@/components/comm/customTooltip";
import { useCopy } from "@/hooks/useCopy";

export const Navigation = () => {
  const { data } = useNavigationData();
  const [selectedMenu, setSelectedMenu] = useState<NavigationData>();
  const [currentNavId, setCurrentNavId] = useState<InfoMenuId>(
    InfoMenuId.KNIGHT
  );
  const { t } = useTranslation("common");

  const navigate = useNavigate();
  const { copy } = useCopy();

  const close = () => {
    setSelectedMenu(undefined);
  };

  useEffect(() => {
    const mouseover = () => {
      close();
    };

    window.addEventListener("mouseover", mouseover, false);
    return () => {
      window.removeEventListener("mouseover", mouseover, false);
    };
  }, []);

  const handleMouseOver = (navigationData: NavigationData) => {
    setSelectedMenu(navigationData);
    setCurrentNavId(InfoMenuId.KNIGHT);
  };

  const renderInfo = () => {
    const knightInfo = (
      <div
        className={`${styles.infoBox} flex justify-center items-center text-t2 flex-col`}
      >
        <div className="w-[18px]">
          <KnightIcon></KnightIcon>
        </div>
        <div className="text-[14px] mt-2">{t("common:comingSoon")}</div>
      </div>
    );
    switch (currentNavId) {
      case InfoMenuId.KNIGHT:
        return knightInfo;
      case InfoMenuId.BUSINESS:
        return (
          <div
            className={`${styles.infoBox} flex flex-col justify-between font-normal`}
          >
            <div>
              <div className="text-[12px] text-t2">{t("common:navGlobalBusinessConnect")}</div>
              <div className="mt-2 flex items-center">
                <Link
                  className="text-[14px] underline underline-offset-[2px]"
                  href="mailto:business@xone.org"
                >
                  buiness@xone.org
                </Link>
                <div
                  className="w-[20px] ml-4 cursor-pointer"
                  onClick={() => copy("buiness@xone.org")}
                >
                  <CopyIcon></CopyIcon>
                </div>
              </div>
              <div className="text-[12px] text-t2 mt-6">{t("common:navGlobalBusinessKit")}</div>
              <div className="text-[14px] flex gap-[10px] mt-2">
                <Link
                  href="https://docs.xone.org/study/media#our-logo"
                >
                  {t("common:navGlobalBusinessItem1")}
                </Link>
                <Link
                  href="https://docs.xone.org/study/media#our-color"
                >
                  {t("common:navGlobalBusinessItem2")}
                </Link>
                <Link
                  href="https://docs.xone.org/study/media#our-font"
                >
                  {t("common:navGlobalBusinessItem3")}
                </Link>
                <Link
                  href="https://docs.xone.org/study/media#our-coin"
                >
                  {t("common:navGlobalBusinessItem4")}
                </Link>
              </div>
            </div>
            <div
              className="text-t2 text-sm flex items-center cursor-pointer"
              onClick={() => {
                navigate("/commercial");
                close();
              }}
            >
              {t("seeMore")}
            </div>
          </div>
        );
      default:
        return knightInfo;
    }
  };

  const renderMenu = (menuData: NavigationData) => {
    if (!menuData?.group) return;
    switch (menuData?.type) {
      case NavigationType.LINK:
        return (
          <div className="flex gap-[24px]">
            {menuData?.group.map((item) => {
              const len = (item?.links || []).length;
              return (
                <div className={styles.group} key={item.id}>
                  <div>
                    <h2 className={styles.groupTitle}>{item.title}</h2>
                    <div className={styles.groupDescription}>
                      {item.description}
                    </div>
                    {(item?.links || []).map((linkData, index) => {
                      return (
                        <>
                          {linkData.internalLink ? (
                            <div
                              key={`${linkData.id}__internalLink`}
                              className={styles.link}
                              style={
                                index === len - 1
                                  ? {
                                    paddingBottom: 0,
                                  }
                                  : {}
                              }
                              onClick={() => {
                                navigate(linkData.link);
                                close();
                              }}
                            >
                              {linkData.name}
                            </div>
                          ) : (
                            <Link
                              key={linkData.id}
                              className={styles.link}
                              href={linkData.link}
                              style={
                                index === len - 1
                                  ? {
                                    paddingBottom: 0,
                                  }
                                  : {}
                              }
                            >
                              {linkData.name}
                            </Link>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );

      case NavigationType.INFO:
        return (
          <div className="flex gap-[24px]">
            <div>
              {menuData.group.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`${styles.wrapper} ${item.menuId === currentNavId ? styles.active : ""
                      }`}
                    onMouseOver={() =>
                      item.menuId && setCurrentNavId(item.menuId)
                    }
                  >
                    <div className="w-[24px]">{item.icon}</div>
                    <h2 className="mt-3">{item.title}</h2>
                    <p className="text-t2 text-[12px] leading-[14px] mt-1">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
            {renderInfo()}
          </div>
        );
    }
  };

  const handleClick = (navigationData: NavigationData) => {
    if (!navigationData.link) return;
    console.log('handleClick', navigationData, navigationData.internalLink,)
    navigationData.internalLink
      ? navigate(navigationData.link)
      : window.open(navigationData.link, "_blank");
  };

  console.log('data', data);

  return (
    <div
      className={styles.navs}
      onMouseOver={(event: any) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      {data.map((item, index) => {
        const title = renderMenu(item);

        const isActive = selectedMenu?.id === item.id;
        return (
          <CustomTooltip title={title} key={item.id} open={isActive}>
            <Animation
              className={`${styles.navItem} ${isActive ? styles.activeNav : ""}`}
              delay={(index + 1) * 0.2}
              animationClassName={AnimationType.SLIDE_IN_DOWN}
              onMouseOver={(event: any) => {
                event.stopPropagation();
                event.nativeEvent.stopImmediatePropagation();
                handleMouseOver(item);
              }}
            >
              <div onClick={() => handleClick(item)}>{item.name}</div>
              {Array.isArray(item.group) && (
                <div className={styles.arrow}>
                  <ArrowIcon></ArrowIcon>
                </div>
              )}
            </Animation>
          </CustomTooltip>
        );
      })}
    </div>
  );
};
