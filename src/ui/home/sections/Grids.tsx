import {
  Box,
  BoxProps,
  Container,
  Grid,
  GridItem,
  Heading,
  Img,
  ImgProps,
  Text
} from '@chakra-ui/react';

import IMG_Cube from '@/assets/imgs/home/cube.png';
import IMG_Reward from '@/assets/imgs/home/reward.png';
import OutlineButton from '@/components/comm/button/RedButton';
import { EXTERNAL_LINKS } from '@/lib/external';

type Props = {};

const Grids = (props: Props) => {
  return (
    <Box
      py='60px'
      sx={
        {
          // '--chakra-colors-priRed-500': 'black'
        }
      }
    >
      <Container>
        <Grid
          display={{ base: 'flex', lg: 'grid' }}
          flexDir='column'
          templateRows='repeat(2, 280px)'
          templateColumns='repeat(3, 1fr)'
          gap={6}
        >
          <GridItem rowSpan={2}>
            <FeatureCard
              title='Build with Xone'
              description='Xone is a high-performance, interoperable blockchain platform combining EVM compatibility with Cosmos modularity.'
              bg='#F0F8FF'
              buttonText='Learn more'
              buttonLink={EXTERNAL_LINKS.docs + 'developers/ready'}
              imageSrc={IMG_Cube}
              boxProps={{
                flexDir: { base: 'column', lg: 'column' }
              }}
              imgBoxProps={{
                sx: {
                  '>img': {
                    w: 'full',
                    maxW: '330px',
                    mx: 'auto',
                    mt: '40px'
                  }
                }
              }}
            />
          </GridItem>
          <GridItem>
            <FeatureCard
              title='Deploy an app'
              description='Deploy your app on the Xone chain and join one of the fastest-growing EVM ecosystems.'
              bg='#FFF0FD'
              buttonText='Get started'
            />
          </GridItem>
          <GridItem>
            <FeatureCard
              title='A more equitable financial system'
              description='Provides equal access, empowering all through transparency, reduced barriers, and inclusive opportunities for sustainable economic growth.'
              bg='#EBFAF9'
              buttonText='Explore Defi'
            />
          </GridItem>
          <GridItem colSpan={2}>
            <FeatureCard
              title='Start a node'
              description='Join the network to earn greater rewards.'
              bg='#FFF0F0'
              buttonText='Get started'
              imageSrc={IMG_Reward}
              boxProps={{
                alignItems: { lg: 'center' },
                flexDir: { base: 'column', lg: 'row' }
              }}
              imgBoxProps={{
                sx: {
                  '>img': {
                    maxW: '330px',
                    mx: 'auto',
                    mt: { base: '40px', lg: '0' }
                  }
                }
              }}
            />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Grids;

interface FeatureCardProps {
  title: string;
  description: string;
  bg: string;
  buttonText: string;
  buttonLink?: string;
  imageSrc?: string;
  boxProps?: BoxProps;
  imgBoxProps?: BoxProps;
}

const FeatureCard = ({
  title,
  description,
  bg,
  buttonText,
  buttonLink,
  imageSrc,
  boxProps,
  imgBoxProps
}: FeatureCardProps) => {
  return (
    <Box
      bg={bg}
      p={{ base: '40px 20px', lg: '20px', xl: '40px' }}
      rounded='15px'
      display='flex'
      w='full'
      h='full'
      {...boxProps}
    >
      <Box flex='1'>
        <Heading fontSize={{ base: '20px', xl: '26px' }}>{title}</Heading>
        <Text color='steelGray' mt='20px' fontSize='sm'>
          {description}
        </Text>
        <OutlineButton mt='20px' size='lg' to={buttonLink}>
          {buttonText}
        </OutlineButton>
      </Box>
      {imageSrc && (
        <Box {...imgBoxProps}>
          <Img src={imageSrc} />
        </Box>
      )}
    </Box>
  );
};
