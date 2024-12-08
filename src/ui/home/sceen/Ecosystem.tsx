import RedButton from '@/components/comm/button/RedButton';
import { Box, Center, Container, Heading, Img, Text, Icon } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { MdOutlineArrowOutward } from 'react-icons/md';

type Props = {};

const Ecosystem = (props: Props) => {
  const images = useMemo(() => {
    return import.meta.glob('@/assets/imgs/partners/*', { eager: true }) as Record<
      string,
      { default: string }
    >;
  }, []);

  const imagesArr = useMemo(() => {
    const keys = Object.keys(images);
    const mid = Math.ceil(keys.length / 2);

    const firstHalf = keys.slice(0, mid).map((key) => images[key]);
    const secondHalf = keys.slice(mid).map((key) => images[key]);

    return [firstHalf, secondHalf];
  }, [images]);

  return (
    <Box py='60px'>
      <Container>
        <Box display={{ md: 'flex' }} alignItems='center'>
          <Box flex='1'>
            <Heading fontSize='32px'>Explore the ecosystem</Heading>
            <Text color='gray.500' mt='1'>
              Discover an ecosystem with a mission — open, adaptable, and committed to advancing the
              future of blockchain.
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
              </Text>
            </Text>
          </Box>
          {/* <RedButton ml={{ md: '5' }} mt={{ base: '10', md: '0' }}>
            Get started
          </RedButton> */}
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
                      // swiper.slideNext(); // 确保方向是前进
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
                    return (
                      <SwiperSlide key={img.default}>
                        <Center h={{ base: '70', md: '60px' }}>
                          <Img draggable={false} src={img.default} h='full' objectFit='contain' />
                        </Center>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            );
          })}

          {/* 
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 6, xl: 6 }}
            gap='30px 12px'
            justifyItems={{ base: 'center', md: 'center' }}
            alignItems='center'
          >
            {Object.keys(images).map((key) => {
              return <Img key={key} src={images[key].default} />;
            })}
          </SimpleGrid> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Ecosystem;
