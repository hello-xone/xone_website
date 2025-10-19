import clsx from "clsx";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import TopRightProngIcon from "@/assets/svg/header/top-right-prong.svg?react";
import type { InfoMenuId } from "@/constants/menus";

interface MenuItemProps {
  item: any;
  detailId: InfoMenuId;
  isResource?: boolean;
  onMouseEnter: () => void;
}

const MenuItem = ({
  item,
  detailId,
  onMouseEnter,
  isResource,
}: MenuItemProps) => {
  const { t } = useTranslation("header");
  const navigate = useNavigate();

  const openLink = useCallback(
    (link: string) => {
      if (link) {
        if (item.internalLink) {
          navigate(link);
        } else {
          window.open(link, "_blank");
        }
      }
    },
    [item.internalLink, navigate]
  );

  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={() => openLink(item.link)}
      className={clsx(
        "px-[8px] pr-[18px] py-[10px] w-full group gap-[12px] rounded-[8px] bg-transparent hover:bg-b3 cursor-pointer",
        {
          "!bg-b3": detailId === item.id,
        }
      )}
    >
      <div
        className={clsx(
          "text-t2 w-full shrink-0 flex items-center gap-x-[10px]",
          {
            "!text-t1": detailId === item.id,
            "!gap-x-[20px]": isResource,
          }
        )}
      >
        {item.icon && (
          <img
            src={item.icon}
            alt=""
            className={clsx("shrink-0 w-[48px] h-[48px]", {
              "!text-t1": detailId === item.id,
            })}
          />
        )}
        <div className="flex flex-col gap-y-[3px]">
          <div
            className={clsx(
              "text-[14px] text-t1 w-full font-normal leading-[140%]",
              {
                "flex items-center gap-x-[10px]": isResource,
              }
            )}
          >
            {t(isResource ? item.name : item.title)}
            {isResource && (
              <TopRightProngIcon className="w-[18px] h-[18px] block" />
            )}
          </div>
          <div className="text-[12px] text-t2 leading-[1.5] w-full">
            {t(item.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
