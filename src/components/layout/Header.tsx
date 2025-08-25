import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import LogoIcon from "@/assets/imgs/header/logo.png";
import LogoRedIcon from "@/assets/imgs/header/logo-red.png";
import MenuIcon from "@/assets/svg/home/menu.svg";
import { menus } from "@/constants/menus";

import CommonButton from "../comm/button/CommonButton";
import AiStar from "../Icons/AiStar";
import Arrow from "../Icons/Arrow";
import Language from "../Icons/Language";
import Theme from "../Icons/Theme";

const Header = () => {
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
                <div key={`header-item-${item.text}`}>
                  {item.children && item.children.length > 0 ? (
                    <Popover>
                      {({ open }) => (
                        <>
                          <PopoverButton className="flex items-center gap-1 text-sm font-medium text-t1 focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white">
                            {item.text}
                            <Arrow
                              className={clsx("text-t1", open && "rotate-180")}
                            ></Arrow>
                          </PopoverButton>
                          <PopoverPanel
                            transition
                            anchor="bottom"
                            className="divide-y divide-border1 rounded-xl bg-b1 text-t1 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                          >
                            1111111
                            <div className="p-3">
                              <a
                                className="block rounded-lg px-3 py-2 transition hover:bg-t1/5"
                                href="#"
                              >
                                <p className="font-semibold text-white">
                                  Insights
                                </p>
                                <p className="text-t1/50">
                                  Measure actions your users take
                                </p>
                              </a>
                              <a
                                className="block rounded-lg px-3 py-2 transition hover:bg-b1/5"
                                href="#"
                              >
                                <p className="font-semibold text-t1">
                                  Automations
                                </p>
                                <p className="text-t1/50">
                                  Create your own targeted content
                                </p>
                              </a>
                              <a
                                className="block rounded-lg px-3 py-2 transition hover:bg-b1/5"
                                href="#"
                              >
                                <p className="font-semibold text-white">
                                  Reports
                                </p>
                                <p className="text-t1/50">
                                  Keep track of your growth
                                </p>
                              </a>
                            </div>
                            <div className="p-3">
                              <a
                                className="block rounded-lg px-3 py-2 transition hover:bg-b1/5"
                                href="#"
                              >
                                <p className="font-semibold text-white">
                                  Documentation
                                </p>
                                <p className="text-t1/50">
                                  Start integrating products and tools
                                </p>
                              </a>
                            </div>
                          </PopoverPanel>
                        </>
                      )}
                    </Popover>
                  ) : (
                    <Link to={"11"} className="text-sm text-t1" target="_blank">
                      {item.text}
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
        <img
          alt=""
          src={MenuIcon}
          className="w-[18px] text-t1 h-[18px] md:hidden"
        ></img>
        <div className="hidden md:flex items-center gap-[16px]">
          <Language className="text-t1"></Language>
          <Theme className="text-t1"></Theme>
        </div>
      </div>
    </div>
  );
};

export default Header;
