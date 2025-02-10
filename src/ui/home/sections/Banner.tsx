import { Box, Button, Container, Flex, Heading, Img, Text } from '@chakra-ui/react';

import IMG_bg from '@/assets/imgs/home/bg-pc.png';
import ExternalLink from '@/components/comm/ExternalLink';
import { EXTERNAL_LINKS } from '@/lib/external';

type Props = {};

const Banner = (props: Props) => {
  return (
    <Box
      pt={{ base: '100px', md: 'var(--app-header-height)' }}
      aspectRatio={{ base: '374 / 557', md: '1920 / 960' }}
      bg={{
        // base: `url(${IMG_bg}) center bottom / 100% auto no-repeat #ECEFFF`,
        md: `url(${IMG_bg}) 0 0 / 100% 100%`
      }}
    >
      <Container pt='20px' textAlign={{ base: 'center', md: 'left' }}>
        <Heading fontWeight='700' fontSize={{ base: '36px', md: '48px' }} textAlign='center'>
          Uniting Global Innovation and Opportunity
        </Heading>
        <Flex flexDir={{ base: 'column-reverse', md: 'column' }}>
          <Text mt='20px' textAlign='center'>
            Empowering Connections, Building Together, Winning as One
          </Text>
          <Flex
            alignItems='center'
            mt='30px'
            gap='5'
            justifyContent={{ base: 'center', md: 'center' }}
          >
            <Button
              as='a'
              href={EXTERNAL_LINKS.docs + 'developers/guide'}
              target='_blank'
              rel='noopener noreferrer'
              colorScheme='priRed'
              variant='solid'
              rounded='full'
              h='48px'
              w={{ base: '100%', md: '180px' }}
              color='white'
            >
              Start Building
            </Button>

            <Button
              as='a'
              href={EXTERNAL_LINKS.Bridge}
              target='_blank'
              rel='noopener noreferrer'
              colorScheme='priBlack'
              variant='solid'
              rounded='full'
              h='48px'
              w={{ base: '100%', md: '180px' }}
              color='white'
            >
              Bridge
            </Button>
          </Flex>
        </Flex>
      </Container>
      <Img src={IMG_bg} mt='5' w='full' display={{ md: 'none' }} />
    </Box>
  );
};

export default Banner;
