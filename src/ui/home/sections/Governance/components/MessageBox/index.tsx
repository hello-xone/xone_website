import { useEffect, useRef } from "react";
import styles from "./index.module.less";
import Typed from "typed.js";
import { useTranslation } from "react-i18next";

export const MessageBox = () => {
  const { t, i18n } = useTranslation();
  const dialog1Ref = useRef(null);
  const dialog2Ref = useRef(null);

  useEffect(() => {
    const message1 = t("home:dialogueMessage1");
    const message2 = t("home:dialogueMessage2");

    let dialog2: Typed | null = null;
    const runDialog2 = () => {
      dialog2 = new Typed(dialog2Ref.current, {
        strings: [message2],
        typeSpeed: 10,
        showCursor: false,
        loop: false,
        onComplete: () => {
          window.setTimeout(() => {
            dialog2?.destroy();
            dialog1.reset();
          }, 2000);
        },
      });
    };

    const dialog1 = new Typed(dialog1Ref.current, {
      strings: [message1],
      typeSpeed: 10,
      showCursor: false,
      loop: false,
      onComplete: () => {
        window.setTimeout(() => {
          runDialog2();
        }, 200);
      },
    });
    return () => {
      dialog2 && dialog2.destroy();
      dialog1.destroy();
    };
  }, [i18n.language]);

  return (
    <>
      <div className={`${styles.card} ${styles.red}`}>
        <div className={styles.title}>{t("home:dialogueTitle1")}</div>
        <div
          className={`${styles.value} __lineHeight150`}
          ref={dialog1Ref}
        ></div>
      </div>
      <div className={`${styles.card} ${styles.black}`}>
        <div className={styles.title}>{t("home:dialogueTitle2")}</div>
        <div
          className={`${styles.value} __lineHeight150`}
          ref={dialog2Ref}
        ></div>
      </div>
    </>
  );
};
