import { Box, Center, Container, Flex, Img } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { EXTERNAL_LINKS } from '@/lib/external';

import ExternalLink from '../comm/ExternalLink';
import { ReactRouterLink } from '../comm/ReactRouterLink';
import RouteLink from '../comm/RouteLink';
import MobileMenuButton from './components/mobile/MobileMenuButton';
import NavMenuButton, { CMenuItem } from './components/NavMenuButton';
import { MENUS_CONFIG } from './config/menus';
import { useMobileNavModal } from './hooks';

type Props = {};

const Header = (props: Props) => {
  const { toggle, isOpen } = useMobileNavModal();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Uncomment if dynamic header height is required
    if (wrapRef.current?.clientHeight) {
      document.documentElement.style.setProperty(
        '--app-header-height',
        wrapRef.current?.clientHeight + 'px'
      );
      if (wrapRef.current.querySelector('.alert-box')) {
        document.documentElement.style.setProperty(
          '--app-header-alert-height',
          wrapRef.current.querySelector('.alert-box')?.clientHeight + 'px'
        );
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 10) {
        document.documentElement.style.setProperty('--app-header-bg-color', 'white');
      } else {
        document.documentElement.style.setProperty('--app-header-bg-color', 'transparent');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box ref={wrapRef} position='fixed' top='0' left='0' right='0' zIndex={10}>
      <Flex
        h={{ base: '64px' }}
        alignItems='center'
        transition='background-color 0.3s ease'
        bgColor={'var(--app-header-bg-color)'}
        // bgColor='white'
        // borderBottom='1px solid #e0e0e0'
      >
        <Container>
          <Flex alignItems='center'>
            <Center as={ReactRouterLink} to='/'>
              <Img src='/imgs/xone-logo-black.png' h='34px' />
            </Center>

            <Box
              display={{ base: 'none', lg: 'flex' }}
              alignItems='center'
              flex='1'
              maxW='640px'
              px='20px'
              ml='auto'
              gap='20px'
            >
              {MENUS_CONFIG.map((menu, index) => (
                <NavMenuButton key={index} text={menu.text} to={menu.href}>
                  {menu.items &&
                    menu.items.map((item, subIndex) => (
                      <CMenuItem key={subIndex}>
                        <RouteLink w='full' to={item.href}>
                          {item.label}
                        </RouteLink>
                      </CMenuItem>
                    ))}
                </NavMenuButton>
              ))}
            </Box>

            <MobileMenuButton isOpen={isOpen} onClick={toggle} ml='auto' />
          </Flex>
        </Container>
      </Flex>

      <Box bg='#000000' color='white' py='8px' textAlign='center' fontSize='14px' fontWeight='bold'>
        <Box
          as='a'
          href='/release'
          target='_blank'
          rel='noopener noreferrer'
          px='2'
          _hover={{
            textDecoration: 'underline'
          }}
        >
          🎉 Start releasing your XOC and experience the high performance and vast ecosystem of Xone Mainnet. →
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
