import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import ArrowIcon from "@/assets/svg/home/arrow-solid.svg?react";
import SearchIcon from "@/assets/svg/home/search-solid.svg?react";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

// 基础选项接口
interface BaseOption {
  value: string;
  label: string;
}

// 分组选项接口
interface GroupOption {
  group: string;
  label: string;
  options: BaseOption[];
}

// 组件属性接口
interface Props {
  options: (BaseOption | GroupOption)[];
  placeholder?: string;
  onSelect?: (value: string, option: BaseOption | GroupOption) => void;
  defaultValue?: string;
  maxOpentions?: number | null;
  resetOnClose?: boolean; // 新增：是否在关闭时重置状态
}

export const SearchInputSelect = ({
  options,
  placeholder,
  onSelect,
  defaultValue = "all",
  maxOpentions = null,
  resetOnClose = false,
}: Props) => {
  const { t } = useTranslation();

  const { isLight } = useCurrentTheme();
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 安全关闭下拉框的函数
  const safeCloseDropdown = useCallback(() => {
    // 清除之前的定时器
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    // 关闭下拉框
    setIsOpen(false);

    // 根据 resetOnClose 参数决定是否重置状态
    if (resetOnClose) {
      setSearchTerm("");
      setExpandedGroups(new Set());
    }
  }, [resetOnClose]);

  // 过滤选项（支持搜索）
  const getFilteredOptions = useCallback(() => {
    if (!searchTerm) return options;

    return options
      .map((option) => {
        if ("group" in option) {
          // 过滤分组内的选项
          const filteredSubOptions = option.options.filter(
            (subOpt: BaseOption) =>
              subOpt.label.toLowerCase().includes(searchTerm.toLowerCase())
          );
          return filteredSubOptions.length > 0
            ? { ...option, options: filteredSubOptions }
            : null;
        } else {
          // 过滤基础选项
          return option.label.toLowerCase().includes(searchTerm.toLowerCase())
            ? option
            : null;
        }
      })
      .filter(Boolean);
  }, [searchTerm, options]);

  // 计算选项数量
  const getOptionCount = useCallback(() => {
    const filteredOptions = getFilteredOptions();
    let count = 0;

    for (const option of filteredOptions) {
      if (option && "group" in option) {
        // 分组选项：计算分组标题 + 子选项数量
        count += 1 + option.options.length;
      } else if (option) {
        // 基础选项
        count += 1;
      }
    }

    return count;
  }, [getFilteredOptions]);

  // 计算下拉框位置
  const calculateDropdownPosition = useCallback(() => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // 计算位置 - 始终向下展开
    const top = buttonRect.bottom + 8; // 8px gap

    // 修复水平滚动时的定位问题
    // 确保下拉菜单不会超出视口边界
    let left = buttonRect.left;
    const dropdownWidth = Math.max(buttonRect.width, 200); // 最小宽度200px

    // 如果下拉菜单会超出右边界，则向左调整
    if (left + dropdownWidth > viewportWidth - 16) {
      left = viewportWidth - dropdownWidth - 16;
    }

    // 如果下拉菜单会超出左边界，则向右调整
    if (left < 16) {
      left = 16;
    }

    setDropdownPosition({
      top,
      left,
      width: buttonRect.width,
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        // 强制关闭下拉框
        safeCloseDropdown();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        // ESC键关闭下拉框
        safeCloseDropdown();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        // 触摸事件也关闭下拉框
        safeCloseDropdown();
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("touchstart", handleTouchStart);

    if (isOpen) {
      window.addEventListener("scroll", handleScroll, true); // 监听所有滚动事件
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, safeCloseDropdown, calculateDropdownPosition]);

  // 当下拉框打开时计算位置
  useEffect(() => {
    if (isOpen) {
      calculateDropdownPosition();
    }
  }, [isOpen, calculateDropdownPosition]);

  // 监听滚动事件，重新计算位置
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      calculateDropdownPosition();
    };

    const handleResize = () => {
      // 设备变化时强制关闭下拉框
      safeCloseDropdown();
    };

    const handleOrientationChange = () => {
      // 设备方向变化时强制关闭下拉框
      safeCloseDropdown();
    };

    // 页面失去焦点时关闭下拉框
    const handleVisibilityChange = () => {
      if (document.hidden && isOpen) {
        safeCloseDropdown();
      }
    };

    // 监听设备变化 - PC端更改为移动端
    const handleDeviceChange = () => {
      console.log("XX");
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile && isOpen) {
        // 从PC端切换到移动端时关闭下拉框
        safeCloseDropdown();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 添加媒体查询监听 - 监听PC端到移动端的变化
    const mobileMediaQuery = window.matchMedia("(max-width: 768px)");
    mobileMediaQuery.addEventListener("change", handleDeviceChange);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mobileMediaQuery.removeEventListener("change", handleDeviceChange);
    };
  }, [isOpen, calculateDropdownPosition, safeCloseDropdown]);

  // 组件卸载时确保关闭下拉框
  useEffect(() => {
    const timeout = closeTimeoutRef.current;
    return () => {
      safeCloseDropdown();
      // 清理定时器
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [safeCloseDropdown]);

  // 获取选中项的显示标签
  const getSelectedLabel = () => {
    for (const option of options) {
      if ("group" in option) {
        // 分组选项
        const found = option.options.find(
          (opt: BaseOption) => opt.value === selected
        );
        if (found) return found.label;
      } else {
        // 基础选项
        if (option.value === selected) return option.label;
      }
    }
    return placeholder || t("recruitment:selectPlaceholder");
  };

  // 处理选项选择
  const handleOptionSelect = (option: BaseOption | GroupOption) => {
    if ("group" in option) {
      // 如果是分组，切换展开状态
      const newExpandedGroups = new Set(expandedGroups);
      if (newExpandedGroups.has(option.group)) {
        newExpandedGroups.delete(option.group);
      } else {
        newExpandedGroups.add(option.group);
      }
      setExpandedGroups(newExpandedGroups);
      return;
    }

    // 立即关闭下拉框，避免幻影
    safeCloseDropdown();
    setSelected(option.value);

    // 选择选项后清除搜索词，方便下次使用
    setSearchTerm("");

    if (onSelect) {
      onSelect(option.value, option);
    }
  };

  // 处理子选项选择
  const handleSubOptionSelect = (
    subOption: BaseOption,
    parentOption: GroupOption
  ) => {
    // 立即关闭下拉框，避免幻影
    safeCloseDropdown();
    setSelected(subOption.value);

    if (onSelect) {
      onSelect(subOption.value, { ...subOption, group: parentOption.group });
    }
  };

  // 动态获取元素高度
  const getElementHeight = (element: HTMLElement | null): number => {
    if (!element) return 0;
    const rect = element.getBoundingClientRect();
    return rect.height;
  };

  // 计算动态最大高度样式
  const getMaxHeightStyle = () => {
    if (maxOpentions === null || maxOpentions <= 0) {
      return {
        maxHeight: "300px",
        "@media (min-width: 768px)": {
          maxHeight: "500px",
        },
      };
    }

    const optionCount = getOptionCount();
    if (optionCount <= maxOpentions) {
      return {
        maxHeight: "300px",
        "@media (min-width: 768px)": {
          maxHeight: "500px",
        },
      };
    }

    const firstOptionElement = dropdownRef.current?.querySelector(
      ".option-item-select"
    ) as HTMLElement;

    const optionHeight = getElementHeight(firstOptionElement) || 40;

    const maxHeight = maxOpentions * optionHeight;

    return {
      maxHeight: `${Math.min(maxHeight, 500)}px`,
    };
  };

  // 渲染选项
  const renderOption = (option: BaseOption | GroupOption, index: number) => {
    if ("group" in option) {
      const isExpanded = expandedGroups.has(option.group);

      return (
        <div key={`${option.group}-${index}`} className="mb-2">
          {/* 分组标题 - 可点击展开/收起 */}
          <div
            className="px-3 py-2 text-sm font-medium cursor-pointer rounded-[6px] flex items-center justify-between transition-colors duration-200"
            onClick={() => handleOptionSelect(option)}
          >
            <span className="text-[var(--t1)] flex-1 min-w-0">
              {option.label}
            </span>
            <ArrowIcon
              className={clsx(
                "flex-shrink-0 w-5 h-5 transition-transform duration-200 text-[var(--t2)]",
                isExpanded ? "rotate-180" : ""
              )}
            />
          </div>

          {/* 子选项 - 根据展开状态显示/隐藏 */}
          {isExpanded && (
            <div className="mt-1">
              {option.options.map((subOption, subIndex) => (
                <div
                  key={`${subOption.value}-${subIndex}`}
                  className={clsx(
                    "relative cursor-pointer rounded-[6px] text-[13px] select-none py-[6px] pl-[20px] mx-2 transition-colors duration-200",
                    subOption.value === selected
                      ? isLight
                        ? "bg-[var(--b3)]"
                        : "bg-[var(--b6)] text-[var(--b1)]" +
                          " hover:text-[var(--b1)]"
                      : "text-[var(--t3)]"
                  )}
                  onClick={() => handleSubOptionSelect(subOption, option)}
                >
                  <span className="block font-normal truncate">
                    {subOption.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else {
      // 渲染基础选项
      return (
        <div
          key={option.value}
          className={clsx(
            "option-item-select relative cursor-pointer rounded-[6px] text-[13px] select-none py-[8px] px-[13px] transition-colors duration-200",
            option.value === selected
              ? isLight
                ? "bg-[var(--b3)]"
                : "bg-[var(--b6)] text-[var(--b1)]" + " hover:text-[var(--b1)]"
              : "text-[var(--t3)]"
          )}
          onClick={() => handleOptionSelect(option)}
        >
          <span className="block font-normal truncate">{option.label}</span>
        </div>
      );
    }
  };

  return (
    <div className="relative flex-1 h-full" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        className="relative w-full h-full cursor-pointer rounded-[8px] bg-[var(--b3)] px-[12px] py-[10px] text-left border border-[transparent] border-solid hover:border-[var(--t1)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block font-normal text-[14px] md:text-[15px] truncate text-[var(--t3)]">
          {getSelectedLabel()}
        </span>
        <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
          <ArrowIcon
            className={clsx(
              "w-5 h-5 transition-transform duration-200 text-[var(--t2)]",
              isOpen ? "rotate-180" : ""
            )}
          />
        </span>
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="dropdown-container fixed z-4 overflow-hidden rounded-[8px] bg-[var(--b9)] p-2 md:p-[10px] text-base shadow-[0px_0px_10px_0px_#00000014]"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              maxHeight: `${window.innerHeight - dropdownPosition.top - 16}px`,
            }}
          >
            {/* 搜索框 */}
            <div className="search-box sticky top-0 mb-2 md:mb-[10px] rounded-[8px] h-8 md:h-[32px] px-2 md:px-[10px] py-2 md:py-[16px] border-[var(--b3)] flex items-center border-solid border">
              <SearchIcon className="w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder={t("recruitment:searchSelectInputPlaceholder")}
                value={searchTerm}
                className="w-full font-normal text-xs md:text-sm ml-2 md:ml-[6px] rounded border-none bg-[transparent] text-[var(--t1)] placeholder:text-[var(--t3)] focus:outline-none focus:ring-0"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 选项列表 */}
            <div
              className="overflow-y-auto custom-select-scrollbar"
              style={getMaxHeightStyle()}
            >
              {getFilteredOptions().map(
                (option, index) => option && renderOption(option, index)
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
