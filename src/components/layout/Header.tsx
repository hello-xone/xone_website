import { Box, Button, Center, Container, Flex, Heading, Img, Text } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import NavMenuButton from './components/NavMenuButton';
import MobileMenuButton from './components/mobile/MobileMenuButton';
import { useMobileNavModal } from './hooks';

type Props = {};

const Header = (props: Props) => {
  const { toggle, isOpen } = useMobileNavModal();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (wrapRef.current?.clientHeight) {
    //   document.documentElement.style.setProperty(
    //     '--app-header-height',
    //     wrapRef.current?.clientHeight + 'px'
    //   );
    // }
  }, []);
  return (
    <Flex
      h={{ base: '64px' }}
      alignItems='center'
      position='fixed'
      top='0'
      left='0'
      right='0'
      bgColor='white'
      zIndex={10}
      ref={wrapRef}
    >
      <Container>
        <Flex alignItems='center'>
          <Center>
            <Img src='/imgs/logo-text.png' h='34px' />
          </Center>

          <Box
            display={{ base: 'none', lg: 'flex' }}
            alignItems='center'
            flex='1'
            maxW='640px'
            px='20px'
            mx='auto'
          >
            <NavMenuButton text='Build' />
          </Box>

          {/* <Button ml='auto' colorScheme='priRed' rounded='full' size='lg'>
            Get Rearded
          </Button> */}
          <MobileMenuButton isOpen={isOpen} onClick={toggle} ml='auto' />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
