import Prism from "prismjs";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Typed from "typed.js";

import { BaseContainer } from "@/components/layout/BaseContainer";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";

import fatherStyles from "../index.module.less";
import styles from "./index.module.less";

const solidityCode = `// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0

pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Test is ERC20, ERC20Permit {
  constructor() ERC20("Hello Xone", "HELLOXONE") ERC20Permit("Hello Xone")
    _mint(msg.sender, 3721 * 8 ** decimals());
}`;

export const Advantage = () => {
  const { t } = useTranslation();
  const codeRef = useRef<HTMLElement>(null);
  const hiddenElRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const typedInstanceRef = useRef<Typed | null>(null);

  const { isLight } = useCurrentTheme();

  useScrollreveal();

  const computeHeight = () => {
    const hiddenEl = hiddenElRef.current;
    if (hiddenEl) {
      setHeight(hiddenEl.clientHeight);
    }
  };

  // 重新应用代码高亮和动画
  const reapplyHighlighting = () => {
    if (!codeRef.current) return;

    // 销毁之前的 Typed 实例
    if (typedInstanceRef.current) {
      typedInstanceRef.current.destroy();
      typedInstanceRef.current = null;
    }

    try {
      // 清空代码内容
      codeRef.current.innerHTML = "";

      // 使用 javascript 语言来高亮 Solidity 代码，因为 Prism.js 默认不支持 Solidity
      const highlightedHTML = Prism.highlight(
        solidityCode,
        Prism.languages.javascript,
        "javascript"
      );

      // 创建新的 Typed 实例
      typedInstanceRef.current = new Typed(codeRef.current, {
        strings: [highlightedHTML],
        typeSpeed: 0,
        backSpeed: 500,
        loop: true,
      });
    } catch (error) {
      console.warn("Prism.js highlighting failed:", error);
      // 如果高亮失败，直接显示原始代码
      if (codeRef.current) {
        codeRef.current.innerHTML = solidityCode;
      }
    }
  };

  useEffect(() => {
    computeHeight();
  }, []);

  // 监听主题变化，重新应用代码高亮
  useEffect(() => {
    reapplyHighlighting();
  }, [isLight]);

  // 组件卸载时清理 Typed 实例
  useEffect(() => {
    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.left} ${AnimationName.SLIDE_IN_FADE}`}>
        <div
          className={`${styles.codeWrapper} ${styles.hidden}`}
          ref={hiddenElRef}
        >
          <pre className={`solidity-raw ${styles.codePre} code-theme-block`}>
            <code>{solidityCode}</code>
          </pre>
        </div>
        <div
          className={styles.codeWrapper}
          style={{
            height: `${height || 0}px`,
          }}
        >
          <pre
            className={`solidity-raw ${styles.codePre} ${
              isLight ? "code-highlight-light" : "code-highlight-dark"
            }`}
          >
            <code ref={codeRef}></code>
          </pre>
        </div>
      </div>
      <div
        className={`${styles.right} ${AnimationName.SLIDE_IN_FADE} ${DelayClassName.DELAY_3}`}
      >
        <h1 className={`${styles.slogon}`}>{t("developer:advantageTitle")}</h1>
      </div>
    </div>
  );
};
