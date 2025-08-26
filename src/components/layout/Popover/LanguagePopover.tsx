import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";
import i18next from "i18next";
import { ReactNode, useMemo } from "react";
import { useCookies } from "react-cookie";

import { changeLanguage } from "@/i18n";
import { cookieName, langs, LanguageType } from "@/i18n/settings";

const LanguagePopover = ({ children, className, buttonClass }: { children: ReactNode; className?: string; buttonClass?: string }) => {
    const [_, setCookies] = useCookies();

    const handleChangeLanguage = async (type: LanguageType) => {
        await changeLanguage(type);
        setCookies(cookieName, type);
    };

    const currentLanguage = useMemo(() => {
        const fallback = langs.find((item) => item.type === LanguageType.en);
        return (
            langs.find((item) => {
                return item.type === i18next.language;
            }) || fallback
        );
    }, []);
    return (
        <Popover className={className ? className : ''}>
            {({ open }) => (
                <>
                    <PopoverButton
                        className={clsx(
                            `flex items-center px-[8px] gap-1 text-sm font-medium text-t1 h-10 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white ${buttonClass ? buttonClass : ''}`,
                            {
                                "bg-b2 rounded-[8px]": open,
                            }
                        )}
                    >
                        {children}
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        anchor="bottom"
                        className="p-[24px] mt-6 relative z-[9999] rounded-[16px] bg-b2 text-t2 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                    >
                        <div>
                            {langs &&
                                langs.map((el) => (
                                    <div
                                        onClick={() => handleChangeLanguage(el.type)}
                                        className={clsx(`px-[10px] py-[8px] hover:text-t1 hover:bg-b3 rounded-[8px] cursor-pointer`, {
                                            'bg-b3 text-t1': currentLanguage?.type === el.type,
                                        })}
                                        key={`lang-item-${el.name}`}
                                    >
                                        {el.name}
                                    </div>
                                ))}
                        </div>
                    </PopoverPanel>
                </>
            )}
        </Popover>
    );
};

export default LanguagePopover;
