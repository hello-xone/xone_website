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
    // Uncomment if dynamic header height is required
    // if (wrapRef.current?.clientHeight) {
    //   document.documentElement.style.setProperty(
    //     '--app-header-height',
    //     wrapRef.current?.clientHeight + 'px'
    //   );
    // }
  }, []);

  return (
    <>
      <Flex
        h={{ base: '64px' }}
        alignItems="center"
        position="fixed"
        top="0"
        left="0"
        right="0"
        bgColor="white"
        zIndex={10}
        ref={wrapRef}
        borderBottom="1px solid #e0e0e0"
      >
        <Container>
          <Flex alignItems="center">
            <Center>
              <Img src="/imgs/logo-text.png" h="34px" />
            </Center>

            <Box
              display={{ base: 'none', lg: 'flex' }}
              alignItems="center"
              flex="1"
              maxW="640px"
              px="20px"
              mx="auto"
              gap="20px"
            >
              <NavMenuButton text="Build" />
              <NavMenuButton text="Donate" />
              <NavMenuButton text="Social" />
              <NavMenuButton text="Ecosystem" />
            </Box>

            <MobileMenuButton isOpen={isOpen} onClick={toggle} ml="auto" />
          </Flex>
        </Container>
      </Flex>
      <Box
        bg="#000000"
        color="white"
        py="8px"
        textAlign="center"
        fontSize="14px"
        fontWeight="bold"
        position="fixed"
        top={{ base: '64px', md: '64px' }}
        left="0"
        right="0"
        zIndex={9}
      >
        <Box
          as="a"
          href="https://knight.center/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            _hover: {
              textDecoration: 'underline',
            },
          }}
        >
          🎉 Join us to illuminate the possibilities of the future with action. →
        </Box>
      </Box>
    </>
  );
};

export default Header;