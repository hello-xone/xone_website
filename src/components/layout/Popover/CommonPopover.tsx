import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import clsx from "clsx";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

import Arrow from "@/components/Icons/Arrow";

const CommonPopover = forwardRef(({
    text,
    children
}: {
    text: string;
    children: ReactNode;
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        close: () => {
            setIsOpen(false)
        }
    }));

    return <Popover
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
                    className="p-[24px] mt-6 shadow-[0px_10px_32px_0px_#1F1F1F1A]  relative z-[9999] rounded-[16px] bg-b2 text-t1 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                >
                    {children}
                </PopoverPanel>
            </Transition>
        </>
    </Popover>;
});

// const CommonPopover = ({
//     text,
//     children,
// }: {
//     text: string;
//     children: ReactNode;
// }) => {
//     const [isOpen, setIsOpen] = useState(false);
//   // 定义暴露给父组件的方法
//   useImperativeHandle(ref, () => ({
//     // 暴露给父组件的方法
//     childMethod: () => {
//       console.log('子组件方法被调用');
//       internalMethod(); // 可以调用内部方法
//     },
//     // 可以暴露多个方法
//     anotherMethod: (param) => {
//       console.log('接收参数：', param);
//     }
//   }));
//     return (

//     );
// };

export default CommonPopover;
