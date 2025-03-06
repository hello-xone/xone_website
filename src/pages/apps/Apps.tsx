import { Box } from '@chakra-ui/react';
import React from 'react';

import AppsBanner from '@/ui/apps/sections/AppsBanner';
import AppsContainer from '@/ui/apps/sections/AppsContainer';

type Props = {};

const Apps = (props: Props) => {
  return (
    <Box pb='80px' bgColor='#F2F4F8'>
      <AppsBanner />
      <AppsContainer />
    </Box>
  );
};

export default Apps;
