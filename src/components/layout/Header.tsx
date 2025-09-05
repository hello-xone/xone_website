import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { request } from "@/api/request";
import LogoIcon from "@/assets/imgs/header/logo.png";
import LogoRedIcon from "@/assets/imgs/header/logo-red.png";
import { EXTERNAL_LINKS } from "@/constants/external";
import { menus, NavigationType } from "@/constants/menus";
import useApplicationStore from "@/store/applicationStore";

import CommonButton from "../comm/button/CommonButton";
import { SeeMore } from "../comm/link/SeeMore";
import Knight from "../Icons/Knight";
import Language from "../Icons/Language";
import Theme from "../Icons/Theme";
import BusinessCard from "./Header/components/businessCard";
import CommonPopover from "./Popover/CommonPopover";
import LanguagePopover from "./Popover/LanguagePopover";
import MenuPopover from "./Popover/MenuPopover";

const Header = () => {
  const popoverRef = useRef<any>(null);
  const navigate = useNavigate();
  const { isLight, changeTheme } = useApplicationStore()
  const [event, setEvent] = useState<any>(null);
  const [detailId, setDetailId] = useState("");
  const { t, i18n } = useTranslation("header");

  const toggleTheme = () => {
    document.documentElement.setAttribute(
      "data-theme",
      isLight ? "dark" : "light"
    );
    localStorage.setItem("theme", isLight ? "dark" : "light");
    changeTheme()
  };

  useEffect(() => {
    request
      .get(
        "/api/v2/official-assets?calendar_api_id=cal-SHqvOTSSn2B1gf3&pagination_limit=1&period=past"
      )
      .then((res) => {
        if (res.code === 0 && res.data && res.data.entries[0]) {
          setEvent(res.data.entries[0].event);
        }
      });
  }, []);

  const globalDetail = useMemo(() => {
    if (event && detailId) {
      switch (detailId) {
        case "global_active":
          return {
            images: event.cover_url || '',
            name: event.name || '',
          };
      }
      switch (detailId) {
        case "global_active":
          return {
            images: event.cover_url || '',
            name: event.name || '',
          };
      }
    }
    return null;
  }, [event, detailId]);


  const group = useMemo(() => {
    if (detailId) {
      const groups = menus.find((item) => item.id === "global")?.group;
      if (groups) {
        return groups.find((item) => item.id === detailId);
      }
    }
  }, [detailId])

  const handleCallChild = () => {
    if (popoverRef.current) {
      popoverRef.current.close();
    }
  };
  return (
    <div className={clsx(`w-screen fixed backdrop-blur-[5px] z-[10] top-0 left-0 h-[58px] md:h-[64px] px-4 md:px-[30px] flex items-center justify-between`, {
      'bg-[#ffffff]/50': isLight,
      'bg-[#070808]/50': !isLight,
    })} >
      <div className="flex items-center z-10 gap-[48px]">
        <img
          src={LogoRedIcon}
          alt="logo"
          onClick={() => navigate("/")}
          className="w-[100px] h-auto cursor-pointer max-md:hidden"
        ></img>
        <img src={LogoIcon} onClick={() => navigate("/")} alt="logo" className="w-8 h-8 md:hidden"></img>
        <div className="hidden lg:flex items-center gap-[40px]">
          {menus &&
            menus.map((item) => {
              return (
                <div key={`header-item-${item.id}`}>
                  {item.group && item.group.length > 0 ? (
                    <CommonPopover ref={popoverRef} text={t(item.name)}>
                      {item.type === NavigationType.INFO ? (
                        <div className="flex items-stretch gap-[24px]">
                          <div className="w-[372px]">
                            {item.group &&
                              item.group.map((gel) => (
                                <div
                                  onMouseEnter={() => setDetailId(gel.id)}
                                  className="px-[10px] group gap-[12px] rounded-[8px] mb-[2px] bg-transparent hover:bg-b3 cursor-pointer py-2 flex items-center"
                                  key={`children-item-${gel.id}`}
                                >
                                  <gel.icon className="text-t2 group-hover:text-t1 shrink-0"></gel.icon>
                                  <div className="text-t2 group-hover:text-t1">
                                    <div className="text-sm font-bold leading-[140%] mb-1">
                                      {t(gel.title)}
                                    </div>
                                    <div className="text-xs leading-[16px]">
                                      {t(gel.description)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="w-[480px] flex-1 flex flex-col">
                            {
                              group?.id === "global_business" ? <BusinessCard></BusinessCard> : <>
                                {!globalDetail ? (
                                  <div className="w-full min-h-[164px] flex-1 flex flex-col items-center justify-center rounded-[8px] bg-b3">
                                    <Knight className="text-t2 shrink-0"></Knight>
                                    <div className="text-t2 font-medium text-sm mt-[7px]">
                                      Look forward to it !
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    src={globalDetail.images}
                                    alt=""
                                    className="w-full aspect-[480/296] object-cover flex-1 rounded-[8px]"
                                  ></img>
                                )}

                                <div className="mt-3 text-t2 shrink-0 text-sm font-bold leading-[140%]">
                                  {globalDetail
                                    ? globalDetail.name
                                    : group?.detailTitle ? t(group?.detailTitle) : ""}
                                </div>
                                {!globalDetail && (
                                  <div className="mt-3 text-t2 shrink-0 text-sm leading-[140%]">{group?.detailDesc ? t(group?.detailDesc) : ""}</div>
                                )}
                              </>
                            }
                            {
                              group && group.link && <SeeMore
                                href={group.link}
                                target={group.link.includes("http") ? "_blank" : "_self"}
                                text={t("home:seeMore")}
                                className="mt-3"
                                textClassName="!text-[14px] shrink-0 text-t2"
                              ></SeeMore>
                            }
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-[24px]">
                          {item.group.map((cel) => (
                            <div key={`children-item-${cel.id}`} className="w-[200px]">
                              <div className="text-base mb-1 leading-[140%] font-bold text-t1">
                                {t(cel.title)}
                              </div>
                              <div className="text-xs font-normal leading-[140%] text-t2">
                                {t(cel.description)}
                              </div>
                              <div className="mt-4 text-[14px] flex flex-col gap-[2px] leading-[140%] text-t2">
                                {cel.links &&
                                  cel.links.map((link) => {
                                    return (
                                      <Link
                                        key={`link-item-${link.id}`}
                                        to={link.link || ""}
                                        onClick={() => handleCallChild()}
                                        target={link.link.includes("http") ? "_blank" : "_self"}
                                        className="px-[10px] py-[8px] hover:bg-b3 hover:text-t1 rounded-[8px] cursor-pointer"
                                      >
                                        {t(link.name)}
                                      </Link>
                                    );
                                  })}
                              </div>
                              {item.id === "Ecology" && (
                                <SeeMore
                                  href={EXTERNAL_LINKS.Bvi}
                                  onClick={() => handleCallChild()}
                                  text={t("home:seeMore")}
                                  className="mt-4 ml-[10px]"
                                  textClassName="!text-[14px] font-medium text-t2"
                                ></SeeMore>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </CommonPopover>
                  ) : (
                    <Link
                      to={
                        item.id === "Ecology"
                          ? `${EXTERNAL_LINKS.dashboard}${i18n.language}${item.link}`
                          : item.link || ""
                      }
                      className="text-sm text-t1"
                      target="_blank"
                    >
                      {t(item.name)}
                    </Link>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex items-center gap-[12px] md:gap-[24px]">
        {/* <CommonButton type="outline">
          {t("askAI")}
          <AiStar className="w-4 h-4 md:w-6 md:h-6"></AiStar>
        </CommonButton> */}
        <CommonButton className="max-md:text-xs" onClick={() => window.open(EXTERNAL_LINKS.Bvi)}>
          {t("exploreXone")}
        </CommonButton>
        <MenuPopover></MenuPopover>
        <div className="hidden lg:flex items-center gap-[8px]">
          <LanguagePopover>
            <Language className="text-t1"></Language>
          </LanguagePopover>
          <div className="w-[40px] flex rounded-[10px] hover:bg-b2 items-center justify-center h-[40px]">
            <Theme onClick={() => toggleTheme()} className="text-t1 w-[24px] h-[24px]"></Theme>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
