import RedButton from '@/components/comm/button/RedButton';
import { Box, Container, Flex, Heading, Img, Text } from '@chakra-ui/react';
import IMG_Logic from '@/assets/imgs/home/logic.png';

type Props = {};

const Logic = (props: Props) => {
  return (
    <Box py='60px'>
      <Container>
        <Box display={{ lg: 'flex' }} alignItems='center'>
          <Box>
            <Heading fontSize='32px'>Smart Treasury</Heading>
            <Text mt='4' color='gray.500' maxW='760px'>
              XONE introduces on-chain behavior value incentives, enabling fair and dynamic rewards
              that recognize and motivate community contributions, driving sustainable ecosystem
              growth and collaboration.
            </Text>
            <RedButton mt='5' size='lg'>
              Get started
            </RedButton>
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
