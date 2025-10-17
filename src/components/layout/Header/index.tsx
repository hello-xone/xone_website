import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import CloseIcon from "@/assets/svg/home/close.svg?react";
import SmallLogo from "@/assets/svg/home/loog_small.svg?react";
import MenuIcon from "@/assets/svg/home/menu.svg?react";
import Logo from "@/assets/svg/home/xone_logo.svg?react";
import { Animation, AnimationType } from "@/components/comm/animation";
import { Button } from "@/components/comm/button";
import { EXTERNAL_LINKS } from "@/constants/external";
import { useNoticeStore } from "@/store/noticeStore";

import { LanguageButton } from "./components/languageButton";
import { MobileMenu } from "./components/mobileMenu";
import { Navigation } from "./components/navigation";
import { Notice } from "./components/notice/index";
import styles from "./index.module.less";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { closed, closeNotice } = useNoticeStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const colorStyle = useMemo(() => {
    if (location.pathname === "/developer" && !scrolled && !showMobileMenu) {
      return { color: "white" };
    }
    return { color: "black" };
  }, [location.pathname, scrolled, showMobileMenu]);
  useEffect(() => {
    // Uncomment if dynamic header height is required
    if (wrapRef.current?.clientHeight) {
      document.documentElement.style.setProperty(
        "--app-header-height",
        wrapRef.current?.clientHeight + "px"
      );
      if (wrapRef.current.querySelector(".alert-box")) {
        document.documentElement.style.setProperty(
          "--app-header-alert-height",
          wrapRef.current.querySelector(".alert-box")?.clientHeight + "px"
        );
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
    };
    setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pageClass = useMemo(() => {
    if (location.pathname === "/commercial") {
      return styles.commercial;
    }
    return "";
  }, [location.pathname]);

  const languageButtonType = useMemo(() => {
    return !scrolled && location.pathname === "/developer"
      ? "whiteContained"
      : "contained";
  }, [location.pathname, scrolled]);

  const backToHome = () => {
    navigate("/");
  };

  const handleCloseMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      {!closed && (
        <div className="w-full opacity-0">
          <Notice onClose={closeNotice}></Notice>
        </div>
      )}
      <div
        className={`${styles.header} ${scrolled || showMobileMenu ? styles.scrolled : ""
          } ${showMobileMenu ? styles.openMobileMenu : ""} ${pageClass}`}
        style={scrolled ? {} : colorStyle}
      >
        {!closed && <Notice onClose={closeNotice}></Notice>}

        <div className={`${styles.content}`}>
          <div className={styles.center}>
            <Animation
              className={`${styles.logo}`}
              animationClassName={AnimationType.SLIDE_IN_DOWN}
              onClick={backToHome}
            >
              <Logo></Logo>
            </Animation>
            {/*  */}

            <div className={styles.headerRight}>
              <Navigation></Navigation>
              <div className="flex gap-3 items-center">
                <Animation
                  animationClassName={AnimationType.SLIDE_IN_DOWN}
                  delay={1}
                >
                  <LanguageButton type={languageButtonType}></LanguageButton>
                </Animation>
                <Animation
                  animationClassName={AnimationType.SLIDE_IN_DOWN}
                  delay={1.2}
                >
                  <Button
                    size="small"
                    onClick={() => window.open(EXTERNAL_LINKS.dashboard + i18n.language)}
                  >
                    {t("common:exploreXone")}
                  </Button>
                </Animation>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.mobile}`}>
          <Animation
            className={styles.smallLogo}
            animationClassName={AnimationType.SLIDE_IN_DOWN}
            onClick={backToHome}
          >
            <SmallLogo></SmallLogo>
          </Animation>
          <div className="flex items-center">
            <Animation
              animationClassName={AnimationType.SLIDE_IN_DOWN}
              delay={0.2}
            >
              <Button
                size="small"
                onClick={() => window.open(EXTERNAL_LINKS.dashboard + i18n.language)}
              >
                {t("common:exploreXone")}
              </Button>
            </Animation>
            <Animation
              animationClassName={AnimationType.SLIDE_IN_DOWN}
              delay={0.4}
            >
              <LanguageButton
                popoverDirection="right"
                type="icon"
                className={styles.languageIconBtn}
                popoverStyle={{
                  right: "-46px",
                }}
              ></LanguageButton>
            </Animation>
            <Animation
              animationClassName={AnimationType.SLIDE_IN_DOWN}
              delay={0.6}
              className="w-[21px] ml-4 cursor-pointer"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <CloseIcon></CloseIcon> : <MenuIcon></MenuIcon>}
            </Animation>
          </div>
        </div>
        <MobileMenu
          onClose={handleCloseMobileMenu}
          show={showMobileMenu}
        ></MobileMenu>
      </div>
    </>
  );
};

export default Header;
