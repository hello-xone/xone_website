import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";

import Arrow from "@/components/Icons/Arrow";

const CommonPopover = ({
    text,
    children,
}: {
    text: string;
    children: ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover
            data-headlessui-state={isOpen ? "open" : "closed"}
            data-open={true}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <>
                <PopoverButton
                    className={clsx(
                        `flex items-center px-[8px] gap-1 text-sm font-medium text-t1 h-10 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white`,
                        {
                            "bg-b2 rounded-[8px]": isOpen,
                        }
                    )}
                >
                    {text}
                    <Arrow
                        className={clsx(
                            "text-t1 transition-transform",
                            isOpen && "transition-transform rotate-180"
                        )}
                    ></Arrow>
                </PopoverButton>
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <PopoverPanel
                        transition
                        anchor="bottom start"
                        className="p-[24px] mt-6 relative z-[9999] rounded-[16px] bg-b2 text-t1 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                    >
                        {children}
                    </PopoverPanel>
                </Transition>
            </>
        </Popover>
    );
};

export default CommonPopover;
