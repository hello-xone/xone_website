import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router';

import BaseLayout from '@/components/layout/BaseLayout';

export const Routes: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/Home.tsx'))
      },
      {
        path: 'apps',
        children: [
          {
            index: true,
            Component: lazy(() => import('@/pages/apps/Apps.tsx'))
          }
        ]
      },
      {
        path: 'build',
        children: [
          {
            index: true,
            Component: lazy(() => import('@/pages/build/Build.tsx'))
          },
          {
            path: 'access',
            Component: lazy(() => import('@/pages/build/access/Access'))
          }
        ]
      },
      {
        path: 'release',
        children: [
          {
            index: true,
            Component: lazy(() => import('@/pages/release/Release.tsx'))
          }
        ]
      }
    ]
  },
  {
    path: '404',
    Component: lazy(() => import('@/pages/404.tsx'))
  },
  {
    path: '*',
    Component: () => {
      return <Navigate to={'/404'} replace />;
    }
  }
];
