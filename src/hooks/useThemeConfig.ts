import { useMemo } from "react";
import { ThemeOptions } from "@mui/material";

export const useThemeConfig = () => {
  const themeConfig: ThemeOptions = useMemo(() => {
    return {
      breakpoints: {
        values: {
          xs: 375,
          sm: 600,
          md: 1024,
          lg: 1440,
          xl: 1920,
        },
      },
      components: {
        MuiList: {
          styleOverrides: {
            root: {
              paddingTop: 0,
              paddingBottom: 0,
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              padding: 0,
              fontSize: "14px",
              lineHeight: "14px",
              ":hover": {
                backgroundColor: "transparent",
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: "8px",
              borderColor: "transparent",
              border: "none",
              color: "#666",

              padding: "2px 2px 2px 4px",
              fontSize: "16px",
              borderWidth: "0!important",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&.MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent!important",
              },
              "&.Mui-disabled": {
                backgroundColor: "#E0E0E0",
              },
              "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            },
            input: {
              padding: "6px 10px!important",
              fontSize: "16px",
              lineHeight: "16px",
            },
            multiline: {
              padding: 0,
            },
          },
          variants: [
            {
              props: { size: "small" },
              style: {
                borderRadius: "6px",
                input: {
                  padding: "6px 8px",
                  fontSize: "12px",
                },
              },
            },
            {
              props: { role: "round" },
              style: {
                borderRadius: "22px",
              },
            },
            {
              props: { role: "round", size: "small" },
              style: {
                borderRadius: "15px",
              },
            },
          ],
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              height: "max-content!important",
              background: "transparent!important",
              padding: "4px 2px 4px 4px!important",
              borderRadius: "8px!important",
              "&:hover": {
                background: "transparent!important",
              },
              "&:focus": {
                background: "transparent!important",
              },
              "&::before": {
                display: "none!important",
              },
              "&::after": {
                display: "none!important",
              },
            },
            input: {
              height: "44px!important",
              borderRadius: "6px!important",
              padding: "18px 0 6px 12px!important",
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            filled: {
              color: "#666666",
              fontSize: "20px",
              lineHeight: "20px",
              top: "2px",
              "&.Mui-focused": {
                color: "#666666",
                fontSize: "16px",
                lineHeight: "16px",
              },
              "&.MuiInputLabel-shrink": {
                left: "4px",
                top: "5px",
                fontSize: "16px",
                lineHeight: "16px",
              },
            },
          },
        },
      },
    };
  }, []);

  return {
    themeConfig,
  };
};
