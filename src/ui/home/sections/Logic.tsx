import { Box, Container, Heading, Img, Text } from '@chakra-ui/react';

import IMG_Logic from '@/assets/imgs/home/logic.png';
import OutlineButton from '@/components/comm/button/RedButton';

type Props = {};

const Logic = (props: Props) => {
  return (
    <Box py='60px'>
      <Container>
        <Box display={{ lg: 'flex' }} alignItems='center'>
          <Box>
            <Heading fontSize='32px'>Reliable, community-driven governance</Heading>
            <Text mt='4' color='steelGray' maxW='760px'>
              XONE introduces on-chain behavior valueincentives, enabling fair and dynamic
              rewardsthat recognize and motivate communitycontributions, driving sustainable
              ecosystemgrowth and collaboration.
            </Text>
            <OutlineButton
              mt='5'
              size='lg'
              sx={{
                '--chakra-colors-priRed-500': 'black'
              }}
            >
              Get started
            </OutlineButton>
          </Box>
          <Box ml='auto' mt={{ base: '10', lg: '0' }}>
            <Img src={IMG_Logic} maxW='100%' w='520px' />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Logic;
