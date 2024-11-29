import React from 'react';
import Banner from './sceen/Banner';
import { Box, Container, Heading, Img, Text } from '@chakra-ui/react';
import IMG_raisecup from '@/assets/imgs/home/raisecup.png';
import RedButton from '@/components/comm/button/RedButton';
import HelloXone from './sceen/HelloXone';
import Grids from './sceen/Grids';
import Ecosystem from './sceen/Ecosystem';
import Logic from './sceen/Logic';
import Embrace from './sceen/Embrace';
import { EXTERNAL_LINKS } from '@/lib/external';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Box>
      <Banner />
      <Box py='60px'>
        <Container display={{ md: 'flex' }} alignItems='center'>
          <Box flex='1'>
            <Heading>Reliable,community-driven governance</Heading>
            <Text color='gray.500' mt='20px'>
              The crypto industry’s most human-centered, fair governance model.
            </Text>
            <RedButton mt='20px' size='lg' to={EXTERNAL_LINKS.docs + 'study/xone'}>
              Learn more
            </RedButton>
          </Box>
          <Box flexShrink='0' mt={{ base: '10', md: '0' }}>
            <Img src={IMG_raisecup} />
          </Box>
        </Container>
      </Box>
      <HelloXone />
      <Grids />
      <Ecosystem />
      <Logic />
      <Embrace />
    </Box>
  );
};

export default HomePage;
