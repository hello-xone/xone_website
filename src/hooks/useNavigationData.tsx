import { ReactElement, useMemo } from "react";
import KnightIcon from "@/assets/svg/home/knight.svg?react";
import BusinessIcon from "@/assets/svg/home/business.svg?react";
import { useTranslation } from "react-i18next";
import { EXTERNAL_LINKS } from "@/constants/external";

export interface NavigationLink {
  id: string;
  name: string;
  link: string;
  internalLink?: boolean;
}

export enum NavigationType {
  LINK = "link",
  INFO = "info",
}

export enum InfoMenuId {
  KNIGHT = "knight",
  BUSINESS = "business",
}

export interface NavigationGroup {
  id: string;
  title: string;
  description: string;
  icon?: ReactElement;
  links?: NavigationLink[];
  menuId?: InfoMenuId;
}

export interface NavigationData {
  id: string;
  type: NavigationType;
  name: string;
  link?: string;
  internalLink?: boolean;
  group?: NavigationGroup[];
}

export const useNavigationData = () => {
  const { t, i18n } = useTranslation("common");

  const data: NavigationData[] = useMemo(() => {
    return [
      {
        id: "learning",
        type: NavigationType.LINK,
        name: t("common:headerNav1"),
        group: [
          {
            id: "learning_Idea",
            title: t("navLearnIdea"),
            description: t("navLearnIdeaDesc"),
            links: [
              {
                id: "learning_Idea_1",
                name: t("navLearnIdeaItem1"),
                link: EXTERNAL_LINKS.docs + "study/account",
              },
              {
                id: "learning_Idea_2",
                name: t("navLearnIdeaItem2"),
                link: EXTERNAL_LINKS.docs + "study/xoc",
              },
              {
                id: "learning_Idea_3",
                name: t("navLearnIdeaItem3"),
                link: EXTERNAL_LINKS.docs + "study/gas",
              },
              {
                id: "learning_Idea_4",
                name: t("navLearnIdeaItem4"),
                link: EXTERNAL_LINKS.docs + "study/nodes",
              },
              {
                id: "learning_Idea_5",
                name: t("navLearnIdeaItem5"),
                link: EXTERNAL_LINKS.docs + "study/modules",
              },
              {
                id: "learning_Idea_6",
                name: t("navLearnIdeaItem6"),
                link: EXTERNAL_LINKS.docs + "study/epoch",
              },
            ],
          },
          {
            id: "learning_Positive",
            title: t("navLearnPositive"),
            description: t("navLearnPositiveDesc"),
            links: [
              {
                id: "learning_Positive_1",
                name: t("navLearnPositiveItem1"),
                link: EXTERNAL_LINKS.docs + "study/donate",
              },
              {
                id: "learning_Positive_2",
                name: t("navLearnPositiveItem2"),
                link: EXTERNAL_LINKS.docs + "study/release",
              },
            ],
          },
          {
            id: "learning_Resources",
            title: t("navLearnResource"),
            description: t("navLearnResourceDesc"),
            links: [
              {
                id: "learning_Resources_1",
                name: t("navLearnResourceItem1"),
                link: EXTERNAL_LINKS.docs + "study/media",
              },
              {
                id: "learning_Resources_2",
                name: t("navLearnResourceItem2"),
                link: EXTERNAL_LINKS.docs + "study/contribut",
              },
              {
                id: "learning_Resources_3",
                name: t("navLearnResourceItem3"),
                link: EXTERNAL_LINKS.docs + "study/wiki",
              },
            ],
          },
        ],
      },
      {
        id: "building",
        type: NavigationType.LINK,
        name: t("common:headerNav2"),
        group: [
          {
            id: "building_build",
            title: t("navBuildingBuild"),
            description: t("navBuildingBuildDesc"),
            links: [
              {
                id: "building_build_1",
                name: t("navBuildingBuildItem1"),
                link: EXTERNAL_LINKS.docs + "developers/rpc",
              },
              {
                id: "building_build_2",
                name: t("navBuildingBuildItem2"),
                link: EXTERNAL_LINKS.docs + "developers/explorers",
              },
              {
                id: "building_build_3",
                name: t("navBuildingBuildItem3"),
                link: EXTERNAL_LINKS.docs + "openapi/overview",
              },
              {
                id: "building_build_4",
                name: t("navBuildingBuildItem4"),
                link: EXTERNAL_LINKS.docs + "developers/architecture/account",
              },
              {
                id: "building_build_5",
                name: t("navBuildingBuildItem5"),
                link: EXTERNAL_LINKS.docs + "developers/architecture/transaction",
              },
              {
                id: "building_build_6",
                name: t("navBuildingBuildItem6"),
                link: EXTERNAL_LINKS.docs + "developers/architecture/replay",
              },
            ],
          },
          {
            id: "building_tool",
            title: t("navBuildingTool"),
            description: t("navBuildingToolDesc"),
            links: [
              {
                id: "building_tool_1",
                name: t("navBuildingToolItem1"),
                link: "https://remix.ethereum.org/",
              },
              {
                id: "building_tool_2",
                name: t("navBuildingToolItem2"),
                link: "https://www.openzeppelin.com/",
              },
              {
                id: "building_tool_3",
                name: t("navBuildingToolItem3"),
                link: "https://hardhat.org/",
              },
              {
                id: "building_tool_4",
                name: t("navBuildingToolItem4"),
                link: "https://trufflesuite.com/",
              },
              {
                id: "building_tool_5",
                name: t("navBuildingToolItem5"),
                link: "https://soliditylang.org/",
              },
            ],
          },
          {
            id: "building_resource",
            title: t("navBuildingResource"),
            description: t("navBuildingResourceDesc"),
            links: [
              {
                id: "building_resource_1",
                name: t("navBuildingResourceItem1"),
                internalLink: true,
                link: "/developer",
              },
              {
                id: "building_resource_2",
                name: t("navBuildingResourceItem2"),
                link: "https://faucet.xone.org/",
              },
              {
                id: "building_resource_3",
                name: t("navBuildingResourceItem3"),
                link: EXTERNAL_LINKS.docs + "developers/tools",
              },
              {
                id: "building_resource_4",
                name: t("navBuildingResourceItem4"),
                link: EXTERNAL_LINKS.docs + "study/bug",
              },
              {
                id: "building_resource_5",
                name: t("navBuildingResourceItem5"),
                link: EXTERNAL_LINKS.docs + "study/dapp",
              },
              {
                id: "building_resource_6",
                name: t("navBuildingResourceItem6"),
                link: EXTERNAL_LINKS.Github,
              },
            ],
          },
        ],
      },
      {
        id: "Ecology",
        type: NavigationType.LINK,
        name: t("common:headerNav3"),
        link: EXTERNAL_LINKS.dashboard + i18n.language + "/ecology",

      },
      {
        id: "global",
        type: NavigationType.INFO,
        name: t("common:headerNav4"),
        group: [
          {
            id: "global_knight",
            title: t("navGlobalKnight"),
            icon: <KnightIcon></KnightIcon>,
            menuId: InfoMenuId.KNIGHT,
            description: t("navGlobalKnightDesc"),
          },
          {
            id: "global_business",
            title: t("navGlobalBusiness"),
            icon: <BusinessIcon></BusinessIcon>,
            menuId: InfoMenuId.BUSINESS,
            description: t("navGlobalBusinessDesc"),
          },
        ],
      },
    ];
  }, [i18n.language]);
  return {
    data,
  };
};
