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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SeeMore } from "@/components/comm/link/SeeMore";
import Arrow from "@/components/Icons/Arrow";
import Close from "@/components/Icons/Close";
import Knight from "@/components/Icons/Knight";
import Language from "@/components/Icons/Language";
import Theme from "@/components/Icons/Theme";
import { menus, NavigationType } from "@/constants/menus";
import useApplicationStore from "@/store/applicationStore";

import LanguagePopover from "./LanguagePopover";

const MenuPopover = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });
    const { changeTheme } = useApplicationStore()

    const { t } = useTranslation("header");
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
        document.documentElement.setAttribute(
            "data-theme",
            theme === "light" ? "dark" : "light"
        );
        localStorage.setItem("theme", theme === "light" ? "dark" : "light");
        changeTheme()
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    return (
        <Popover className="xl:hidden">
            {({ open, close }) => (
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
                    <PopoverBackdrop className="fixed overflow-hidden inset-0 bg-black/15" />
                    <PopoverPanel
                        transition
                        anchor="bottom start"
                        className="p-[27.5px] h-[calc(100vh-98px)] w-[68vw] right-0 !left-[unset] mt-12 relative z-[9999] shadow-[0px_10px_32px_0px_#1F1F1F26] rounded-l-[16px] bg-b1 text-t1 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                    >
                        <div className="">
                            <div className="flex mb-4 items-center justify-end h-[24px]">
                                <Close
                                    className="text-[#8E8E92]"
                                    onClick={() => {
                                        setIsOpen(false)
                                        close()
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
                                                                                to={link.link || ""}
                                                                                target="_blank"
                                                                            >
                                                                                {t(link.name)}
                                                                            </Link>
                                                                        </div>
                                                                    ))}
                                                            </>
                                                        ) : (
                                                            <div>
                                                                <div className="w-full min-h-[72px] flex flex-col items-center justify-center rounded-[8px] bg-b3">
                                                                    <Knight className="text-t2 shrink-0"></Knight>
                                                                    <div className="text-t2 font-medium text-xs mt-[4px]">
                                                                        Look forward to it !
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2 text-t2 text-xs font-bold leading-[140%]">
                                                                    助力Xone未来动向，成就更大发展
                                                                </div>
                                                                <div className="mt-2 text-t2 text-xs leading-[140%]">{`一切工作都是为了帮助 Xone 更好的服务全球企业、组织以及个人。因此，在任何领域，只要你有想法并愿意为此贡献你的独到想法！我们相信，在 Xone 的成长之路上，将无畏即将面对的无数挑战。`}</div>
                                                                <SeeMore
                                                                    href=""
                                                                    text="寻找机会"
                                                                    className="mt-2"
                                                                    textClassName="!text-xs text-t2"
                                                                ></SeeMore>
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
                                <LanguagePopover buttonClass="!px-0 !gap-[10px]">
                                    <>
                                        <Language className="text-t1 w-6 h-6"></Language>
                                        <span className="text-t1 font-medium text-sm">English</span>
                                    </>
                                </LanguagePopover>
                                <div
                                    className="flex h-10 items-center"
                                    onClick={() => toggleTheme()}
                                >
                                    <Theme className="w-6 h-6 mr-[10px]"></Theme>
                                    <span className="text-t1 font-medium text-sm">
                                        {theme === "light" ? "Light" : "Dark"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </PopoverPanel>
                </>
            )}
        </Popover>
    );
};

export default MenuPopover;
