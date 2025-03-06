import { Box, Button, Container, Flex, Heading, Img, Text } from '@chakra-ui/react';

import IMG_Circle from '@/assets/imgs/build/circle.png';
import ExternalLink from '@/components/comm/ExternalLink';
import { EXTERNAL_LINKS } from '@/lib/external';

type Props = {};

const Banner = (props: Props) => {
  return (
    <Box
      w='full'
      h='500px'
      position='relative'
      background='linear-gradient(180deg, #B7E3F9 0%, #FCFEFE 72.8%)'
    >
      <Img
        src={IMG_Circle}
        w={{ lg: '980px' }}
        position='absolute'
        right={{ base: '-10%', md: '0' }}
        bottom='0'
      />
      <Container pt='100px'>
        <Box>
          <Heading fontSize='48px'>Developer Hub</Heading>
          <Text fontSize='20px' maxW='480px' fontWeight='500' mt='3'>
            Your go-to for applications development, smart contracts, and Xone exploration.
          </Text>
          <Flex
            flexDir={{ base: 'column', lg: 'row' }}
            alignItems={{ lg: 'center' }}
            mt='10'
            gap='5'
          >
            <Button
              colorScheme='priBlack'
              rounded='full'
              size={{ base: 'lg', lg: '2xl' }}
              w='190px'
            >
              <ExternalLink to={EXTERNAL_LINKS.docs + 'developers/guide'}>View Docs</ExternalLink>
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
