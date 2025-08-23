import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";

import ArrowIcon from "@/assets/svg/home/arrow-solid.svg?react";
import SearchIcon from "@/assets/svg/home/search-solid.svg?react";
import { useTailwindBreakpoint } from "@/hooks/useTailwindBreakpoint";

const Channel = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");
  const [searchValue, setSearchValue] = useState("");

  const { lg } = useTailwindBreakpoint();

  const platforms = [
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "telegram", label: "Telegram" },
    { value: "website", label: "Website" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
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
          官方验证通道
        </Box>
      </Box>

      <h3
        className={`${lg ? "mt-10" : "mt-4"} ${lg ? "text-center" : null} text-[${lg ? "20px" : "14px"}] text-[--t2] font-normal`}
        style={{
          lineHeight: lg ? undefined : "20px",
          letterSpacing: lg ? undefined : "0.03em",
        }}
      >
        远离诈骗，输入网址、邮箱地址、手机号、Telegram或社交媒体账号，
        检查来源是否经过验证并来自Xone官方。
      </h3>

      <Box
        className={`flex ${lg ? "flex-row" : "flex-col"} gap-12 justify-center ${lg ? "mt-8" : "mt-4"} ${lg ? "h-12" : "100%"}`}
      >
        <Select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          label="Select"
          IconComponent={ArrowIcon}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "var(--b1)",
                borderRadius: "12px",
                boxShadow: "none",
                border: "1px solid var(--b4)",
                marginTop: "8px",
                "& .MuiMenuItem-root": {
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "var(--t1)",
                  padding: "16px 20px",
                  minHeight: "48px",
                  "&.Mui-selected": {
                    backgroundColor: "var(--primary)",
                    color: "var(--b1)",
                  },
                  "&:hover": {
                    backgroundColor: "var(--primary)",
                    color: "var(--b1)",
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
            color: "var(--t2)",
            fontWeight: 400,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
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
          placeholder="Search"
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
          查询
        </Button>
      </Box>
    </Box>
  );
};

export default Channel;
