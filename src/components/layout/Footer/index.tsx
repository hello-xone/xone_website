import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import CoingeckoIcon from "@/assets/svg/home/coingecko.svg?react";
import DiscardIcon from "@/assets/svg/home/discard.svg?react";
import GithubIcon from "@/assets/svg/home/github.svg?react";
import MediumIcon from "@/assets/svg/home/medium.svg?react";
import MustacheIcon from "@/assets/svg/home/mustache.svg?react";
import RedditIcon from "@/assets/svg/home/reddit.svg?react";
import TelegramIcon from "@/assets/svg/home/telegram.svg?react";
import XIcon from "@/assets/svg/home/x.svg?react";
import Logo from "@/assets/svg/home/xone_logo.svg?react";
import YoutubeIcon from "@/assets/svg/home/youtube.svg?react";
import { Link } from "@/components/comm/link";
import { EXTERNAL_LINKS } from "@/constants/external";

import { BaseContainer } from "../BaseContainer";
import { LanguageButton } from "../Header/components/languageButton";
import styles from "./index.module.less";

interface Info {
  name: string;
  url: string;
  internalLink?: boolean;
  isLater?: boolean;
}

interface Classification {
  title: string;
  infos: Info[];
}

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const classifications: Classification[] = useMemo(() => {
    return [
      {
        title: t("common:xoneChain"),
        infos: [
          {
            name: t("common:about"),
            url: EXTERNAL_LINKS.docs + "study/xone",
          },
          {
            name: t("common:events"),
            url: EXTERNAL_LINKS.Events,
          },
          {
            name: t("common:bountyHunter"),
            url: EXTERNAL_LINKS.docs + "study/bug",
          },
          {
            name: t("common:whitePaper"),
            url: EXTERNAL_LINKS.docs + "study/wiki",
          },
          {
            name: t("common:mediaKit"),
            url: EXTERNAL_LINKS.docs + "study/media",
          },
          {
            name: t("common:termsOfService"),
            url: EXTERNAL_LINKS.docs + "study/service",
          },
          {
            name: t("common:privacyPolicy"),
            url: EXTERNAL_LINKS.docs + "study/privacy",
          },
        ],
      },
      {
        title: t("common:build"),
        infos: [
          {
            name: t("common:center"),
            internalLink: true,
            url: "/developer",
          },
          {
            name: t("common:developerDocs"),
            url: EXTERNAL_LINKS.docs + "developers/ready",
          },
          {
            name: t("common:rpcEndpoints"),
            url: EXTERNAL_LINKS.docs + "developers/rpc",
          },
          {
            name: t("common:devTools"),
            url: EXTERNAL_LINKS.docs + "developers/tools",
          },
          {
            name: t("common:blockExplorers"),
            url: EXTERNAL_LINKS.MainExplorer,
          },
          {
            name: t("common:faucets"),
            url: EXTERNAL_LINKS.faucet,
          },
          {
            name: "Github",
            url: EXTERNAL_LINKS.Github,
          },
        ],
      },
      {
        title: t("common:headerNav4"),
        infos: [
          {
            name: t("common:commercialPr"),
            internalLink: true,
            url: "/commercial",
          },
          {
            name: t("common:knightProject"),
            url: "",
            isLater: true,
          },
          {
            name: t("common:recruitment"),
            url: "",
            isLater: true,
          },
        ],
      },
    ];
  }, [i18n.language]);

  const contacts = useMemo(() => {
    return [
      {
        icon: <TelegramIcon></TelegramIcon>,
        url: EXTERNAL_LINKS.Telegram,
      },
      {
        icon: <XIcon></XIcon>,
        url: EXTERNAL_LINKS.Twitter,
      },
      {
        icon: <DiscardIcon></DiscardIcon>,
        url: EXTERNAL_LINKS.Discord,
      },
      {
        icon: <YoutubeIcon></YoutubeIcon>,
        url: EXTERNAL_LINKS.Youtube,
      },
      {
        icon: <GithubIcon></GithubIcon>,
        url: EXTERNAL_LINKS.Github,
      },
      {
        icon: <RedditIcon></RedditIcon>,
        url: EXTERNAL_LINKS.Reddit,
      },
      {
        icon: <MediumIcon></MediumIcon>,
        url: EXTERNAL_LINKS.Medium,
      },
      {
        icon: <MustacheIcon></MustacheIcon>,
        url: EXTERNAL_LINKS.ChatMe,
      },
      {
        icon: <CoingeckoIcon></CoingeckoIcon>,
        url: EXTERNAL_LINKS.Coingecko,
      },
    ];
  }, []);

  const renderInfo = (info: Info) => {
    if (info.isLater) {
      return (
        <div className={styles.later}>
          <span className="text-white opacity-[0.3]">{info.name}</span>
          <div className={styles.laterTag}>Later</div>
        </div>
      );
    }
    if (info.internalLink) {
      return (
        <div className={styles.link} onClick={() => navigate(info.url)}>
          {info.name}
        </div>
      );
    }
    return (
      <Link className={styles.link} href={info.url}>
        {info.name}
      </Link>
    );
  };

  return (
    <div className={styles.footer}>
      <BaseContainer className="wow animated fadeIn">
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <div className={styles.wrapper}>
              <div className={styles.logo}>
                <Logo></Logo>
              </div>
              <div className={`${styles.copyright} ${styles.small}`}>
                © {new Date().getFullYear()} {t("common:copyright")}
              </div>
            </div>

            <div className={styles.langBtnWrapper}>
              <LanguageButton
                type="text"
                popoverDirection="top"
              ></LanguageButton>
            </div>
          </div>
          <div className={styles.footerRight}>
            {classifications.map((item, i) => {
              return (
                <div key={i} className={styles.col}>
                  <h1 className={styles.title}>{item.title}</h1>
                  <div>
                    {item.infos.map((info, index) => {
                      return <div key={index}>{renderInfo(info)}</div>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.followUs}>
          <div className={styles.followUsTitle}>{t("common:followUs")}</div>
          <div className={styles.followUsContent}>
            <div className={styles.followUsLeft}>
              {contacts.map((item, index) => {
                return (
                  <Link key={index} className={styles.contact} href={item.url}>
                    {item.icon}
                  </Link>
                );
              })}
            </div>
            <div className={`${styles.copyright} ${styles.large}`}>
              © {new Date().getFullYear()} {t("common:copyright")}
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};
