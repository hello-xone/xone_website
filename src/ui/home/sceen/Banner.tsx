import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';

import IMG_bg from '@/assets/imgs/home/bg-pc.png';
import ExternalLink from '@/components/comm/ExternalLink';
import { EXTERNAL_LINKS } from '@/lib/external';

type Props = {};

const Banner = (props: Props) => {
  return (
    <Box
      aspectRatio={{ base: '374 / 557', md: '1440 / 800' }}
      bg={{
        base: `url(${IMG_bg}) center bottom / 100% auto no-repeat #ECEFFF`,
        md: `url(${IMG_bg}) 0 0 / 100% 100%`
      }}
    >
      <Container pt='80px' textAlign={{ base: 'center', md: 'left' }}>
        <Heading fontWeight='900' fontSize='48px'>
          Uniting Global
          <Box as='br' /> Innovation and Opportunity
        </Heading>
        <Text mt='20px'>Empowering Connections, Building Together, Winning as One</Text>
        <Flex alignItems='center' mt='30px' justifyContent={{ base: 'center', md: 'initial' }}>
          <Button
            as='a'
            href={EXTERNAL_LINKS.docs + 'developers/guide'}
            target='_blank'
            rel='noopener noreferrer'
            colorScheme='priRed'
            variant='solid'
            rounded='full'
            h='64px'
            px='24px'
            color='white'
          >
            Start Building
          </Button>
          <ExternalLink to={EXTERNAL_LINKS.Bridge} ml='40px' fontWeight='bold' fontSize='lg'>
            Bridge
          </ExternalLink>
        </Flex>
      </Container>
    </Box>
  );
};

export default Banner;
