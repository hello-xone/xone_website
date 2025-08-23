import { lazy } from "react";
import { Navigate, RouteObject } from "react-router";

import BaseLayout from "@/components/layout/BaseLayout";
import Commercial from "@/pages/Commercial";
import DeveloperCenter from "@/pages/DeveloperCenter";
import Home from "@/pages/Home.tsx";
import VerificationChannel from "@/pages/VerificationChannel";

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
    path: "/verificationChannel",
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: VerificationChannel,
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
