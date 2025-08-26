import BusinessIcon from "@/assets/svg/home/business.svg?react";
import KnightIcon from "@/assets/svg/home/knight.svg?react";
import { EXTERNAL_LINKS } from "@/lib/external";

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

interface MenuModel {
  id: string;
  type: NavigationType;
  name: string;
  link?: string;
  group?: Array<{
    id: string;
    title: string;
    icon?: any;
    menuId?: InfoMenuId;
    description: string;
    links?: Array<NavigationLink>;
  }>;
}

export const menus: Array<MenuModel> = [
  {
    id: "learning",
    type: NavigationType.LINK,
    name: "common:headerNav1",
    group: [
      {
        id: "learning_Idea",
        title: "navLearnIdea",
        description: "navLearnIdeaDesc",
        links: [
          {
            id: "learning_Idea_1",
            name: "navLearnIdeaItem1",
            link: EXTERNAL_LINKS.docs + "study/account",
          },
          {
            id: "learning_Idea_2",
            name: "navLearnIdeaItem2",
            link: EXTERNAL_LINKS.docs + "study/xoc",
          },
          {
            id: "learning_Idea_3",
            name: "navLearnIdeaItem3",
            link: EXTERNAL_LINKS.docs + "study/gas",
          },
          {
            id: "learning_Idea_4",
            name: "navLearnIdeaItem4",
            link: EXTERNAL_LINKS.docs + "study/nodes",
          },
          {
            id: "learning_Idea_5",
            name: "navLearnIdeaItem5",
            link: EXTERNAL_LINKS.docs + "study/modules",
          },
          {
            id: "learning_Idea_6",
            name: "navLearnIdeaItem6",
            link: EXTERNAL_LINKS.docs + "study/epoch",
          },
        ],
      },
      {
        id: "learning_Positive",
        title: "navLearnPositive",
        description: "navLearnPositiveDesc",
        links: [
          {
            id: "learning_Positive_1",
            name: "navLearnPositiveItem1",
            link: EXTERNAL_LINKS.docs + "study/donate",
          },
          {
            id: "learning_Positive_2",
            name: "navLearnPositiveItem2",
            link: EXTERNAL_LINKS.docs + "study/release",
          },
        ],
      },
      {
        id: "learning_Resources",
        title: "navLearnResource",
        description: "navLearnResourceDesc",
        links: [
          {
            id: "learning_Resources_1",
            name: "navLearnResourceItem1",
            link: EXTERNAL_LINKS.docs + "study/media",
          },
          {
            id: "learning_Resources_2",
            name: "navLearnResourceItem2",
            link: EXTERNAL_LINKS.docs + "study/contribut",
          },
          {
            id: "learning_Resources_3",
            name: "navLearnResourceItem3",
            link: EXTERNAL_LINKS.docs + "study/wiki",
          },
        ],
      },
    ],
  },
  {
    id: "building",
    type: NavigationType.LINK,
    name: "common:headerNav2",
    group: [
      {
        id: "building_build",
        title: "navBuildingBuild",
        description: "navBuildingBuildDesc",
        links: [
          {
            id: "building_build_1",
            name: "navBuildingBuildItem1",
            link: EXTERNAL_LINKS.docs + "developers/rpc",
          },
          {
            id: "building_build_2",
            name: "navBuildingBuildItem2",
            link: EXTERNAL_LINKS.docs + "developers/explorers",
          },
          {
            id: "building_build_3",
            name: "navBuildingBuildItem3",
            link: EXTERNAL_LINKS.docs + "openapi/overview",
          },
          {
            id: "building_build_4",
            name: "navBuildingBuildItem4",
            link: EXTERNAL_LINKS.docs + "developers/architecture/account",
          },
          {
            id: "building_build_5",
            name: "navBuildingBuildItem5",
            link: EXTERNAL_LINKS.docs + "developers/architecture/transaction",
          },
          {
            id: "building_build_6",
            name: "navBuildingBuildItem6",
            link: EXTERNAL_LINKS.docs + "developers/architecture/replay",
          },
        ],
      },
      {
        id: "building_tool",
        title: "navBuildingTool",
        description: "navBuildingToolDesc",
        links: [
          {
            id: "building_tool_1",
            name: "navBuildingToolItem1",
            link: "https://remix.ethereum.org/",
          },
          {
            id: "building_tool_2",
            name: "navBuildingToolItem2",
            link: "https://www.openzeppelin.com/",
          },
          {
            id: "building_tool_3",
            name: "navBuildingToolItem3",
            link: "https://hardhat.org/",
          },
          {
            id: "building_tool_4",
            name: "navBuildingToolItem4",
            link: "https://trufflesuite.com/",
          },
          {
            id: "building_tool_5",
            name: "navBuildingToolItem5",
            link: "https://soliditylang.org/",
          },
        ],
      },
      {
        id: "building_resource",
        title: "navBuildingResource",
        description: "navBuildingResourceDesc",
        links: [
          {
            id: "building_resource_1",
            name: "navBuildingResourceItem1",
            internalLink: true,
            link: "/developer",
          },
          {
            id: "building_resource_2",
            name: "navBuildingResourceItem2",
            link: "https://faucet.xone.org/",
          },
          {
            id: "building_resource_3",
            name: "navBuildingResourceItem3",
            link: EXTERNAL_LINKS.docs + "developers/tools",
          },
          {
            id: "building_resource_4",
            name: "navBuildingResourceItem4",
            link: EXTERNAL_LINKS.docs + "study/bug",
          },
          {
            id: "building_resource_5",
            name: "navBuildingResourceItem5",
            link: EXTERNAL_LINKS.docs + "study/dapp",
          },
          {
            id: "building_resource_6",
            name: "navBuildingResourceItem6",
            link: EXTERNAL_LINKS.Github,
          },
        ],
      },
    ],
  },
  {
    id: "Governance",
    type: NavigationType.LINK,
    name: "common:headerNav5",
    group: [
      {
        id: "learning_Idea",
        title: "navLearnIdea",
        description: "navLearnIdeaDesc",
        links: [
          {
            id: "learning_Idea_1",
            name: "navLearnIdeaItem1",
            link: EXTERNAL_LINKS.docs + "study/account",
          },
          {
            id: "learning_Idea_2",
            name: "navLearnIdeaItem2",
            link: EXTERNAL_LINKS.docs + "study/xoc",
          },
          {
            id: "learning_Idea_3",
            name: "navLearnIdeaItem3",
            link: EXTERNAL_LINKS.docs + "study/gas",
          },
          {
            id: "learning_Idea_4",
            name: "navLearnIdeaItem4",
            link: EXTERNAL_LINKS.docs + "study/nodes",
          },
          {
            id: "learning_Idea_5",
            name: "navLearnIdeaItem5",
            link: EXTERNAL_LINKS.docs + "study/modules",
          },
          {
            id: "learning_Idea_6",
            name: "navLearnIdeaItem6",
            link: EXTERNAL_LINKS.docs + "study/epoch",
          },
        ],
      },
      {
        id: "learning_Positive",
        title: "navLearnPositive",
        description: "navLearnPositiveDesc",
        links: [
          {
            id: "learning_Positive_1",
            name: "navLearnPositiveItem1",
            link: EXTERNAL_LINKS.docs + "study/donate",
          },
          {
            id: "learning_Positive_2",
            name: "navLearnPositiveItem2",
            link: EXTERNAL_LINKS.docs + "study/release",
          },
        ],
      },
      {
        id: "learning_Resources",
        title: "navLearnResource",
        description: "navLearnResourceDesc",
        links: [
          {
            id: "learning_Resources_1",
            name: "navLearnResourceItem1",
            link: EXTERNAL_LINKS.docs + "study/media",
          },
          {
            id: "learning_Resources_2",
            name: "navLearnResourceItem2",
            link: EXTERNAL_LINKS.docs + "study/contribut",
          },
          {
            id: "learning_Resources_3",
            name: "navLearnResourceItem3",
            link: EXTERNAL_LINKS.docs + "study/wiki",
          },
        ],
      },
    ],
  },
  {
    id: "Ecology",
    type: NavigationType.LINK,
    name: "common:headerNav3",
    link: "/ecology",
  },
  {
    id: "global",
    type: NavigationType.INFO,
    name: "common:headerNav4",
    group: [
      {
        id: "global_knight",
        title: "navGlobalKnight",
        icon: KnightIcon,
        menuId: InfoMenuId.KNIGHT,
        description: "navGlobalKnightDesc",
      },
      {
        id: "global_business",
        title: "navGlobalBusiness",
        icon: BusinessIcon,
        menuId: InfoMenuId.BUSINESS,
        description: "navGlobalBusinessDesc",
      },
    ],
  },
];
