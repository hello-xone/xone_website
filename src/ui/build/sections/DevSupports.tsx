import { Box, Container, Grid, GridItem, Heading, Icon, Link, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';

import IconBook from '@/assets/imgs/build/devSupports/book.svg?react';
import IMG_Dev from '@/assets/imgs/build/devSupports/dev-s.png';
import IconDocumentation from '@/assets/imgs/build/devSupports/documentation.svg?react';
import IconTelegram from '@/assets/imgs/build/devSupports/telegram.svg?react';
import RouteLink from '@/components/comm/RouteLink';
import { EXTERNAL_LINKS } from '@/lib/external';

type Props = {};

const DevSupports = (props: Props) => {
  return (
    <Box mt='80px'>
      <Container>
        <Heading size='xl'>Dev Supports</Heading>
        <Grid
          mt='5'
          templateRows={{ base: '340px 160px 160px auto', lg: 'repeat(2, 280px)' }}
          templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={{ base: '2', lg: '4' }}
          color='white'
          css={css`
            > div {
              border-radius: 20px;
            }
          `}
        >
          <GridItem
            rowSpan={2}
            colSpan={2}
            bgColor=''
            p='5'
            alignContent='end'
            background={`url(${IMG_Dev}) right bottom / cover no-repeat`}
            position='relative'
            _after={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 1,
              background:
                'linear-gradient(180deg, rgba(138, 54, 251, 0.3) 0%, rgba(18, 9, 30, 0) 49.88%, rgba(0, 43, 197, 0.5) 100%)'
            }}
          >
            <Box position='relative' zIndex={2}>
              <Heading fontSize={{ base: '24px', lg: '30px' }}>Sumbit your apps</Heading>
              <Text fontSize={{ base: '14px', lg: 'xl' }} mt='10'>
                Share your apps with the community to showcase your work, attract feedback, and
                expand your user base. Gain visibility and connect with other developers by bringing
                your innovations to a wider audience.
              </Text>
            </Box>
          </GridItem>
          <GridItem bgColor='#59C76C' textAlign='center' alignContent='center'>
            <RouteLink to={EXTERNAL_LINKS.docs + 'developers/ready'}>
              <Icon as={IconDocumentation} boxSize={{ base: '64px', lg: '98px' }} />
              <Heading fontSize={{ base: '16px', lg: '30px' }}>Documentation</Heading>
            </RouteLink>
          </GridItem>
          <GridItem bgColor='#41B4E6' textAlign='center' alignContent='center'>
            <RouteLink to={EXTERNAL_LINKS.TelegramDevelopers}>
              <Icon as={IconTelegram} boxSize={{ base: '64px', lg: '98px' }} />
              <Heading fontSize={{ base: '16px', lg: '30px' }}>Telegram</Heading>
            </RouteLink>
          </GridItem>
          <GridItem
            colSpan={2}
            bgColor='#EA9974'
            textAlign='center'
            alignContent='center'
            h={{ base: '280px', lg: 'initial' }}
          >
            <Icon as={IconBook} boxSize='98px' />
            <Heading fontSize={{ base: '24px', lg: '30px' }}>How can we help?</Heading>
            <Link textDecor='underline' href='mailto:developers@xone.org'>
              developers@xone.org
            </Link>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default DevSupports;
