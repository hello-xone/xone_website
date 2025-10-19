import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SeeMore } from "@/components/comm/link/SeeMore";
import Arrow from "@/components/Icons/Arrow";
import Close from "@/components/Icons/Close";
import Language from "@/components/Icons/Language";
import Theme from "@/components/Icons/Theme";
import { getMenus } from "@/constants/menus";
import { langs, LanguageType } from "@/i18n/settings";
import useApplicationStore from "@/store/applicationStore";

import MobileLanguagePopover from "./MobileLanguagePopover";

const MenuPopover = () => {
  const [showLanguage, setShowLanguage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const latestOpenRef = useRef(isOpen);
  const needsUpdateRef = useRef(false);
  const { changeTheme, isLight } = useApplicationStore();

  const { t, i18n } = useTranslation("header");
  const toggleTheme = () => {
    document.documentElement.setAttribute(
      "data-theme",
      isLight ? "dark" : "light"
    );
    localStorage.setItem("theme", isLight ? "dark" : "light");
    changeTheme();
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
  }, [isOpen]);

  // 根据主题获取菜单配置
  const menus = useMemo(() => getMenus(isLight ? "light" : "dark"), [isLight]);

  const currentLanguage = useMemo(() => {
    const fallback = langs.find((item) => item.type === LanguageType.en);
    return (
      langs.find((item) => {
        return item.type === i18n.language;
      }) || fallback
    );
  }, [i18n.language]);

  useEffect(() => {
    if (needsUpdateRef.current) {
      needsUpdateRef.current = false;
      setIsOpen(latestOpenRef.current);
    }
  }, []);

  return (
    <>
      <Popover className="xl:hidden">
        {({ open, close }) => {
          // 先将状态存储在ref中，而不是直接更新
          if (latestOpenRef.current !== open) {
            latestOpenRef.current = open;
            needsUpdateRef.current = true;
            // 使用setTimeout在下一次事件循环中更新状态
            setTimeout(() => {
              setIsOpen(open);
            }, 0);
          }
          return (
            <>
              <PopoverButton
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                  `flex gap-1 items-center h-10 text-sm font-medium px-[8px] text-t1 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white`
                )}
              >
                <svg
                  width="18"
                  className="w-[18px] text-t1 h-[18px]"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 16H0V14H18V16ZM12 9H0V7H12V9ZM18 2H0V0H18V2Z"
                    fill="currentColor"
                  />
                </svg>
              </PopoverButton>
              <PopoverBackdrop className="fixed inset-0 bg-b1 opacity-70 backdrop-blur-[10px] z-[2] w-screen h-screen" />
              <PopoverPanel
                transition
                className="p-[20px] h-screen w-[68vw] !max-h-screen fixed overflow-y-auto right-0 !top-0 !left-[unset] z-[9999] shadow-[0px_10px_32px_0px_#1F1F1F26] rounded-l-[16px] bg-b1 text-t1 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
              >
                <div className="">
                  <div className="flex mb-4 items-center justify-end h-[24px]">
                    <Close
                      className="text-[#8E8E92]"
                      onClick={() => {
                        setIsOpen(false);
                        close();
                      }}
                    ></Close>
                  </div>
                  {menus &&
                    menus.map((item) => (
                      <Disclosure as="div" key={`h5-menu-${item.id}`}>
                        {({ open }) => (
                          <>
                            <DisclosureButton className="flex justify-between items-center w-full h-10 group">
                              <span className="font-medium">
                                {t(item.name)}
                              </span>
                              <Arrow
                                className={clsx(
                                  "w-5 h-5 transition-transform duration-200",
                                  open && "rotate-180"
                                )}
                              ></Arrow>
                            </DisclosureButton>
                            <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                              {item.group &&
                                item.group.map((group) => (
                                  <div
                                    className="mt-3"
                                    key={`h5-menu-${item.id}-group-${group.title}`}
                                  >
                                    <div className="text-t1 font-bold leading-[140%]">
                                      {t(group.title)}
                                    </div>
                                    <div className="text-t7 mb-3 text-xs mt-1 leading-[140%]">
                                      {t(group.description)}
                                    </div>
                                    {group.links && group.links.length > 0 ? (
                                      <>
                                        {group.links.map((link) => (
                                          <div
                                            className="h-[36px] text-t2 rounded-[8px] pl-[10px] flex items-center cursor-pointer hover:bg-b3"
                                            key={`h5-menu-${item.id}-link-${link.id}`}
                                          >
                                            <Link
                                              onClick={() => close()}
                                              to={link.link || ""}
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
                                            >
                                              {t(link.name)}
                                            </Link>
                                          </div>
                                        ))}
                                      </>
                                    ) : (
                                      <div>
                                        {group.mainIcon && (
                                          <div className="w-full min-h-[72px] flex flex-col items-center justify-center rounded-[8px]">
                                            <img
                                              alt={group.title}
                                              src={group.mainIcon}
                                              className="object-cover w-full h-full"
                                            ></img>
                                          </div>
                                        )}
                                        {group.detailTitle && (
                                          <div className="mt-2 text-t2 text-xs font-bold leading-[140%]">
                                            {group?.detailTitle
                                              ? t(group?.detailTitle)
                                              : ""}
                                          </div>
                                        )}

                                        {group?.detailDesc && (
                                          <div className="mt-2 text-t2 text-xs leading-[140%]">
                                            {group?.detailDesc
                                              ? t(group?.detailDesc)
                                              : ""}
                                          </div>
                                        )}
                                        {group.link && (
                                          <SeeMore
                                            href={group.link}
                                            target={
                                              group.link.includes("http")
                                                ? "_blank"
                                                : "_self"
                                            }
                                            text={t("home:seeMore")}
                                            className="mt-2"
                                            textClassName="!text-xs text-t2"
                                          ></SeeMore>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  <div className="mt-4 pt-4 border-t-[1px] border-solid border-border3">
                    <div
                      onClick={() => setShowLanguage(true)}
                      className={clsx(
                        `flex items-center h-10 text-sm font-medium rounded-[10px] gap-[10px] text-t1 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white`
                      )}
                    >
                      <Language className="w-6 h-6 text-t1"></Language>
                      <span className="text-sm font-medium text-t1">
                        {currentLanguage?.name || "English"}
                      </span>
                    </div>
                    <div
                      className="flex items-center h-10"
                      onClick={() => {
                        toggleTheme();
                        close();
                      }}
                    >
                      <Theme
                        isLight={isLight}
                        className="w-6 h-6 mr-[10px]"
                      ></Theme>
                      <span className="text-sm font-medium text-t1">
                        {isLight ? "Light" : "Dark"}
                      </span>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </>
          );
        }}
      </Popover>
      {showLanguage && (
        <MobileLanguagePopover
          close={() => setShowLanguage(false)}
          isOpen={showLanguage}
        ></MobileLanguagePopover>
      )}
    </>
  );
};

export default MenuPopover;
