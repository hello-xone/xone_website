import RedButton from '@/components/comm/button/RedButton';
import { Box, Container, Flex, Grid, GridItem, Heading, Img, Text } from '@chakra-ui/react';
import IMG_Cube from '@/assets/imgs/home/cube.png';
import IMG_Reward from '@/assets/imgs/home/reward.png';

type Props = {};

const Grids = (props: Props) => {
  return (
    <Box py='60px'>
      <Container>
        <Grid
          display={{ base: 'flex', lg: 'grid' }}
          flexDir='column'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(3, 1fr)'
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={1} bg='#F0FAFF' p='40px' rounded='15px'>
            <Heading fontSize='24px'>Build with Xone</Heading>
            <Text color='gray.500' mt='20px' fontSize='sm'>
              Xone is a high-performance, interoperable blockchain platform combining EVM
              compatibility with Cosmos modularity.
            </Text>
            <RedButton mt='20px' size='lg' to='https://docs.xone.plus/developers/ready'>
              Learn more
            </RedButton>
            <Img src={IMG_Cube} w='full' mt='20px' />
          </GridItem>
          <GridItem colSpan={1} bg='#F9FDEB' p='40px' rounded='15px'>
            <Heading fontSize='24px'>Deploy an app</Heading>
            <Text color='gray.500' mt='20px' fontSize='sm'>
              Deploy your app on the Xone chain and join one of the fastest-growing EVM ecosystems.
            </Text>

            <RedButton mt='20px' size='lg'>
              Get started
            </RedButton>
          </GridItem>
          <GridItem colSpan={1} bg='#EDFFF7' p='40px' rounded='15px'>
            <Heading fontSize='24px'>A more equitable financial system</Heading>
            <Text color='gray.500' mt='20px' fontSize='sm'>
              Provides equal access, empowering all through transparency, reduced barriers, and
              inclusive opportunities for sustainable economic growth.
            </Text>

            <RedButton mt='20px' size='lg'>
              Explore Defi
            </RedButton>
          </GridItem>
          <GridItem
            colSpan={2}
            bg='#FFF7F7'
            px='40px'
            rounded='15px'
            py={{ base: '40px', lg: '0' }}
          >
            <Box display={{ lg: 'flex' }} alignItems='center'>
              <Box>
                <Heading fontSize='32px'>Start a node</Heading>
                <Text color='gray.500' mt='20px'>
                  Join the network to earn greater rewards.
                </Text>

                <RedButton mt='20px' size='lg'>
                  Get started
                </RedButton>
              </Box>
              <Box ml='auto'>
                <Img src={IMG_Reward} />
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Grids;
