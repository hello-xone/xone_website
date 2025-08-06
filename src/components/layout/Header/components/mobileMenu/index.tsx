import { useEffect, useRef, useState } from "react";
import { useNavigationData, NavigationData, InfoMenuId, NavigationType, NavigationGroup } from "@/hooks/useNavigationData";
import ArrowIcon from "@/assets/svg/home/arrow.svg?react";
import InfoArrowIcon from "@/assets/svg/home/info_arrow.svg?react";
import { Link } from "@/components/comm/link";
import { useNavigate } from "react-router-dom";
import KnightIcon from "@/assets/svg/home/knight.svg?react";
import CopyIcon from "@/assets/svg/home/copy.svg?react";
import { useTranslation } from "react-i18next";
import { useCopy } from "@/hooks/useCopy";


import styles from "./index.module.less";


interface MobileMenuProps {
  show: boolean;
  onClose: () => void;
}
export const MobileMenu = ({ show, onClose }: MobileMenuProps) => {
  const { data } = useNavigationData();
  const [openMenuMap, setOpenMenuMap] = useState<{ [id: string]: boolean }>({});
  const [menuHeight, setMenuHeight] = useState(0);
  const timerRef = useRef(0);
  const animateLock = useRef(false);
  const heightMapRef = useRef<{ [id: string]: number }>({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { copy } = useCopy();

  const handleToggleMenu = (navData: NavigationData) => {
    if (navData.link) {
      window.open(navData.link, '__blank');
      return
    };
    const id = navData.id;
    const temp: { [id: string]: boolean } = { ...openMenuMap };
    if (temp[String(id)]) {
      delete temp[id];
    } else {
      temp[id] = true;
    }
    setOpenMenuMap(temp);
  };

  const animate = () => {
    if (animateLock.current) return;
    animateLock.current = true;
    let h = 0;
    timerRef.current = window.setInterval(() => {
      h += 2;
      setMenuHeight(h);
      if (h >= 100) {
        setMenuHeight(100);
        window.clearInterval(timerRef.current);
        animateLock.current = false;
      }
    }, 4);
  };

  useEffect(() => {
    if (show) {
      animate();
    } else {
      window.clearInterval(timerRef.current);
      setMenuHeight(0);
      setOpenMenuMap({});
      animateLock.current = false;
    }
  }, [show]);
  useEffect(() => {
    return () => {
      window.clearInterval(timerRef.current);
    };
  }, []);

  const renderInfo = (groupData: NavigationGroup) => {
    const knightInfo = (
      <div
        className={`${styles.infoBox} text-t2 mt-6`}
      >
        <div className="py-6 flex justify-center items-center flex-col">
          <div className="w-[18px]">
            <KnightIcon></KnightIcon>
          </div>
          <div className="text-[14px] mt-2">{t("common:comingSoon")}</div>
        </div>

      </div>
    );
    switch (groupData.menuId) {
      case InfoMenuId.KNIGHT:
        return knightInfo;
      case InfoMenuId.BUSINESS:
        return (
          <div
            className={`${styles.infoBox} flex flex-col justify-between font-normal mt-6`}
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
              className="text-t2 text-sm flex items-center cursor-pointer mt-4"
              onClick={() => {
                navigate("/commercial");
                onClose && onClose();
              }}
            >
              {t("common:seeMore")}
            </div>
          </div>
        );
      default:
        return knightInfo;
    }
  }

  return (
    <div className={`${styles.container} ${show ? styles.show : ""}`}>
      <div
        className={`${styles.menu}`}
        style={{
          height: `${menuHeight}%`,
        }}
      >
        <div
          className={`__hiddenScroll px-4 py-6 w-full h-full overflow-y-scroll`}
        >
          {data.map((item) => {
            const isOpen = openMenuMap[item.id];
            const height = isOpen ? heightMapRef.current[item.id] || 0 : 0;

            return (
              <div
                key={item.id}
                className={`${styles.nav} ${isOpen ? styles.open : ""}`}
              >
                <h3
                  className={styles.navName}
                  onClick={() => handleToggleMenu(item)}
                >
                  {item.name}{" "}
                  {
                    item.link ? <div className={styles.linkArrow}>
                      <InfoArrowIcon></InfoArrowIcon>
                    </div> : <div className={styles.arrowIcon}>
                      <ArrowIcon></ArrowIcon>
                    </div>
                  }
                </h3>
                <div
                  className={styles.list}
                  style={{
                    height: height + "px",
                  }}
                >
                  <div
                    ref={(el) => {
                      if (heightMapRef.current && el?.clientHeight) {
                        heightMapRef.current[item.id] = el?.clientHeight;
                      }
                    }}
                  >
                    {(item.group || []).map((group) => {
                      return (
                        <div key={group.id}>
                          <div className={styles.groupInfo}>
                            <h3 className={styles.groupTitle}>{group.title}</h3>
                            <p className={styles.groupDescription}>
                              {group.description}
                            </p>
                          </div>

                          {
                            item.type === NavigationType.INFO ? renderInfo(group) : <>
                              {(group.links || []).map((link) => {
                                return (
                                  <div
                                    key={link.id}
                                    onClick={() => {
                                      onClose && onClose();

                                      link.internalLink && navigate(link.link);
                                    }}
                                  >
                                    {link.internalLink ? (
                                      <div className={styles.link}>
                                        {link.name}
                                        <div className={styles.linkArrow}>
                                          <InfoArrowIcon></InfoArrowIcon>
                                        </div>
                                      </div>
                                    ) : (
                                      <Link
                                        className={styles.link}
                                        href={link.link}
                                      >
                                        {link.name}
                                        <div className={styles.linkArrow}>
                                          <InfoArrowIcon></InfoArrowIcon>
                                        </div>
                                      </Link>
                                    )}
                                  </div>
                                );
                              })}
                            </>
                          }
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
