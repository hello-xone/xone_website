import { Box, Button, Container, Heading, Img, Text } from '@chakra-ui/react';
import React from 'react';
import ExternalLink from '@/components/comm/ExternalLink';
import { EXTERNAL_LINKS } from '@/lib/external';

import IMG_Banner from '@/assets/imgs/apps/banner.png';

type Props = {};

const AppsBanner = (props: Props) => {
  return (
    <Box w='full' h={{ base: '400px', lg: '500px' }} position='relative'>
      <Img
        src={IMG_Banner}
        height={{ base: '400px', lg: 'full' }}
        width={{ base: '1200px', lg: 'full' }}
        position='absolute'
        objectFit='cover'
        objectPosition={{ base: '70% bottom', lg: 'initial' }}
        inset={0}
        zIndex={1}
        draggable={false}
        // right={{ base: '-10%', md: '0' }}
        // bottom='0'
      />
      <Container pt={{ base: '100px', lg: '150px' }} position='relative' zIndex={1}>
        <Box>
          <Heading fontSize={{ base: '30px', lg: '48px' }}>
            XONE Ecosystem apps
            <br /> and integrations overview
          </Heading>
        </Box>
        <Button size='2xl' mt='10' colorScheme='priBlack' rounded='full' >
          <ExternalLink to={EXTERNAL_LINKS.Suggest_Dapp}>Submit DApps</ExternalLink>
        </Button>
      </Container>
    </Box>
  );
};

export default AppsBanner;
