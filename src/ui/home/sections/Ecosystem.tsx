import {
  Box,
  Center,
  Container,
  Heading,
  Icon,
  Img,
  Link,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import { useMemo, useState, useEffect } from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Ecosystem = () => {
  const images = useMemo(() => {
    return import.meta.glob('@/assets/imgs/partners/*', { eager: true }) as Record<
      string,
      { default: string }
    >;
  }, []);

  const [imageLinks, setImageLinks] = useState<Record<string, string>>({});

  // 读取 JSON 数据
  useEffect(() => {
    import('@/assets/data/EcosystemLinks.json')
      .then((data) => setImageLinks(data.default))
      .catch((err) => console.error('Failed to load imageLinks.json:', err));
  }, []);

  const normalizedLinks = useMemo(() => {
    return Object.fromEntries(
      Object.entries(imageLinks).map(([key, value]) => [key.toLowerCase(), value])
    );
  }, [imageLinks]);

  const imagesArr = useMemo(() => {
    const keys = Object.keys(images);
    const mid = Math.ceil(keys.length / 2);
    return [keys.slice(0, mid).map((key) => images[key]), keys.slice(mid).map((key) => images[key])];
  }, [images]);

  const logoStyle = { width: '150px', height: 'auto', margin: '0 16px' };
  const [minMD] = useMediaQuery('(min-width: 48em)');

  return (
    <Box py="60px">
      <Container>
        <Box display={{ md: 'flex' }} alignItems="center">
          <Box flex="1">
            <Heading fontSize="32px">Explore the ecosystem</Heading>
            <Text color="gray.500" mt="1">
              Discover an ecosystem with a mission — open, adaptable, and committed to advancing the
              future of blockchain.
              <Text
                as="a"
                color="red.pri"
                fontWeight="bold"
                textDecoration="none"
                _hover={{ textDecoration: 'underline' }}
                ml="1"
                href="/apps"
              >
                {' '}
                Know more <Icon as={MdOutlineArrowOutward} fontSize="16px" />
              </Text>
            </Text>
          </Box>
        </Box>

        {minMD && (
          <Box>
            {imagesArr.map((imgs, i) => (
              <Box mt="40px" key={i}>
                <Swiper
                  className="seamlesswrap"
                  modules={[Autoplay]}
                  observer
                  observeParents
                  speed={4000}
                  loop
                  slidesPerView={3}
                  spaceBetween={30}
                  grabCursor
                  direction="horizontal"
                  autoplay={{
                    delay: 0,
                    stopOnLastSlide: false,
                    reverseDirection: i % 2 !== 0,
                    disableOnInteraction: false
                  }}
                  allowTouchMove={false}
                  breakpoints={{ 750: { slidesPerView: 6, spaceBetween: 40 } }}
                >
                  {imgs.map((img) => {
                    const imgName = img.default;
                    const lastIndex = imgName.lastIndexOf('/');
                    const indexImg = imgName.substring(lastIndex + 1).toLowerCase();
                    const link = normalizedLinks[indexImg] || '#';

                    return (
                      <SwiperSlide key={img.default}>
                        <Center h={{ base: '70', md: '60px' }}>
                          <Link
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              if (!link || link === '#') {
                                e.preventDefault();
                              }
                            }}
                          >
                            <Img draggable={false} src={img.default} h="full" objectFit="contain" style={logoStyle} />
                          </Link>
                        </Center>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Ecosystem;