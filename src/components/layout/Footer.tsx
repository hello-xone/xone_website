import dayjs from "dayjs";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { addEmail } from "@/api/common";
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
import useApplicationStore from "@/store/applicationStore";
import { isEmail } from "@/utils";

import CommonButton from "../comm/button/CommonButton";
import Language from "../Icons/Language";
import Theme from "../Icons/Theme";
import LanguagePopover from "./Popover/LanguagePopover";

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
  const { changeTheme } = useApplicationStore()
  const [email, setEmail] = useState("")
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
            name: t("common:officialVerification"),
            url: "/verification-channel",
          },
          {
            name: t("common:roadmap"),
            url: EXTERNAL_LINKS.docs + "study/roadmap",
          },
          // {
          //   name: t("common:termsOfService"),
          //   url: EXTERNAL_LINKS.docs + "study/service",
          // },
          // {
          //   name: t("common:privacyPolicy"),
          //   url: EXTERNAL_LINKS.docs + "study/privacy",
          // },
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
          }
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
            name: t("common:blog"),
            url: EXTERNAL_LINKS.docs + "blog",
          },
          {
            name: t("common:events"),
            url: '/events',
          },
          {
            name: t("common:recruitment"),
            url: "/recruitment",
            isLater: true,
          },
          {
            name: t("header:navGlobalGrants"),
            url: "/grants",
          },
          {
            name: t("common:knightProject"),
            url: "",
            isLater: true,
          },
        ],
      },
    ];
  }, [t]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    changeTheme()
  };

  const handleSubmit = async () => {
    await addEmail({
      email,
    });
    setEmail('');
    toast.success(t("home:subscriptionSuccessful"));
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
                  <Link key={`contact-item-${item.url}-${index}`} className="w-6 text-t1 flex items-center justify-center rounded bg-b3 h-6" target={item.url.includes("http") ? "_blank" : "_self"} to={item.url}>
                    {item.icon}
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="flex mt-10 w-full item-center justify-between max-md:gap-y-[58px] max-md:flex-wrap">
          {
            footerLinks && footerLinks.map((el, index) => {
              return <div className="max-md:w-[50%]" key={`footer-menu-${el.title}-${index}`}>
                <div className="mb-[16px] font-bold text-t1">{el.title}</div>
                <div className="text-t2 flex text-sm flex-col gap-[12px] font-normal">
                  {
                    el.infos && el.infos.map(info => {
                      return <Link className="hover:text-[#FF0420] group flex items-center gap-[8px]" key={`info-item-${info.name}`} target={info.url.includes("http") ? "_blank" : "_self"} to={info.url}>
                        {info.name}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          className={`transition-all duration-200 opacity-0 group-hover:opacity-100`}
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.4771 9.16603L9.00707 4.69603L10.1854 3.5177L16.6671 9.99937L10.1854 16.481L9.00707 15.3027L13.4771 10.8327H3.33374V9.16603H13.4771Z"
                            fill={"#FF0420"}
                          />
                        </svg>
                      </Link>
                    })
                  }

                </div>
              </div>
            })
          }

          <div className="w-full md:w-[386px]">
            <div className="font-bold mb-4 text-t1">{t("subscribe")}</div>
            <div className="text-sm text-t2 mb-4">{t("header:subscribeDesc")}</div>
            <div className="flex border-[1px] border-transparent hover:border-[1px] hover:border-t1 rounded-[8px] p-1 box-content bg-b3">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="flex-1 h-[40px] outline-none bg-transparent placeholder:text-t4 text-sm px-[20px] rounded-[8px]" placeholder="Enter email address"></input>
              <CommonButton onClick={() => {
                if (email && isEmail(email)) {
                  handleSubmit()
                } else {
                  toast.error(t("header:invalidEmail"))
                }
              }} className="w-[120px] h-10 !text-base !font-bold !rounded-r-[8px]">{t("join")}</CommonButton>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs leading-[140%] text-t3">
          {t("header:disclaimerTitle")}<br></br>
          {t("header:disclaimer")}
        </div>

        <div className="flex md:hidden mt-10 items-center justify-end">
          <LanguagePopover>
            <Language className="text-t1"></Language>
          </LanguagePopover>
          <div className="flex h-10 items-center ml-3" onClick={() => toggleTheme()}>
            <Theme className="w-6 h-6 mr-2"></Theme>

          </div>
        </div>
        <div className="mt-3 md:mt-10 py-4 max-md:pt-[21px] border-t-[1px] border-solid border-[--border3] text-t3 flex justify-between items-center">
          <div className="flex items-center text-xs max-md:justify-between max-md:w-full">
            <div className="leading-[14px]">
              © {dayjs().format("YYYY")} Xone Foundation
            </div>
            <div className="pl-4 ml-4 border-l-[1px] border-t3 leading-[14px] flex items-center">
              <Link to={EXTERNAL_LINKS.docs + "study/privacy"} target="_blank">{t("header:privacy")}</Link>
              <span className="block w-[2px] h-[2px] rounded-full bg-t3 mx-4"></span>
              <Link to={EXTERNAL_LINKS.docs + "study/service"} target="_blank">{t("header:terms")}</Link>
            </div>
          </div>
          <LanguagePopover noHoverBg className="max-md:hidden group">
            <>
              <Language className="text-t1"></Language>
              <span className="text-t1 text-sm group-hover:underline group-hover:decoration-dashed">English</span>
            </>
          </LanguagePopover>
        </div>

      </div>
    </div>
  );
};

export default Footer;
