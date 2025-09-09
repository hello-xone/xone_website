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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
import RecruitmentIcon from "@/assets/imgs/header/recruitment.png";
import RecruitmentDarkIcon from "@/assets/imgs/header/recruitment-dark.png";
import { SeeMore } from "@/components/comm/link/SeeMore";
import Arrow from "@/components/Icons/Arrow";
import Close from "@/components/Icons/Close";
import Knight from "@/components/Icons/Knight";
import Language from "@/components/Icons/Language";
import Theme from "@/components/Icons/Theme";
import { menus, NavigationType } from "@/constants/menus";
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

    const DetailImg = useCallback(
        (detailId: string) => {
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
                    return isLight ? KnightIcon : KnightDarkIcon;
                case "global_grants":
                    return isLight ? GrantsIcon : GrantsDarkIcon;
                default:
                    return isLight ? KnightIcon : KnightDarkIcon;
            }
        },
        [isLight]
    );

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
                                    `flex items-center px-[8px] gap-1 text-sm font-medium text-t1 h-10 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white`
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
                                                <DisclosureButton className="group h-10 flex w-full items-center justify-between">
                                                    <span className="font-medium">{t(item.name)}</span>
                                                    <Arrow className="w-5 h-5 group-data-open:rotate-180"></Arrow>
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
                                                                {item.type === NavigationType.LINK ? (
                                                                    <>
                                                                        {group.links &&
                                                                            group.links.map((link) => (
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
                                                                                    >
                                                                                        {t(link.name)}
                                                                                    </Link>
                                                                                </div>
                                                                            ))}
                                                                    </>
                                                                ) : (
                                                                    <div>
                                                                        <div className="w-full min-h-[72px] flex flex-col items-center justify-center rounded-[8px] bg-b3">
                                                                            <img
                                                                                alt=""
                                                                                src={DetailImg(group.id)}
                                                                                className="w-[164px] h-[164px]"
                                                                            ></img>
                                                                        </div>
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
                                                                        {
                                                                            group.link && <SeeMore
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
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                </DisclosurePanel>
                                            </Disclosure>
                                            // <div key={`h5-menu-${item.id}`} className="">
                                            //     <div className="flex items-center text-t1 h-10 justify-between">
                                            //         <span className="font-medium">{t(item.name)}</span>
                                            //         <Arrow className="w-5 h-5"></Arrow>
                                            //     </div>
                                            //     {item.group &&
                                            //         item.group.map((group) => (
                                            //             <div
                                            //                 className="mt-3"
                                            //                 key={`h5-menu-${item.id}-group-${group.title}`}
                                            //             >
                                            //                 <div className="text-t1 font-bold leading-[140%]">
                                            //                     {t(group.title)}
                                            //                 </div>
                                            //                 <div className="text-t7 mb-3 text-xs mt-1 leading-[140%]">
                                            //                     {t(group.description)}
                                            //                 </div>
                                            //                 {group.links &&
                                            //                     group.links.map((link) => (
                                            //                         <div
                                            //                             className="h-[36px] rounded-[8px] pl-[10px] flex items-center cursor-pointer hover:bg-b3"
                                            //                             key={`h5-menu-${item.id}-link-${link.id}`}
                                            //                         >
                                            //                             <Link to={link.link || ""} target="_blank">
                                            //                                 {t(link.name)}
                                            //                             </Link>
                                            //                         </div>
                                            //                     ))}
                                            //             </div>
                                            //         ))}
                                            // </div>
                                        ))}
                                    <div className="mt-4 pt-4 border-t-[1px] border-solid border-border3">
                                        <div
                                            onClick={() => setShowLanguage(true)}
                                            className={clsx(
                                                `flex items-center rounded-[10px] gap-[10px] text-sm font-medium text-t1 h-10 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white`
                                            )}
                                        >
                                            <Language className="text-t1 w-6 h-6"></Language>
                                            <span className="text-t1 font-medium text-sm">
                                                {currentLanguage?.name || "English"}
                                            </span>
                                        </div>
                                        <div
                                            className="flex h-10 items-center"
                                            onClick={() => {
                                                toggleTheme();
                                                close();
                                            }}
                                        >
                                            <Theme
                                                isLight={isLight}
                                                className="w-6 h-6 mr-[10px]"
                                            ></Theme>
                                            <span className="text-t1 font-medium text-sm">
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
