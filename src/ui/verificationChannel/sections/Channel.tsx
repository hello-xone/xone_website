import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowIcon from "@/assets/svg/home/arrow-solid.svg?react";
import SearchIcon from "@/assets/svg/home/search-solid.svg?react";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

const Channel = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");
  const [searchValue, setSearchValue] = useState("");

  const { lg } = useTailwindBreakpoint();

  const platforms = [
    { value: "facebook", label: t("channel:facebook") },
    { value: "twitter", label: t("channel:twitter") },
    { value: "telegram", label: t("channel:telegram") },
    { value: "website", label: t("channel:website") },
    { value: "email", label: t("channel:email") },
    { value: "phone", label: t("channel:phone") },
    { value: "instagram", label: t("channel:instagram") },
    { value: "linkedin", label: t("channel:linkedin") },
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

  return (
    <Box className={`mt-3 ${lg ? "mb-40 h-96" : null}`}>
      <Box className={`${lg ? "pt-28" : "pt-4"}`}>
        <Box
          className={`font-black text-center text-[${lg ? "48px" : "32px"}] color-[--t1] ${lg ? "text-[48px]" : "text-[24px]"}`}
        >
          {t("channel:title")}
        </Box>
      </Box>

      <h3
        className={`${lg ? "mt-10" : "mt-4"} ${lg ? "text-center" : null} text-[${lg ? "20px" : "14px"}] text-[--t2] font-normal`}
        style={{
          lineHeight: lg ? undefined : "20px",
          letterSpacing: lg ? undefined : "0.03em",
        }}
      >
        {t("channel:description")}
      </h3>

      <Box
        className={`flex ${lg ? "flex-row" : "flex-col"} gap-12 justify-center ${lg ? "mt-8" : "mt-4"} ${lg ? "h-12" : "100%"}`}
      >
        <Select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          IconComponent={ArrowIcon}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "var(--b1)",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
                border: "1px solid var(--b3)",
                marginTop: "6px",
                "& .MuiList-root": {
                  padding: "0 !important",
                },
                "& .MuiMenuItem-root": {
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "var(--t2)",
                  padding: "12px 16px",
                  minHeight: "40px",
                  lineHeight: "1.4",
                  "&.Mui-selected": {
                    backgroundColor: "var(--b3) !important",
                    color: "var(--t1)",
                    fontWeight: 500,
                  },
                  "&:hover": {
                    backgroundColor: "var(--b3)",
                    color: "var(--t1)",
                  },
                },
              },
            },
          }}
          sx={{
            minWidth: lg ? 142 : "100%",
            minHeight: lg ? undefined : "40px",
            height: lg ? undefined : "40px",
            backgroundColor: "var(--b3)",
            borderRadius: "8px",
            color: "var(--t1)",
            fontWeight: 500,
            fontSize: "14px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSelect-select": {
              color: "var(--t1)",
            },
          }}
        >
          {platforms.map((platform) => (
            <MenuItem key={platform.value} value={platform.value}>
              {platform.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          placeholder={t("channel:searchPlaceholder")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          size="medium"
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: <SearchIcon className="ml-2" />,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              minWidth: lg ? 460 : "100%",
              height: lg ? "100%" : "40px",
              backgroundColor: "var(--b8)",
              borderRadius: "8px",
              color: "var(--t2)",
              fontWeight: 500,
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
            "& .MuiInputBase-input": {
              paddingLeft: "5px !important",
              fontSize: "16px",
              fontWeight: 400,
              color: "var(--t2)",
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
          size="large"
          sx={{
            marginTop: "1px",
            marginBottom: "1px",
            minWidth: lg ? undefined : "100%",
            minHeight: lg ? undefined : "40px",
            backgroundColor: "var(--primary) !important",
            borderRadius: "8px !important",
            color: "#FFF !important",
            fontWeight: "400 !important",
            padding: "0 6px !important",
            fontSize: "18px !important",
            cursor: "pointer !important",
            boxShadow: "none !important",
            outline: "none !important",
            border: "none !important",
            "&:focus": {
              outline: "none !important",
              border: "none !important",
              boxShadow: "none !important",
            },
            "&:active": {
              outline: "none !important",
              border: "none !important",
              boxShadow: "none !important",
            },
            "&.Mui-focused": {
              outline: "none !important",
              border: "none !important",
              boxShadow: "none !important",
            },
          }}
        >
          {t("channel:searchButton")}
        </Button>
      </Box>
    </Box>
  );
};

export default Channel;
