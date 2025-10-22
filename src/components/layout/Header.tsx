import clsx from "clsx";
import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import LogoIcon from "@/assets/imgs/header/logo.png";
import LogoRedIcon from "@/assets/imgs/header/logo-red.png";
import { EXTERNAL_LINKS } from "@/constants/external";
import { getMenus, InfoMenuId } from "@/constants/menus";
import useApplicationStore from "@/store/applicationStore";

import CommonButton from "../comm/button/CommonButton";
import Language from "../Icons/Language";
import Theme from "../Icons/Theme";
import BuildDocCard from "./Header/components/buildDocCard";
import BusinessCard from "./Header/components/businessCard";
import ImageCard from "./Header/components/imageCard";
import MenuItem from "./Header/components/menuItem";
import ResourceCard from "./Header/components/resourceCard";
import SolutionCard from "./Header/components/solutionCard";
import CommonPopover from "./Popover/CommonPopover";
import LanguagePopover from "./Popover/LanguagePopover";
import MenuPopover from "./Popover/MenuPopover";

// 右侧详情卡片组件映射
const DetailCardComponents: Record<string, FC<{ group: any }>> = {
  [InfoMenuId.SOLUTION]: SolutionCard,
  [InfoMenuId.BUILD_DOC]: BuildDocCard,
  [InfoMenuId.RESOURCE]: ResourceCard,
  [InfoMenuId.IMAGE]: ImageCard,
  [InfoMenuId.PROMOTION]: BusinessCard,
};

