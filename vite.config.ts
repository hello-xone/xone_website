import react from "@vitejs/plugin-react";
import { resolve } from "path";
import copy from "rollup-plugin-copy";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

// @ts-ignore
import seoPrerender from "./prerender.js";

const r = (p: string) => resolve(__dirname, p);

const isProduction = process.env.NODE_ENV !== "development";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const isPro = mode === "production";
  const isBuild = command === "build";
  return {
    resolve: {
      alias: {
        "@": r("./src"),
      },
    },
    // esbuild: {
    //   drop: isPro && isBuild ? ["console", "debugger"] : [],
    // },
    build: {
      minify: isProduction,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: isProduction
            ? {
              react: [
                "react",
                "react-dom",
                "react-router-dom",
                "react-helmet-async",
              ],
              i18next: ["i18next", "react-i18next"],

              mui: [
                "@mui/material",
                // "@mui/lab",
                "@emotion/react",
                "@emotion/styled",
              ],
              // ethers: ["ethers"],
              swiper: ["swiper"],
              dayjs: ["dayjs"],
              tailwindcss: ["tailwindcss"],
            }
            : void 0,
        },
      },
    },
    assetsInclude: ["**/*.pag"],
    server: {
      host: true,
      proxy: {
        "/nftscan": {
          target: "http://192.168.2.35:9611",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/nftscan/, ""),
        },
        "/xoScan": {
          target: "https://xscscan.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/xoScan/, ""),
        },
      },
    },
    plugins: [
      seoPrerender(["/", "/developer", "/commercial", "/404"]),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        workbox: {
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        },
      }),
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
      copy({
        targets: [
          {
            src: "./node_modules/libpag/lib/libpag.wasm",
            dest: process.env.NODE_ENV === "production" ? "dist/" : "public/",
          },
        ],
        hook:
          process.env.NODE_ENV === "production" ? "writeBundle" : "buildStart",
      }),
      nodePolyfills({
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
      }),
      svgr(),
    ],
    css: {
      preprocessorOptions: {
        less: { javascriptEnabled: true },
      },
      postcss: {
        plugins: [tailwindcss],
      },
    },
  };
});
