import { lazy } from "react";
import { Navigate, RouteObject } from "react-router";

import BaseLayout from "@/components/layout/BaseLayout";
import Commercial from "@/pages/Commercial";
import DeveloperCenter from "@/pages/DeveloperCenter";
import Events from "@/pages/Events";
import Grants from "@/pages/Grants";
import Home from "@/pages/Home.tsx";
import Lab from "@/pages/Lab";
import Recruitment from "@/pages/Recruitment";
import RecruitmentDetail from "@/pages/RecruitmentDetail";
import VerificationChannel from "@/pages/VerificationChannel";

import { AnimatedRoute } from "./AnimatedRoute";

const withAnimation = (Component: React.ComponentType) => {
  return () => <AnimatedRoute Component={Component} />;
};


export const Routes: RouteObject[] = [
  {
    path: "/",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(Home),
      },
    ],
  },
  {
    path: "/developer",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(DeveloperCenter),
      },
    ],
  },
  {
    path: "/commercial",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(Commercial),
      },
    ],
  },
  {
    path: "/verification-channel",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(VerificationChannel),
      },
    ],
  },
  {
    path: "/events",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(Events),
      },
    ],
  },
  {
    path: "/recruitment",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(Recruitment),
      },
    ],
  },
  {
    path: "/recruitment-detail/:id",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(RecruitmentDetail),
      },
    ],
  },
  {
    path: "/grants",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(Grants),
      },
    ],
  },
  {
    path: "/lab",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(Lab),
      },
    ],
  },
  {
    path: "/404",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: withAnimation(lazy(() => import("@/pages/404"))),
      },
    ],
  },
  {
    path: "*",
    Component: () => {
      return <Navigate to={"/404"} replace />;
    },
  },
];
