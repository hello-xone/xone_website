import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";

import Arrow from "@/components/Icons/Arrow";

const CommonPopover = ({ text, children }: { text: string; children: ReactNode }) => {

    return (
        <Popover>
            {({ open }) => (
                <>
                    <PopoverButton
                        className={clsx(
                            `flex items-center px-[8px] gap-1 text-sm font-medium text-t1 h-10 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white`,
                            {
                                "bg-b2 rounded-[8px]": open,
                            }
                        )}
                    >
                        {text}
                        <Arrow className={clsx("text-t1", open && "rotate-180")}></Arrow>
                    </PopoverButton>
                    <PopoverPanel
                        transition
                        anchor="bottom start"
                        className="p-[24px] mt-6 relative z-[9999] rounded-[16px] bg-b2 text-t1 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                    >
                        {children}
                    </PopoverPanel>
                </>
            )}
        </Popover>
    );
};

export default CommonPopover;
