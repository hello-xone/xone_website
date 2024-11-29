import React, { Suspense } from 'react';
import { Outlet } from 'react-router';

type Props = {};

const AppLayout = (props: Props) => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;
