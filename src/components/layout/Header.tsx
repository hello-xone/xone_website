import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import LogoIcon from "@/assets/imgs/header/logo.png";
import LogoRedIcon from "@/assets/imgs/header/logo-red.png";
import { EXTERNAL_LINKS } from "@/constants/external";
import { menus, NavigationType } from "@/constants/menus";

import CommonButton from "../comm/button/CommonButton";
import { SeeMore } from "../comm/link/SeeMore";
import AiStar from "../Icons/AiStar";
import Knight from "../Icons/Knight";
import Language from "../Icons/Language";
import Theme from "../Icons/Theme";
import CommonPopover from "./Popover/CommonPopover";
import LanguagePopover from "./Popover/LanguagePopover";
import MenuPopover from "./Popover/MenuPopover";

const Header = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const { t, i18n } = useTranslation("header");

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="w-screen bg-b1/50 h-[58px] md:h-[64px] px-4 md:px-[30px] flex items-center justify-between">
      <div className="flex items-center gap-[48px]">
        <img
          src={LogoRedIcon}
          alt="logo"
          className="w-[100px] h-auto max-md:hidden"
        ></img>
        <img src={LogoIcon} alt="logo" className="w-8 h-8 md:hidden"></img>
        <div className="hidden md:flex items-center gap-[40px]">

          {menus &&
            menus.map((item) => {
              return (
                <div key={`header-item-${item.id}`}>
                  {item.group && item.group.length > 0 ? (
                    <CommonPopover text={t(item.name)}>
                      {
                        item.type === NavigationType.INFO ? <div className="flex gap-[24px]">
                          <div className="w-[372px]">
                            {item.group && item.group.map(gel => <div className="px-[10px] group gap-[12px] rounded-[8px] mb-[2px] bg-transparent hover:bg-b3 cursor-pointer py-2 flex items-center" key={`children-item-${gel.id}`}>
                              <Knight className='text-t2 group-hover:text-t1 shrink-0'></Knight>
                              <div className="text-t2 group-hover:text-t1">
                                <div className="text-sm font-bold leading-[140%] mb-1">{t(gel.title)}</div>
                                <div className="text-xs leading-[16px]">{t(gel.description)}</div>
                              </div>
                            </div>)}
                          </div>
                          <div className="w-[480px]">
                            <div className="w-full min-h-[164px] flex flex-col items-center justify-center rounded-[8px] bg-b3">
                              <Knight className='text-t2 shrink-0'></Knight>
                              <div className="text-t2 font-medium text-sm mt-[7px]">Look forward to it !</div>
                            </div>
                            <div className="mt-3 text-t2 text-sm font-bold leading-[140%]">助力Xone未来动向，成就更大发展</div>
                            <div className="mt-3 text-t2 text-sm leading-[140%]">{`一切工作都是为了帮助 Xone 更好的服务全球企业、组织以及个人。因此，在任何领域，只要你有想法并愿意为此贡献你的独到想法！我们相信，在 Xone 的成长之路上，将无畏即将面对的无数挑战。`}</div>
                            <SeeMore href="" text="寻找机会" className="mt-3" textClassName="!text-[14px] text-t2"></SeeMore>
                          </div>


                        </div> : <div className="flex gap-[24px]">
                          {item.group.map((cel) => (
                            <div key={`children-item-${cel.id}`}>
                              <div className="text-base mb-1 leading-[140%] font-bold text-t1">
                                {t(cel.title)}
                              </div>
                              <div className="text-xs font-normal leading-[140%] text-t2">
                                {t(cel.description)}
                              </div>
                              <div className="mt-4 text-[14px] flex flex-col gap-[2px] leading-[140%] text-t2">
                                {
                                  cel.links &&
                                  cel.links.map((link) => {
                                    return (
                                      <Link
                                        key={`link-item-${link.id}`}
                                        to={link.link || ""}
                                        target="_blank"
                                        className="px-[10px] py-[8px] hover:bg-b3 rounded-[8px] cursor-pointer"
                                      >
                                        {t(link.name)}
                                      </Link>
                                    );
                                  })
                                }
                              </div>
                              {
                                item.id === "Ecology" && <SeeMore href="" text={t("home:seeMore")} className="mt-4 ml-[10px]" textClassName="!text-[14px] font-medium text-t2"></SeeMore>
                              }
                            </div>
                          ))}
                        </div>
                      }
                    </CommonPopover>
                  ) : (
                    <Link to={item.id === 'Ecology' ? `${EXTERNAL_LINKS.dashboard}${i18n.language}${item.link}` : item.link || ''} className="text-sm text-t1" target="_blank">
                      {t(item.name)}
                    </Link>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex items-center gap-[12px] md:gap-[24px]">
        <CommonButton type="outline">
          Ask AI
          <AiStar className="text-t1 w-4 h-4 md:w-6 md:h-6"></AiStar>
        </CommonButton>
        <CommonButton>Explore Xone</CommonButton>
        <MenuPopover></MenuPopover>
        <div className="hidden md:flex items-center gap-[16px]">
          <LanguagePopover>
            <Language className="text-t1"></Language>
          </LanguagePopover>
          <Theme onClick={() => toggleTheme()} className="text-t1"></Theme>
        </div>
      </div>
    </div>
  );
};

export default Header;
