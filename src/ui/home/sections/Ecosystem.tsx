import { Box, Center, Container, Heading, Icon, Img, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {};

const Ecosystem = (props: Props) => {
  const images = useMemo(() => {
    return import.meta.glob('@/assets/imgs/partners/*', { eager: true }) as Record<
      string,
      { default: string }
    >;
  }, []);

  const imageLinks: Record<string, string> = {
    'aleta planet.svg': 'https://aletaplanet.com/',
    'color-black.svg': 'https://pancakeswap.finance/home',
    'Fenwick.svg': '#',
    'HL.svg': 'https://hyperfoundation.org/',
    'Huobi.svg': 'https://www.htx.com/',
    'MateMask.svg': 'https://metamask.io/',
    'Movement.svg': 'https://movementlabs.xyz/',
    'rainlink.svg': 'https://bridge.xonetest.plus/',
    'Sui.svg': 'https://sui.io/',
    'SunSwap.svg': 'https://sun.io/',
    'SwapX.svg': 'https://swapx.xonetest.plus/zh',
    'thunes.svg': 'https://www.thunes.com/',
    'TokenUp.svg': 'https://tokenup.xonetest.plus/',
    'TRON.svg': 'https://tron.network/',
    'Uniswap.svg': 'https://app.uniswap.org/',
    'Xion.svg': 'https://xion.burnt.com/'
  };

  const imagesArr = useMemo(() => {
    const keys = Object.keys(images);
    const mid = Math.ceil(keys.length / 2);
    const firstHalf = keys.slice(0, mid).map((key) => images[key]);
    const secondHalf = keys.slice(mid).map((key) => images[key]);

    return [firstHalf, secondHalf];
  }, [images]);

  const logoStyle = {
    width: '150px',
    height: 'auto',
    margin: '0 16px'
  };

  return (
    <Box py='60px'>
      <Container>
        <Box display={{ md: 'flex' }} alignItems='center'>
          <Box flex='1'>
            <Heading fontSize='32px'>Explore the ecosystem</Heading>
            <Text color='gray.500' mt='1'>
              Discover an ecosystem with a mission — open, adaptable, and committed to advancing the
              {/* future of blockchain.
              <Text
                as='a'
                color='red.pri'
                fontWeight='bold'
                textDecoration='none'
                _hover={{ textDecoration: 'underline' }}
                ml='1'
              >
                {' '}
                Know more <Icon as={MdOutlineArrowOutward} fontSize='16px' />
              </Text> */}
            </Text>
          </Box>
        </Box>
        <Box>
          {imagesArr.map((imgs, i) => {
            return (
              <Box mt='40px' key={i}>
                <Swiper
                  className='seamlesswrap'
                  modules={[Autoplay]}
                  observer
                  observeParents
                  speed={4000}
                  loop
                  slidesPerView={3}
                  spaceBetween={30}
                  grabCursor
                  direction='horizontal'
                  autoplay={{
                    delay: 0,
                    stopOnLastSlide: false,
                    reverseDirection: i % 2 !== 0,
                    disableOnInteraction: false
                  }}
                  allowTouchMove={false}
                  onTouchEnd={(swiper) => {
                    if (swiper) {
                      swiper.autoplay.running = true;
                      swiper.autoplay.start();
                    }
                  }}
                  breakpoints={{
                    750: {
                      slidesPerView: 6,
                      spaceBetween: 40
                    }
                  }}
                >
                  {imgs.map((img) => {
                    const imgName = img.default;
                    const lastIndex = imgName.lastIndexOf('/');
                    const indexImg = imgName.substring(lastIndex + 1, imgName.length);
                    const link = imageLinks[indexImg];
                    return (
                      <SwiperSlide key={img.default}>
                        <Center h={{ base: '70', md: '60px' }}>
                          <a href={link} target='_blank' rel='noopener noreferrer'>
                            <Img
                              draggable={false}
                              src={img.default}
                              h='full'
                              objectFit='contain'
                              style={logoStyle}
                            />
                          </a>
                        </Center>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Ecosystem;
