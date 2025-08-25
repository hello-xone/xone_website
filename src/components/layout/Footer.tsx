import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import LogoIcon from "@/assets/imgs/header/logo-red.png";
import DiscardIcon from "@/assets/svg/home/discard.svg?react";
import GithubIcon from "@/assets/svg/home/github.svg?react";
import MediumIcon from "@/assets/svg/home/medium.svg?react";
import MustacheIcon from "@/assets/svg/home/mustache.svg?react";
import RedditIcon from "@/assets/svg/home/reddit.svg?react";
import TelegramIcon from "@/assets/svg/home/telegram.svg?react";
import XIcon from "@/assets/svg/home/x.svg?react";
import YoutubeIcon from "@/assets/svg/home/youtube.svg?react";
import { EXTERNAL_LINKS } from "@/constants/external";

import CommonButton from "../comm/button/CommonButton";
import Switch from "../comm/Switch";
import Language from "../Icons/Language";
import Theme from "../Icons/Theme";

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

const contacts = [
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
];

const Footer = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const footerLinks: Classification[] = useMemo(() => {
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
        title: t("common:gov-inc"),
        infos: [
          {
            name: t("common:proposal-initiation"),
            internalLink: true,
            url: "/commercial",
          },
          {
            name: t("common:incentives"),
            url: "",
            isLater: true,
          }
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
  }, [t]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };


  return (
    <div className="w-screen pt-[64px]">
      <div className="container">
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-[16px]">
          <img alt="logo" src={LogoIcon} className="w-[104px] h-auto"></img>
          <div className="flex items-center !gap-2">
            {contacts &&
              contacts.map((item, index) => {
                return (
                  <Link key={index} className="w-6 text-t1 flex items-center justify-center rounded bg-b3 h-6" target="_blank" to={item.url}>
                    {item.icon}
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="flex mt-10 w-full item-center justify-between max-md:gap-y-[58px] max-md:flex-wrap">
          {
            footerLinks && footerLinks.map(el => {
              return <div className="max-md:w-[50%]" key={`footer-menu-${el.title}`}>
                <div className="mb-[16px] font-bold text-t1">{el.title}</div>
                <div className="text-t2 flex text-sm flex-col gap-[12px] font-normal">
                  {
                    el.infos && el.infos.map(info => {
                      return <Link className="" to={info.url}>{info.name}</Link>
                    })
                  }

                </div>
              </div>
            })
          }

          <div className="w-full md:w-[386px]">
            <div className="font-bold mb-4 text-t1">Subscribe to Newsletter</div>
            <div className="text-sm text-t2 mb-4">Xone Chain is a modular Layer 1 blockchain that goes beyond scalability and efficiency. It focuses on ensuring every on-chain action creates tangible, traceable value.</div>
            <div className="flex">
              <input className="flex-1 h-[40px] outline-none bg-b3 placeholder:text-t4 text-sm px-[20px] rounded-l-[8px]" placeholder="Enter email address"></input>
              <CommonButton className="w-[98px] !text-base !font-bold !rounded-r-[8px] !rounded-l-none">Join</CommonButton>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs leading-[140%] text-t3">
          免责声明：<br></br>
          Xone 公链作为开放架构的基础设施，允许全球任何团队、开发者、社区在 无需许可 的前提下，自由部署合约、构建应用。这正是 Web3 去中心化精神的体现 ——技术中立、数据透明、人人平等接入。
          Xone 官方不对任何在链上运行的项目进行“推荐”、“担保”或“合作确认”，这些项目均由其团队 独立开发、独立运作、自负盈亏、风险自担。我们建议用户在参与任何项目（尤其是涉及资金的项目）时，务必秉持 DYOR（Do Your Own Research） 的原则，审慎判断，理性决策。
        </div>

        <div className="flex md:hidden mt-10 items-center justify-end">
          <Language className="text-t1"></Language>
          <Theme className="ml-3 mr-2"></Theme>
          <Switch value={theme === 'light'} onChange={toggleTheme} text={`${theme === 'light' ? 'Light' : 'Dark'} Mode`}></Switch>
        </div>
        <div className="mt-3 md:mt-10 py-4 max-md:pt-[21px] border-t-[1px] border-solid border-t3 text-t3 flex justify-between items-center">
          <div className="flex items-center text-xs max-md:justify-between max-md:w-full">
            <div className="leading-[14px]">
              © 2025 Xone Foundation
            </div>
            <div className="pl-4 ml-4 border-l-[1px] border-t3 leading-[14px] font-medium flex items-center">
              <Link to={''}>Privacy</Link>
              <span className="block w-[2px] h-[2px] rounded-full bg-t3 mx-4"></span>
              <Link to={''}>Terms</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center cursor-pointer gap-[8px]">
            <Language className="text-t1"></Language>
            <span className="text-t1 text-sm">English</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
