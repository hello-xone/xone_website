import { Input } from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import CloseIcon from "@/assets/svg/recruitment/close.svg?react";
import SearchIcon from "@/assets/svg/recruitment/search-solid.svg?react";
import { Animation, AnimationType } from "@/components/comm/animation";
import CommonButton from "@/components/comm/button/CommonButton";

interface BannerProps {
  onSearch?: (value: string) => void;
  onClear?: () => void;
}

export const Banner = ({ onSearch, onClear }: BannerProps) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");

  // 处理搜索
  const handleSearch = async () => {
    if (!searchValue.trim()) {
      return;
    }

    try {
      onSearch?.(searchValue);
    } catch (error) {
      console.error("搜索失败:", error);
    }
  };

  // 处理清空搜索
  const handleClearSearch = () => {
    setSearchValue("");
    onClear?.();
  };

  return (
    <div className="md:h-[90vh]">
      <div className="relative w-full h-full">
        <div className="w-full h-full bg-cover bg-[center_bottom] hidden md:block"></div>
        <div className="flex flex-col mt-[20px] md:mt-0 p-4 text-left md:items-center md:justify-center md:text-center md:p-16 md:pb-30 md:absolute md:top-0 md:right-0 md:bottom-0 md:left-0">
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.1}>
            <h1
              className="font-bold leading-[1.4] text-[32px] text-[var(--t1)] md:text-[56px]"
              dangerouslySetInnerHTML={{ __html: t("recruitment:bannerTitle") }}
            />
          </Animation>
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.3}>
            <p className="text-[15px] md:text-[16px] lg:text-left lg:w-[1048px] text-[var(--t2)] leading-[1.5] md:text-[var(--t1)] mt-3 md:mt-8">
              {t("recruitment:bannerDesc")}
            </p>
          </Animation>
          <Animation animationClassName={AnimationType.SLIDE_IN_UP} delay={0.5}>
            <div className="flex flex-col gap-y-4 justify-center items-center mt-6 md:gap-x-4 md:flex-row md:mt-12 lg:mb-[140px]">
              <div className="relative group flex items-center w-full md:w-[460px] py-[0] md:py-[5px] px-[12px] bg-[var(--b3)] rounded-[8px] transition-all duration-100 border border-[transparent] hover:border-[var(--t1)] focus-within:border-[var(--t1)] focus-within:pr-[35px]">
                <SearchIcon className="w-[20px] h-[20px] text-[#A0A3A7] group-focus-within:text-[var(--t1)] transition-colors duration-100" />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t("recruitment:bannerSearchPlaceholder")}
                  className="block w-full h-[38px] text-[14px] md:text-[100%] ml-[5px] rounded-lg border-none bg-[transparent] text-[var(--t1)] placeholder:text-[var(--t3)] focus:outline-none focus:ring-0"
                />
                <div
                  className="w-[20px] h-[20px] absolute top-px bottom-px right-[10px] m-auto"
                  onClick={handleClearSearch}
                >
                  <CloseIcon className="w-[20px] h-[20px] hidden group-focus-within:block cursor-pointer" />
                </div>
              </div>
              <CommonButton
                className="rounded-[8px] w-full md:w-[140px] h-[40px] md:h-[45px]"
                onClick={handleSearch}
              >
                <span className="px-[24px] py-[3px] text-[var(--t5)] text-[18px] font-light text-white">
                  {t("recruitment:bannerSearchButton")}
                </span>
              </CommonButton>
            </div>
          </Animation>
        </div>
      </div>
    </div>
  );
};
