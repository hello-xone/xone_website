import clsx from "clsx";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import SolutionStructureBuildDocList01IconDark from "@/assets/svg/header/structure/build-doc/dark/list/icon-01.svg";
import SolutionStructureBuildDocList02IconDark from "@/assets/svg/header/structure/build-doc/dark/list/icon-02.svg";
import SolutionStructureBuildDocList03IconDark from "@/assets/svg/header/structure/build-doc/dark/list/icon-03.svg";
import SolutionStructureBuildDocList04IconDark from "@/assets/svg/header/structure/build-doc/dark/list/icon-04.svg";
import SolutionStructureBuildDocList05IconDark from "@/assets/svg/header/structure/build-doc/dark/list/icon-05.svg";
import SolutionStructureBuildDocMainIconDark from "@/assets/svg/header/structure/build-doc/dark/main.svg?react";
import SolutionStructureBuildDocList01IconLight from "@/assets/svg/header/structure/build-doc/light/list/icon-01.svg";
import SolutionStructureBuildDocList02IconLight from "@/assets/svg/header/structure/build-doc/light/list/icon-02.svg";
import SolutionStructureBuildDocList03IconLight from "@/assets/svg/header/structure/build-doc/light/list/icon-03.svg";
import SolutionStructureBuildDocList04IconLight from "@/assets/svg/header/structure/build-doc/light/list/icon-04.svg";
import SolutionStructureBuildDocList05IconLight from "@/assets/svg/header/structure/build-doc/light/list/icon-05.svg";
import SolutionStructureBuildDocMainIconLight from "@/assets/svg/header/structure/build-doc/light/main.svg?react";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { EXTERNAL_LINKS } from "@/constants/external";
import type { NavigationLink } from "@/constants/menus";
import useApplicationStore from "@/store/applicationStore";

import MenuItem from "./menuItem";

const BuildDocCard = ({
  group,
  onClose,
}: {
  group: any;
  onClose?: () => void;
}) => {
  const { t } = useTranslation("header");
  const { isLight } = useApplicationStore();

  const [hoveredId, setHoveredId] = useState<string | null>(group.links[0].id);

  const openLink = useCallback(
    (link: string) => {
      if (link) {
        if (onClose) {
          onClose();
        }
        window.open(link, "_blank");
      }
    },
    [onClose]
  );

  const MainIcon = isLight
    ? SolutionStructureBuildDocMainIconLight
    : SolutionStructureBuildDocMainIconDark;

  const rightList = useMemo(() => {
    return [
      {
        id: "structure_build_doc_right_01",
        title: "structureBuildDocRightTitle01",
        description: "structureBuildDocRightDesc01",
        icon: isLight
          ? SolutionStructureBuildDocList01IconLight
          : SolutionStructureBuildDocList01IconDark,
        link: EXTERNAL_LINKS.docs + "developers/rpc",
      },
      {
        id: "structure_build_doc_right_02",
        title: "structureBuildDocRightTitle02",
        description: "structureBuildDocRightDesc02",
        icon: isLight
          ? SolutionStructureBuildDocList02IconLight
          : SolutionStructureBuildDocList02IconDark,
        link: EXTERNAL_LINKS.docs + "openapi/overview",
      },
      {
        id: "structure_build_doc_right_03",
        title: "structureBuildDocRightTitle03",
        description: "structureBuildDocRightDesc03",
        icon: isLight
          ? SolutionStructureBuildDocList03IconLight
          : SolutionStructureBuildDocList03IconDark,
        link: EXTERNAL_LINKS.docs + "developers/operators/practices",
      },
      {
        id: "structure_build_doc_right_04",
        title: "structureBuildDocRightTitle04",
        description: "structureBuildDocRightDesc04",
        icon: isLight
          ? SolutionStructureBuildDocList04IconLight
          : SolutionStructureBuildDocList04IconDark,
        link: EXTERNAL_LINKS.docs + "developers/contracts",
      },
      {
        id: "structure_build_doc_right_05",
        title: "structureBuildDocRightTitle05",
        description: "structureBuildDocRightDesc05",
        icon: isLight
          ? SolutionStructureBuildDocList05IconLight
          : SolutionStructureBuildDocList05IconDark,
        link: EXTERNAL_LINKS.docs + "developers/token",
      },
    ];
  }, [isLight]);

  if (!group) return null;

  return (
    <div className="flex flex-1 gap-x-[16px]">
      <div className="flex flex-col w-[545px]">
        <div className="flex flex-col gap-y-[14px]">
          <MainIcon className="w-full h-[202px]" />
          <div className="flex gap-x-[20px] px-[6px]">
            {group.links?.map((item: NavigationLink) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onClick={() => openLink(item.link)}
                className={clsx(
                  "w-fit px-[20px] h-[30px] flex items-center justify-center text-[14px] text-t1 font-normal rounded-[5px] cursor-pointer",
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
            onClick={onClose}
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-y-[5px] w-[320px]">
        {rightList.map((gel: any) => (
          <MenuItem
            key={`children-item-${gel.id}`}
            item={gel}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
};

export default BuildDocCard;
