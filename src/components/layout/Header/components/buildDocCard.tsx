import clsx from "clsx";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import SolutionStructureBuildDocMainIconDark from "@/assets/svg/header/structure/build-doc/dark/main.svg?react";
import SolutionStructureBuildDocMainIconLight from "@/assets/svg/header/structure/build-doc/light/main.svg?react";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { EXTERNAL_LINKS } from "@/constants/external";
import type { NavigationLink } from "@/constants/menus";
import useApplicationStore from "@/store/applicationStore";

const BuildDocCard = ({ group }: { group: any }) => {
  const { t } = useTranslation("header");
  const { isLight } = useApplicationStore();

  const [hoveredId, setHoveredId] = useState<string | null>("");

  const openLink = useCallback((link: string) => {
    if (link) {
      window.open(link, "_blank");
    }
  }, []);

  if (!group) return null;

  const MainIcon = isLight
    ? SolutionStructureBuildDocMainIconLight
    : SolutionStructureBuildDocMainIconDark;

  return (
    <div className="flex flex-col flex-1 w-[545px]">
      <div className="flex flex-col gap-y-[14px]">
        <MainIcon className="w-full h-[202px]" />
        <div className="flex gap-x-[20px] px-[6px]">
          {group.links?.map((item: NavigationLink) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onClick={() => openLink(item.link)}
              className={clsx(
                "w-[82px] h-[30px] flex items-center justify-center text-[14px] text-t1 font-normal rounded-[5px] cursor-pointer",
                {
                  "bg-[var(--link1)] text-b1": hoveredId === item.id,
                  "!text-[#fff]": hoveredId === item.id,
                }
              )}
            >
              {t(item.name)}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[15px] w-fit px-[6px]">
        <SeeMore
          textClassName="!text-[14px] !font-normal"
          href={EXTERNAL_LINKS.docs + "developers/ready"}
          text={t("viewMore")}
        />
      </div>
    </div>
  );
};

export default BuildDocCard;