const Header = () => {
  const popoverRef = useRef<any>(null);
  const navigate = useNavigate();
  const { isLight, changeTheme } = useApplicationStore();
  const [detailId, setDetailId] = useState("");
  const [displayDetailId, setDisplayDetailId] = useState(""); // 用于显示的延迟状态
  const [activeMenuId, setActiveMenuId] = useState<string | null>("");
  const { t, i18n } = useTranslation("header");

  // 用于防抖的
  const detailIdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isThemeSwitching, setIsThemeSwitching] = useState(false);

  const toggleTheme = () => {
    setIsThemeSwitching(true);

    // 页面过渡效果
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.setAttribute(
          "data-theme",
          isLight ? "dark" : "light"
        );
        localStorage.setItem("theme", isLight ? "dark" : "light");
        changeTheme();
      });
    } else {
      // 切换主题
      document.documentElement.setAttribute(
        "data-theme",
        isLight ? "dark" : "light"
      );
      localStorage.setItem("theme", isLight ? "dark" : "light");
      changeTheme();
    }

    // 重置动画状态
    setTimeout(() => {
      setIsThemeSwitching(false);
    }, 600);
  };

  // 根据主题获取菜单配置
  const menus = useMemo(() => getMenus(isLight ? "light" : "dark"), [isLight]);

  useEffect(() => {
    // 清除之前的定时器
    if (detailIdTimeoutRef.current) {
      clearTimeout(detailIdTimeoutRef.current);
    }

    if (detailId !== displayDetailId) {
      // 如果已经有显示的卡片，先淡出
      if (displayDetailId) {
        // 淡出后更新显示的 detailId
        detailIdTimeoutRef.current = setTimeout(() => {
          setDisplayDetailId(detailId);
        }, 100);
      } else {
        // 如果没有显示的卡片，直接显示新卡片
        setDisplayDetailId(detailId);
      }
    }

    return () => {
      if (detailIdTimeoutRef.current) {
        clearTimeout(detailIdTimeoutRef.current);
      }
    };
  }, [detailId, displayDetailId]);

  // 防抖处理菜单项悬停
  const handleMenuItemHover = useCallback((id: string) => {
    // 清除之前的定时器
    if (detailIdTimeoutRef.current) {
      clearTimeout(detailIdTimeoutRef.current);
    }

    // 避免快速划过时频繁切换
    detailIdTimeoutRef.current = setTimeout(() => {
      setDetailId(id);
    }, 100);
  }, []);

  const group = useMemo(() => {
    const menu = menus.find((item) => item.id === activeMenuId);
    if (menu && menu.group) {
      return menu.group.find((item) => item.id === displayDetailId) ?? null;
    }
    return null;
  }, [activeMenuId, displayDetailId, menus]);

  // 渲染右侧详情卡片
  const renderDetailCard = useMemo(() => {
    if (!group) return null;

    let CardComponent: FC<{ group: any; onClose?: () => void }> | null = null;

    if (activeMenuId === InfoMenuId.SOLUTION) {
      CardComponent = DetailCardComponents[InfoMenuId.SOLUTION];
    } else if (displayDetailId && DetailCardComponents[displayDetailId]) {
      CardComponent = DetailCardComponents[displayDetailId];
    } else if (group.menuId && DetailCardComponents[group.menuId]) {
      CardComponent = DetailCardComponents[group.menuId];
    }

    if (!CardComponent) return null;

    return (
      <CardComponent group={group} onClose={() => setActiveMenuId(null)} />
    );
  }, [group, activeMenuId, displayDetailId]);

  return (
    <div
      className={clsx(
        `w-full fixed backdrop-blur-[5px] z-[10] top-0 left-0 h-[58px] md:h-[64px] px-4 md:px-[30px] flex items-center justify-between`,
        {
          "bg-[#ffffff]/50": isLight,
          "bg-[#070808]/50": !isLight,
        }
      )}
    >
      <div className="flex items-center z-10 gap-[48px]">
        <img
          src={LogoRedIcon}
          alt="logo"
          onClick={() => navigate("/")}
          className="w-[100px] h-auto cursor-pointer max-md:hidden"
        ></img>
        <img
          src={LogoIcon}
          onClick={() => navigate("/")}
          alt="logo"
          className="w-8 h-8 md:hidden"
        ></img>
        <div className="hidden lg:flex items-center gap-[40px]">
          {menus &&
            menus.map((item) => {
              return (
                <div key={`header-item-${item.id}`}>
                  {item.group && item.group.length > 0 ? (
                    <CommonPopover
                      ref={popoverRef}
                      text={t(item.name)}
                      menuId={item.id}
                      activeMenuId={activeMenuId}
                      setActiveMenuId={setActiveMenuId}
                    >
                      <div className="flex gap-x-[24px]">
                        <div className="w-[320px] flex flex-col gap-y-[10px]">
                          {item.group &&
                            item.group.map((gel) => (
                              <MenuItem
                                key={`children-item-${gel.id}`}
                                item={gel}
                                detailId={displayDetailId as InfoMenuId}
                                onMouseEnter={() =>
                                  handleMenuItemHover(gel.id as InfoMenuId)
                                }
                                onClose={() => setActiveMenuId(null)}
                              />
                            ))}
                        </div>
                        {renderDetailCard}
                      </div>
                    </CommonPopover>
                  ) : (
                    <Link
                      to={
                        item.id === "Ecology"
                          ? `${EXTERNAL_LINKS.dashboard}${i18n.language}${item.link}`
                          : item.link || ""
                      }
                      className="text-sm text-t1"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      {t(item.name)}
                    </Link>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex items-center gap-[12px] md:gap-[24px]">
        <CommonButton
          className="max-md:text-xs"
          onClick={() => window.open(EXTERNAL_LINKS.Bvi)}
        >
          {t("exploreXone")}
        </CommonButton>
        <MenuPopover></MenuPopover>
        <div className="hidden lg:flex items-center gap-[8px]">
          <LanguagePopover>
            <Language className="text-t1"></Language>
          </LanguagePopover>
          <div
            className={`w-[40px] flex rounded-[10px] hover:bg-b2 items-center justify-center h-[40px] theme-toggle-button ${isThemeSwitching ? "theme-switching" : ""}`}
          >
            <Theme
              isLight={isLight}
              onClick={() => toggleTheme()}
              className="text-t1 w-[24px] h-[24px] theme-icon"
            ></Theme>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
