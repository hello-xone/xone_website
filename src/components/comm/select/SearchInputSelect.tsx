import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
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
}

export const SearchInputSelect = ({
  options,
  placeholder,
  onSelect,
  defaultValue = "all",
  maxOpentions = null,
}: Props) => {
  const { t } = useTranslation();

  const { isLight } = useCurrentTheme();
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

    setSelected(option.value);
    setIsOpen(false);
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
    setSelected(subOption.value);
    setIsOpen(false);
    setSearchTerm("");

    if (onSelect) {
      onSelect(subOption.value, { ...subOption, group: parentOption.group });
    }
  };

  // 过滤选项（支持搜索）
  const getFilteredOptions = () => {
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
  };

  // 计算选项数量
  const getOptionCount = () => {
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
            <span className="text-[var(--t1)]">{option.label}</span>
            <ArrowIcon
              className={clsx(
                "w-4 h-4 transition-transform duration-200 text-[var(--t2)]",
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
        type="button"
        className="relative w-full h-full cursor-pointer rounded-[8px] bg-[var(--b3)] px-[12px] py-[10px] text-left border border-[transparent] border-solid hover:border-[var(--t1)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block text-[15px] truncate text-[var(--t3)]">
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
      {isOpen && (
        <div className="dropdown-container absolute z-10 mt-2 md:mt-3 w-full overflow-hidden rounded-[8px] bg-[var(--b9)] p-2 md:p-[10px] text-base shadow-[0px_0px_10px_0px_#00000014]">
          {/* 搜索框 */}
          <div className="search-box sticky top-0 mb-2 md:mb-[10px] rounded-[8px] h-8 md:h-[32px] px-2 md:px-[10px] py-2 md:py-[16px] border-[var(--b3)] flex items-center border-solid border">
            <SearchIcon className="w-4 h-4 md:w-5 md:h-5" />
            <input
              type="text"
              placeholder={t("recruitment:searchSelectInputPlaceholder")}
              value={searchTerm}
              className="w-full text-xs md:text-sm ml-2 md:ml-[6px] rounded border-none bg-[transparent] text-[var(--t1)] placeholder:text-[var(--t3)] focus:outline-none focus:ring-0"
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
        </div>
      )}
    </div>
  );
};
