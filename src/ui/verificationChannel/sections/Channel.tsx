import { Input } from "@headlessui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import CloseIcon from "@/assets/svg/recruitment/close.svg?react";
import SearchIcon from "@/assets/svg/recruitment/search-solid.svg?react";
import CommonButton from "@/components/comm/button/CommonButton";
import { SearchInputSelect } from "@/components/comm/select/SearchInputSelect";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

const Channel = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState("website");
  const [searchValue, setSearchValue] = useState("");

  const { lg } = useTailwindBreakpoint();

  const platforms = [
    { value: "website", label: t("channel:website") },
    { value: "email", label: t("channel:email") },
    { value: "telegram", label: t("channel:telegram") },
    { value: "x", label: t("channel:x") },
    { value: "youtube", label: t("channel:youtube") },
    { value: "medium", label: t("channel:medium") },
    { value: "discord", label: t("channel:discord") },
    { value: "github", label: t("channel:github") },
    { value: "chatme", label: t("channel:chatme") },
    { value: "reddit", label: t("channel:reddit") },
  ];

  const handleSearch = () => {
    if (!searchValue.trim()) {
      return;
    }

    // TODO: 实现验证逻辑
    console.log("验证查询:", {
      platform: selectedPlatform,
      value: searchValue,
    });

    // 这里可以调用API进行验证
    // 显示验证结果
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className={`mt-3 ${lg ? "mb-40 h-96" : null}`}>
      <div className={`${lg ? "pt-28" : "pt-4"}`}>
        <div
          className={`font-black text-center text-[${lg ? "48px" : "32px"}] color-[--t1] ${lg ? "text-[48px]" : "text-[24px]"}`}
        >
          {t("channel:title")}
        </div>
      </div>

      <h3
        className={`${lg ? "mt-10" : "mt-4"} ${lg ? "text-center" : null} text-[${lg ? "20px" : "14px"}] text-[--t2] font-normal`}
        style={{
          lineHeight: lg ? undefined : "20px",
          letterSpacing: lg ? undefined : "0.03em",
        }}
      >
        {t("channel:description")}
      </h3>

      <div
        className={`flex ${lg ? "flex-row" : "flex-col"} gap-12 justify-center ${lg ? "mt-8" : "mt-4"} ${lg ? "h-12" : "100%"}`}
      >
        <div
          className={`${lg ? "min-w-[150px]" : "w-full"} ${lg ? "" : "min-h-[40px] h-[40px] font-medium"} bg-[var(--b3)] rounded-[8px] text-[var(--t1)] text-[14px]`}
        >
          <SearchInputSelect
            options={platforms}
            defaultValue={platforms[0].value}
            onSelect={(value, option) => console.log(value, option)}
            placeholder={t("channel:selectPlaceholder")}
          />
        </div>

        <div className="relative group flex items-center w-full md:w-[460px] py-[0] md:py-[5px] px-[12px] bg-[var(--b3)] rounded-[8px] transition-all duration-100 border border-[transparent] hover:border-[var(--t1)] focus-within:border-[var(--t1)] focus-within:pr-[35px]">
          <SearchIcon className="w-[20px] h-[20px] text-[#A0A3A7] group-focus-within:text-[var(--t1)] transition-colors duration-100" />
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("channel:searchPlaceholder")}
            className="block w-full h-[38px] text-[14px] md:text-[100%] ml-[5px] rounded-lg border-none bg-[transparent] text-[var(--t1)] placeholder:text-[var(--t3)] focus:outline-none focus:ring-0"
            onKeyPress={handleKeyPress}
          />
          <div
            className="w-[20px] h-[20px] absolute top-px bottom-px right-[10px] m-auto"
            onClick={handleClearSearch}
          >
            <CloseIcon className="w-[20px] h-[20px] hidden group-focus-within:block cursor-pointer" />
          </div>
        </div>

        <CommonButton
          onClick={handleSearch}
          type="primary"
          className={`rounded-[8px] text-[18px] ${lg ? null : "min-w-[100%]"} ${lg ? null : "h-[40px]"}`}
        >
          {t("channel:verificationButton")}
        </CommonButton>
      </div>
    </div>
  );
};

export default Channel;
