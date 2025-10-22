import clsx from "clsx";
import { useTranslation } from "react-i18next";

import TopRightProngIcon from "@/assets/svg/header/top-right-prong.svg?react";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { EXTERNAL_LINKS } from "@/constants/external";
import type { NavigationLink } from "@/constants/menus";

const SolutionCard = ({
  group,
  onClose,
}: {
  group: any;
  onClose?: () => void;
}) => {
  const { t, i18n } = useTranslation("header");

  if (!group) return null;

  const isApplicationLayer = group.id === "application_layer";

  return (
    <div
      className={clsx("flex flex-col flex-1 w-[545px]", {
        "pb-[6px]": !isApplicationLayer,
      })}
    >
      <div className="w-full flex flex-col gap-y-[24px]">
        {group.mainIcon && (
          <img src={group.mainIcon} alt="" className="w-full h-[202px]" />
        )}
        <div className="flex gap-[12px] flex-wrap px-[5px]">
          {group.links?.map((item: NavigationLink) => (
            <div
              key={item.id}
              className="w-[calc(50%-10px)] flex gap-x-[10px] items-center p-[6px] cursor-pointer"
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt=""
                  className="w-[48px] h-[48px] block"
                />
              )}
              <div className="flex-1 flex flex-col gap-y-[2px]">
                <div className="flex items-center gap-x-[10px]">
                  <h3 className="text-[14px] text-t1 font-normal">
                    {t(item.name)}
                  </h3>
                  <TopRightProngIcon className="w-[18px] h-[18px] block" />
                </div>
                <p className="text-[12px] text-t2 leading-[1.5]">
                  {item.description && t(item.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isApplicationLayer && (
        <div className="ml-[10px] mt-[12px] w-fit">
          <SeeMore
            textClassName="!text-[14px] !font-normal"
            href={EXTERNAL_LINKS.dashboard + i18n.language + "/ecology"}
            text={t("viewMore")}
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
};

export default SolutionCard;
