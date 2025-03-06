import { Box, Container, Heading, Img, Text } from '@chakra-ui/react';

import IMG_Banner from '@/assets/imgs/build/access/banner.png';

type Props = {};

const AccessBanner = (props: Props) => {
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
          <Heading fontSize={{ base: '30px', lg: '48px' }}>Connect to Xone</Heading>
          <Text
            fontSize={{ base: '16px', lg: '20px' }}
            maxW={{ base: '300px', lg: '480px' }}
            fontWeight='500'
            mt='3'
          >
            Access reliable RPC endpoints for Xone’s mainnet and testnet
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default AccessBanner;
