import { Box, Center, Container, Img, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import React, { useMemo } from 'react';

import IMG_38 from '@/assets/imgs/build/technology/Frame 38.png';
import IMG_39 from '@/assets/imgs/build/technology/Frame 39.png';
import IMG_43 from '@/assets/imgs/build/technology/Frame 43.png';
import IMG_45 from '@/assets/imgs/build/technology/Frame 45.png';
import IMG_46 from '@/assets/imgs/build/technology/Frame 46.png';
import { getFileInfo } from '@/utils/file';

type Props = {};

const Technology = (props: Props) => {
  const data = useMemo(() => {
    const images = import.meta.glob('@/assets/imgs/build/technology/*.png', {
      eager: true
    }) as Record<string, { default: string }>;
    return Object.entries(images).map(([key, value]) => {
      const { name } = getFileInfo(key);
      return {
        icon: value.default,
        text: name
      };
    });
  }, []);

  return (
    <Box bgColor='black'>
      <Container
        py={{ base: '2', lg: '10' }}
        display='flex'
        alignItems='center'
        justifyContent={{ base: 'space-between', lg: 'center' }}
        gap={{ base: 2, lg: '5' }}
      >
        {data.map((item, i) => {
          return <IconItem key={i} {...item} />;
        })}
      </Container>
    </Box>
  );
};

export default Technology;

const IconItem = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <Center
      position='relative'
      boxSize={{ base: '32px', md: '60px', lg: '110px' }}
      overflow='hidden'
      css={css`
        > div {
          transform: translateY(100%);
        }
        &:hover {
          > div {
            transform: translateY(0);
          }
        }
      `}
    >
      <Img src={icon} w='80%' />
      <Center
        bgColor=' #ED0000CC'
        color='white'
        rounded='15px'
        fontSize={{ base: 'sm', lg: 'base' }}
        position='absolute'
        inset={0}
        transition='0.3s all'
        fontWeight='bold'
      >
        <Text>{text}</Text>
      </Center>
    </Center>
  );
};
