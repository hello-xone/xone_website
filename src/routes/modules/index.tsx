import { Navigate, RouteObject } from 'react-router';
import { lazy } from 'react';
import BaseLayout from '@/components/layout/BaseLayout';

export const Routes: RouteObject[] = [
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/Home.tsx'))
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
