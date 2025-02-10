import { Box, Container, Heading, Img, Text } from '@chakra-ui/react';

import IMG_1CH from '@/assets/imgs/home/1CH.png';
import OutlineButton from '@/components/comm/button/RedButton';
import { EXTERNAL_LINKS } from '@/lib/external';

import Banner from './sections/Banner';
import Ecosystem from './sections/Ecosystem';
import Embrace from './sections/Embrace';
import Grids from './sections/Grids';
import HelloXone from './sections/HelloXone';
import Logic from './sections/Logic';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Box>
      <Banner />

      <Box mt={{ base: '40px', md: '120px' }}>
        <Container
          display={{ lg: 'flex' }}
          alignItems='center'
          bgColor='priRed.50'
          rounded='15px'
          py='20px'
          px={{ base: '20px', lg: '60px' }}
        >
          <Box flex='1'>
            <Heading fontSize={{ base: '20px', md: '40px' }} fontWeight='600'>
              Reliable,community-driven governance
            </Heading>
            <Text mt='20px' fontSize='14px' color='#718096'>
              The crypto industry’s most human-centered, fair governance model.
            </Text>
            <OutlineButton
              sx={{
                '--chakra-colors-priRed-500': '#FF0420'
              }}
              mt='40px'
              size='lg'
              to={EXTERNAL_LINKS.docs + 'study/xone'}
            >
              Learn more
            </OutlineButton>
          </Box>
          <Box flexShrink='0' mt={{ base: '10', md: '0' }}>
            <Img src={IMG_1CH} mx={{ base: 'auto' }} />
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
