import { Box, Center, Container, Flex, Img } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { EXTERNAL_LINKS } from '@/lib/external';

import ExternalLink from '../comm/ExternalLink';
import MobileMenuButton from './components/mobile/MobileMenuButton';
import NavMenuButton, { CMenuItem } from './components/NavMenuButton';
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
        alignItems='center'
        position='fixed'
        top='0'
        left='0'
        right='0'
        bgColor='white'
        zIndex={10}
        ref={wrapRef}
        borderBottom='1px solid #e0e0e0'
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
              gap='20px'
            >
              <NavMenuButton
                text='Build'
                MenuListContent={
                  <>
                    <CMenuItem href={EXTERNAL_LINKS.docs + 'developers/ready'}>
                      <ExternalLink>Developer Docs</ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.TestnetExplorer}>
                      <ExternalLink>Testnet explorer</ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.faucet}>
                      <ExternalLink>Faucet</ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.docs + 'study/bug'}>
                      <ExternalLink>Bounty Hunter</ExternalLink>
                    </CMenuItem>
                  </>
                }
              />
              <NavMenuButton
                text='Donate'
                MenuListContent={
                  <>
                    <CMenuItem href={EXTERNAL_LINKS.Donate}>
                      <ExternalLink>Go to Donate</ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.DonateDocs}>
                      <ExternalLink>Donate Support</ExternalLink>
                    </CMenuItem>
                  </>
                }
              />
              <NavMenuButton
                text='Social'
                MenuListContent={
                  <>
                    <CMenuItem href={EXTERNAL_LINKS.Twitter}>
                      <ExternalLink>X</ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.Telegram}>
                      <ExternalLink>Telegram</ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.Events}>
                      <ExternalLink>Events</ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.Medium}>
                      <ExternalLink>News</ExternalLink>
                    </CMenuItem>
                  </>
                }
              />
              <NavMenuButton
                text='Ecosystem'
                MenuListContent={
                  <>
                    <CMenuItem href={EXTERNAL_LINKS.TokenUp}>
                      <ExternalLink>TokenUp</ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.SwapX}>
                      <ExternalLink>SwapX</ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.RainLink}>
                      <ExternalLink>RainLink</ExternalLink>
                    </CMenuItem>
                  </>
                }
              />
            </Box>

            <MobileMenuButton isOpen={isOpen} onClick={toggle} ml='auto' />
          </Flex>
        </Container>
      </Flex>
      <Box
        bg='#000000'
        color='white'
        py='8px'
        textAlign='center'
        fontSize='14px'
        fontWeight='bold'
        position='fixed'
        top={{ base: '64px', md: '64px' }}
        left='0'
        right='0'
        zIndex={9}
      >
        <Box
          as='a'
          href='https://knight.center/'
          target='_blank'
          rel='noopener noreferrer'
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            _hover: {
              textDecoration: 'underline'
            }
          }}
        >
          🎉 Join us to illuminate the possibilities of the future with action. →
        </Box>
      </Box>
    </>
  );
};

export default Header;
