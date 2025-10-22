import { Popover, PopoverButton } from "@headlessui/react";
import clsx from "clsx";
import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";

import Arrow from "@/components/Icons/Arrow";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

const CommonPopover = forwardRef(
  (
    {
      text,
      children,
      menuId,
      activeMenuId,
      setActiveMenuId,
    }: {
      text: string;
      children: ReactNode;
      menuId?: string;
      activeMenuId?: string | null;
      setActiveMenuId?: (id: string | null) => void;
    },
    ref
  ) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { isLight } = useCurrentTheme();

    // 如果有传入 activeMenuId，则使用全局控制；否则使用本地状态
    const isOpen =
      menuId && activeMenuId !== undefined ? activeMenuId === menuId : false;

    useImperativeHandle(ref, () => ({
      close: () => {
        if (setActiveMenuId) {
          setActiveMenuId(null);
        }
      },
    }));

    const handleMouseEnter = () => {
      // 清除所有待执行的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = null;
      }

      // 添加短暂延迟，避免快速移动时频繁切换
      enterTimeoutRef.current = setTimeout(() => {
        if (setActiveMenuId && menuId) {
          setActiveMenuId(menuId);
        }
      }, 150);
    };

    const handleMouseLeave = () => {
      // 清除进入的定时器
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = null;
      }

      // 增加关闭延迟，给用户更多时间移动鼠标
      timeoutRef.current = setTimeout(() => {
        if (setActiveMenuId) {
          setActiveMenuId(null);
        }
      }, 100);
    };

    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Popover
          data-headlessui-state={isOpen ? "open" : "closed"}
          data-open={true}
        >
          <>
            <PopoverButton
              className={clsx(
                `flex gap-1 items-center h-10 text-sm font-medium rounded-[8px] px-[8px] text-t1 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white`,
                {
                  "bg-b2": isOpen,
                }
              )}
            >
              {text}
              <Arrow
                className={clsx(
                  "text-t1 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              ></Arrow>
            </PopoverButton>
          </>
        </Popover>
        <div
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(-8px)",
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
            transition: isOpen
              ? "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1), visibility 250ms"
              : "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1), visibility 200ms",
            pointerEvents: isOpen ? "auto" : "none",
          }}
          className={clsx(
            "absolute left-0 top-full px-[15px] py-[15px] mt-2 border border-solid z-[9999] rounded-[16px] bg-b1 text-t1",
            {
              "border-[#CDCDCD]": isLight,
              "border-[#404040]": !isLight,
            }
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default CommonPopover;
