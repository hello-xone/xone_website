import styles from "./index.module.less";
import icon1 from "@/assets/imgs/home/notice1.png";
import icon2 from "@/assets/imgs/home/notice2.png";
import ArrowIcon from "@/assets/svg/home/arrow.svg?react";
import CloseIcon from "@/assets/svg/home/close.svg?react";
import { Link } from "@/components/comm/link";
import { useTranslation } from "react-i18next";
import { EXTERNAL_LINKS } from "@/constants/external";
import { useRef } from "react";

export const Notice = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const textRef = useRef<HTMLDivElement>(null);
  // const wrapperRef = useRef<HTMLDivElement>(null);
  const noticeText = t("common:headerNotice", {
    experienceLink: "/",
    marketingLink: "/",
  })

  // function shouldShowEllipsis() {
  //   if (wrapperRef.current && textRef.current) {
  //     const rect1 = wrapperRef.current.getBoundingClientRect();
  //     const rect2 = textRef.current.getBoundingClientRect();
  //     const distance = rect1.right - rect2.right;
  //     console.log('distance', distance);
  //   }
  // }

  // useEffect(() => {
  //   if (textRef.current) {
  //     shouldShowEllipsis();
  //   }
  // }, [noticeText])

  // useWindowResize(() => {
  //   if (textRef.current) {
  //     shouldShowEllipsis();
  //   }
  // }, [noticeText])

  return (
    <div className={styles.notice}>
      <div className={styles.icon2}>
        <img className="w-full" src={icon2} alt="" />
      </div>
      <div className={styles.icon1}>
        <img className="w-full" src={icon1} alt="" />
      </div>
      {/* <div className={styles.wrapper} ref={wrapperRef}> */}
      <div className={styles.text}>
        <span
          ref={textRef}
          className={styles.noticeText}
          dangerouslySetInnerHTML={{
            __html: noticeText,
          }}
        />
        <span></span>
        <Link className={styles.sellMore} href={EXTERNAL_LINKS.docs + "blog/bulletin/letter"} target="_blank">
          <span className={styles.sellMoreText}>{t("common:seeMore")}</span>
          <div className={styles.arrowIcon}>
            <ArrowIcon></ArrowIcon>
          </div>
        </Link>
      </div>
      {/* </div> */}
      <div className={styles.close} onClick={onClose}>
        <div className={styles.closeIcon}>
          <CloseIcon></CloseIcon>
        </div>
      </div>
    </div>
  );
};
