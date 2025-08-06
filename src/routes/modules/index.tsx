import { lazy } from "react";
import { Navigate, RouteObject } from "react-router";
import BaseLayout from "@/components/layout/BaseLayout";
import Home from "@/pages/Home.tsx";
import DeveloperCenter from "@/pages/DeveloperCenter";
import Commercial from "@/pages/Commercial";
export const Routes: RouteObject[] = [
  {
    path: "/",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/developer",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: DeveloperCenter,
      },
    ],
  },
  {
    path: "/commercial",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: Commercial,
      },
    ],
  },
  {
    path: "/404",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: lazy(() => import("@/pages/404")),
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
