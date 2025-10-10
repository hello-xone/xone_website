import { spawn } from "child_process";
import fs from "fs";
import portfinder from "portfinder";
import puppeteer from "puppeteer";

/**
 @param routes 
 */

const seoPrerender = (routes) => {
  return {
    name: "viteSeoPrerender",
    async closeBundle() {
      const port = await portfinder.getPortPromise({ port: 4173 });

      const previewProcess = spawn(
        "vite",
        ["preview", "--host", "0.0.0.0", "--port", port, "--strictPort"],
        { stdio: "pipe" }
      );

      await new Promise((resolve) => {
        previewProcess.stdout.on("data", (data) => {
          if (data.toString().includes("Local")) resolve();
        });
      });

      const browser = await puppeteer.launch({
        headless: 'new', 
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
      });
      const page = await browser.newPage();
      const len = (routes || []).length;

      for (var index = 0; index < len; index++) {
        const routePath = routes[index];

        await page.goto(`http://localhost:${port}${routePath}`, {
          waitUntil: "networkidle2", // 使用更宽松的网络空闲策略
          timeout: 40000, // 设置超时时间为40秒
        });
        await page.setViewport({ width: 1024, height: 768 });

        const content = await page.content();

        const filePath = `./dist${routePath === "/" ? "/home" : routePath}.html`;

        fs.writeFileSync(filePath, content);
      }
      await browser.close();
      previewProcess.kill();
    },
  };
};
export default seoPrerender;
