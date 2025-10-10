import clsx from "clsx";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import ActiveIcon from "@/assets/imgs/header/active.png";
import ActiveDarkIcon from "@/assets/imgs/header/active-dark.png";
import BlogIcon from "@/assets/imgs/header/blog.png";
import BlogDarkIcon from "@/assets/imgs/header/blog-dark.png";
import BusinessIcon from "@/assets/imgs/header/business.png";
import BusinessDarkIcon from "@/assets/imgs/header/business-dark.svg";
import GrantsIcon from "@/assets/imgs/header/grants.png";
import GrantsDarkIcon from "@/assets/imgs/header/grants-dark.png";
import KnightIcon from "@/assets/imgs/header/knight.png";
import KnightDarkIcon from "@/assets/imgs/header/knight-dark.png";
import LogoIcon from "@/assets/imgs/header/logo.png";
import LogoRedIcon from "@/assets/imgs/header/logo-red.png";
import RecruitmentIcon from "@/assets/imgs/header/recruitment.png";
import RecruitmentDarkIcon from "@/assets/imgs/header/recruitment-dark.png";
import { EXTERNAL_LINKS } from "@/constants/external";
import { menus, NavigationType } from "@/constants/menus";
import useApplicationStore from "@/store/applicationStore";

import CommonButton from "../comm/button/CommonButton";
import { SeeMore } from "../comm/link/SeeMore";
import Language from "../Icons/Language";
import Theme from "../Icons/Theme";
import BusinessCard from "./Header/components/businessCard";
import CommonPopover from "./Popover/CommonPopover";
import LanguagePopover from "./Popover/LanguagePopover";
import MenuPopover from "./Popover/MenuPopover";

const Header = () => {
  const popoverRef = useRef<any>(null);
  const navigate = useNavigate();
  const { isLight, changeTheme } = useApplicationStore();
  const [detailId, setDetailId] = useState("");
  const { t, i18n } = useTranslation("header");

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

  const group = useMemo(() => {
    if (detailId) {
      const groups = menus.find((item) => item.id === "global")?.group;
      if (groups) {
        return groups.find((item) => item.id === detailId);
      }
    }
  }, [detailId]);

  const handleCallChild = () => {
    if (popoverRef.current) {
      popoverRef.current.close();
    }
  };

  const DetailImg = useMemo(() => {
    switch (detailId) {
      case "global_business":
        return isLight ? BusinessIcon : BusinessDarkIcon;
      case "global_recruitment":
        return isLight ? RecruitmentIcon : RecruitmentDarkIcon;
      case "global_blog":
        return isLight ? BlogIcon : BlogDarkIcon;
      case "global_active":
        return isLight ? ActiveIcon : ActiveDarkIcon;
      case "global_knight":
        return isLight? KnightIcon : KnightDarkIcon;
      case "global_grants":
        return isLight ? GrantsIcon : GrantsDarkIcon;
      default:
        return isLight ? KnightIcon : KnightDarkIcon;
    }
  }, [isLight, detailId])
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
                    <CommonPopover ref={popoverRef} text={t(item.name)}>
                      {item.type === NavigationType.INFO ? (
                        <div className="flex items-stretch gap-[24px]">
                          <div className="w-[372px]">
                            {item.group &&
                              item.group.map((gel) => (
                                <div
                                  onMouseEnter={() => setDetailId(gel.id)}
                                  className={clsx(
                                    "px-[10px] w-full group gap-[12px] rounded-[8px] mb-[2px] bg-transparent hover:bg-b3 cursor-pointer py-2 flex items-center",
                                    {
                                      "!bg-b3": detailId === gel.id,
                                    }
                                  )}
                                  key={`children-item-${gel.id}`}
                                >
                                  <gel.icon
                                    className={clsx(
                                      "text-t1 shrink-0",
                                      {
                                        "!text-t1": detailId === gel.id,
                                      }
                                    )}
                                  ></gel.icon>
                                  <div
                                    className={clsx(
                                      "text-t2 w-full pr-[34px] shrink-0",
                                      {
                                        "!text-t1": detailId === gel.id,
                                      }
                                    )}
                                  >
                                    <div className="text-sm text-t1 w-full font-bold leading-[140%] mb-1">
                                      {t(gel.title)}
                                    </div>
                                    <div className="text-xs group-hover:text-t1 w-full leading-[16px]">
                                      {t(gel.description)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="w-[480px] flex-1 flex flex-col">
                            {group?.id === "global_business" ? (
                              <BusinessCard></BusinessCard>
                            ) : (
                              <>
                                <div className="w-full min-h-[164px] flex-1 flex flex-col items-center justify-center rounded-[8px] bg-b3">
                                  <img alt="" src={DetailImg} className="w-[164px] h-[164px]"></img>
                                </div>
                                {
                                  group?.detailTitle && <div className="mt-3 text-t2 shrink-0 text-sm font-bold leading-[140%]">
                                    {group?.detailTitle
                                      ? t(group?.detailTitle)
                                      : ""}
                                  </div>
                                }

                                {group?.detailDesc && (
                                  <div className="mt-3 text-t2 shrink-0 text-sm leading-[140%]">
                                    {group?.detailDesc
                                      ? t(group?.detailDesc)
                                      : ""}
                                  </div>
                                )}
                              </>
                            )}
                            {group && group.link && (
                              <SeeMore
                                href={group.link}
                                onClick={() => handleCallChild()}
                                target={
                                  group.link.includes("http")
                                    ? "_blank"
                                    : "_self"
                                }
                                text={t("home:seeMore")}
                                className="mt-3"
                                textClassName="!text-[14px] shrink-0 text-t2"
                              ></SeeMore>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-[24px]">
                          {item.group.map((cel) => (
                            <div
                              key={`children-item-${cel.id}`}
                              className="w-[200px]"
                            >
                              <div className="px-[10px]">
                                <div className="text-base mb-1 leading-[140%] font-bold text-t1">
                                  {t(cel.title)}
                                </div>
                                <div className="text-xs font-normal leading-[140%] text-t2">
                                  {t(cel.description)}
                                </div>
                              </div>
                              <div className="mt-4 text-[14px] flex flex-col gap-[2px] leading-[140%] text-t2">
                                {cel.links &&
                                  cel.links.map((link) => {
                                    return (
                                      <Link
                                        key={`link-item-${link.id}`}
                                        to={link.link || ""}
                                        onClick={() => handleCallChild()}
                                        target={
                                          link.link.includes("http")
                                            ? "_blank"
                                            : "_self"
                                        }
                                        rel={
                                          link.link.includes("http")
                                            ? "nofollow noopener noreferrer"
                                            : undefined
                                        }
                                        className="px-[12px] py-[8px] hover:bg-b3 text-t1 rounded-[8px] cursor-pointer"
                                      >
                                        {t(link.name)}
                                      </Link>
                                    );
                                  })}
                              </div>
                              {item.id === "Ecology" && (
                                <SeeMore
                                  href={EXTERNAL_LINKS.Bvi}
                                  onClick={() => handleCallChild()}
                                  text={t("home:seeMore")}
                                  className="mt-4 ml-[10px]"
                                  textClassName="!text-[14px] font-medium text-t1"
                                ></SeeMore>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
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
        {/* <CommonButton type="outline">
          {t("askAI")}
          <AiStar className="w-4 h-4 md:w-6 md:h-6"></AiStar>
        </CommonButton> */}
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
