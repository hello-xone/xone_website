import { Box, Container, Flex, Img, Text } from '@chakra-ui/react';
import { BiLogoMediumSquare } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiYoutube } from 'react-icons/fi';
import { PiTelegramLogo } from 'react-icons/pi';
import { RiDiscordLine } from 'react-icons/ri';

import { EXTERNAL_LINKS } from '@/lib/external';

import IconButton from '../comm/button/IconButton';
import FooterLinks from './components/FooterLinks';
import { BuildLinks, XoneChainLinks } from './config/links';

type Props = {};

const Footer = (props: Props) => {
  return (
    <Box as='footer' bgColor='#000000'>
      <Container
        display='flex'
        alignItems='flex-start'
        h={{ base: 'auto', lg: 'auto' }}
        py={{ base: '40px', lg: '0' }}
      >
        <Flex
          gap='8'
          flexDir={{ base: 'column', lg: 'row' }}
          w='full'
          alignItems={{ base: 'center', lg: 'flex-start' }}
          mb='10'
          mt='10'
        >
          <Box>
            <Img src='/imgs/xone-logo-white.png' w='130px' />
          </Box>

          <Box
            ml={{ lg: 'auto' }}
            display={{ base: 'flex' }}
            // flexDir='column'
            alignItems={{ base: '', lg: 'flex-start' }}
            gap='10'
            justifyContent={{ base: 'center', lg: 'flex-start' }}
            w={{ base: '100%', lg: 'initial' }}
          >
            <FooterLinks title='Xone Chain' links={XoneChainLinks} />

            <FooterLinks
              ml={{ base: '0', md: '180px', lg: '100px', xl: '200px' }}
              title='Build'
              links={BuildLinks}
            />
            {/* <Box>
              <ExternalLink to={EXTERNAL_LINKS.docs + 'study/service'} color='white'>
                Terms of Service
              </ExternalLink>
            </Box>
            <Box>
              <ExternalLink to={EXTERNAL_LINKS.docs + 'study/privacy'} color='white'>
                Privacy Policy
              </ExternalLink>
            </Box> */}
          </Box>

          <Box ml={{ base: '0', lg: 'auto' }} textAlign={{ base: 'center', lg: 'left' }}>
            <Text color='#bcbfcd' fontWeight='bold' mb='2'>
              Follow Us
            </Text>
            <Flex alignItems='center' justifyContent='flex-start' mt='3' gap='4'>
              <IconButton as={FaXTwitter} href={EXTERNAL_LINKS.Twitter} />
              <IconButton as={PiTelegramLogo} href={EXTERNAL_LINKS.Telegram} />
              <IconButton as={FaGithub} href={EXTERNAL_LINKS.Github} />
              <IconButton as={FiYoutube} href={EXTERNAL_LINKS.Youtube} />
              <IconButton as={BiLogoMediumSquare} href={EXTERNAL_LINKS.Medium} />
              <IconButton as={RiDiscordLine} href={EXTERNAL_LINKS.Discord} />
            </Flex>
          </Box>
          <Box ml={{ lg: 'auto' }} textAlign={{ base: 'center', lg: 'right' }}>
            <Text color='whiteAlpha.500'>&copy; {new Date().getFullYear()} Xone.</Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
