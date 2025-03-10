import { Box, Center, Spinner } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router';

import Footer from './Footer';
import Header from './Header';

type Props = {};

const BaseLayout = (props: Props) => {
  return (
    <Box>
      <Header />
      <Box as='main'>
        <Suspense
          fallback={
            <Center h='400px'>
              <Spinner boxSize='32px' />
            </Center>
          }
        >
          <Outlet />
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
};

export default BaseLayout;
