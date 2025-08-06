import { BaseContainer } from "@/components/layout/BaseContainer";
import Prism from "prismjs";
import fatherStyles from "../index.module.less";
import styles from "./index.module.less";
import { useTranslation } from "react-i18next";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";
import Typed from "typed.js";
import { useEffect, useRef, useState } from "react";
import { useWindowResize } from "@/hooks/useWindowResize";

const solidityCode = `// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0

pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Test is ERC20, ERC20Permit {
  constructor() ERC20("Hello Xone", "HELLOXONE") ERC20Permit("Hello Xone")
    _mint(msg.sender, 3721 * 8 ** decimals());
`;

export const Advantage = () => {
  const { t } = useTranslation();
  const codeRef = useRef(null);
  const hiddenElRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  useScrollreveal();

  const computeHeight = () => {
    const hiddenEl = hiddenElRef.current;
    if (hiddenEl) {
      setHeight(hiddenEl.clientHeight);
    }
  }

  useEffect(() => {
    const highlightedHTML = Prism.highlight(
      solidityCode,
      Prism.languages.solidity,
      "solidity"
    );
    new Typed(codeRef.current, {
      strings: [highlightedHTML],
      typeSpeed: 0,
      backSpeed: 500,
      loop: true,
    });
    computeHeight();
  }, []);

  useWindowResize(() => {
    computeHeight();
  }, [])

  return (
    <BaseContainer className={styles.wrapper}>

      <div className={`${styles.left} ${AnimationName.SLIDE_IN_FADE}`}>
        <div className={`${styles.codeWrapper} ${styles.hidden}`} ref={hiddenElRef}>
          <pre className={`solidity-raw ${styles.codePre}`}>
            <code>{solidityCode}</code>
          </pre>
        </div>
        <div className={styles.codeWrapper} style={{
          height: `${height || 0}px`
        }}>
          <pre className={`solidity-raw ${styles.codePre}`}>
            <code ref={codeRef}></code>
          </pre>
        </div>
      </div>
      <h1
        className={`${fatherStyles.title} ${styles.slogon} ${AnimationName.SLIDE_IN_FADE} ${DelayClassName.DELAY_3}`}
      >
        {t("developer:advantageTitle")}
      </h1>
    </BaseContainer>
  );
};
