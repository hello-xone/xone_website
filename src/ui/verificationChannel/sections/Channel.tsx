import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
} from "@headlessui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Api_Verification } from "@/api/verification";
import CloseIcon from "@/assets/svg/recruitment/close.svg?react";
import SearchIcon from "@/assets/svg/recruitment/search-solid.svg?react";
import CommonButton from "@/components/comm/button/CommonButton";
import { SearchInputSelect } from "@/components/comm/select/SearchInputSelect";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

const Channel = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState("website");
  const [searchValue, setSearchValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [verifiedInfo, setVerifiedInfo] = useState({
    title: "",
    message: "",
    verified: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleSearch = useCallback(async () => {
    if (!searchValue.trim() || isLoading) {
      return;
    }

    // 清除之前的定时器
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 设置防抖定时器，500ms 内只能执行一次
    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const { data } = await Api_Verification.verify({
          category: selectedPlatform,
          value: searchValue,
        });
        const verified = data.verified;
        setIsDialogOpen(true);
        setVerifiedInfo({
          title: verified
            ? t("channel:dialog.verified")
            : t("channel:dialog.unverified"),
          message: verified
            ? t("channel:dialog.verifiedMessage")
            : t("channel:dialog.unverifiedMessage"),
          verified,
        });
      } catch (error) {
        console.error("Verification failed:", error);
      } finally {
        setIsLoading(false);
      }
    }, 200);
  }, [searchValue, selectedPlatform, isLoading, t]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    const n = setTimeout(() => {
      setVerifiedInfo({
        title: "",
        message: "",
        verified: false,
      });
      clearTimeout(n);
    }, 1000);
  };

  return (
    <div className={`mt-3 ${lg ? "mb-40 h-96" : null}`}>
      <div className={`${lg ? "pt-28" : "pt-4"}`}>
        <div
          className={`font-bold text-center text-[${lg ? "48px" : "32px"}] color-[--t1] ${lg ? "text-[48px]" : "text-[24px]"}`}
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
            onSelect={(value) => setSelectedPlatform(value)}
            placeholder={t("channel:selectPlaceholder")}
            maxOpentions={4}
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
          className={`rounded-[8px] text-[18px] ${lg ? null : "min-w-[100%]"} ${lg ? null : "h-[40px]"} ${isLoading ? "cursor-not-allowed" : ""}`}
        >
          {t("channel:verificationButton")}
        </CommonButton>
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        transition
        className="flex fixed inset-0 z-50 justify-center items-center p-4 w-screen backdrop-blur-sm transition duration-300 ease-out bg-black/50 data-closed:opacity-0"
      >
        <DialogPanel className="relative p-8 mx-4 space-y-6 w-full max-w-md rounded-2xl border shadow-2xl transition-all duration-300 ease-out transform bg-b1 border-border1 data-closed:scale-95 data-closed:opacity-0">
          <button
            onClick={handleCloseDialog}
            className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 text-t3 hover:text-t1 hover:bg-b3 active:scale-95"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          <div className="flex justify-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                verifiedInfo.verified
                  ? "bg-t10/10 border-2 border-[var(--t10)]"
                  : "bg-t8/10 border-2 border-[var(--t8)]"
              }`}
            >
              {verifiedInfo.verified ? (
                <svg
                  className="w-8 h-8 text-t10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-t8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
          </div>

          <DialogTitle
            className={`text-center text-xl font-bold transition-colors duration-300 ${
              verifiedInfo.verified ? "text-t10" : "text-t8"
            }`}
          >
            {verifiedInfo.title}
          </DialogTitle>

          <Description className="text-base leading-relaxed text-center text-t2">
            {verifiedInfo.message}
          </Description>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default Channel;
