import { Box, Container, Flex, Icon, Img, Text } from '@chakra-ui/react';
import { MdOutlineArrowOutward } from 'react-icons/md';
import IconButton from '../comm/button/IconButton';
import { FiYoutube } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { PiTelegramLogo } from 'react-icons/pi';
import { FaGithub } from 'react-icons/fa';
import { SiMedium } from 'react-icons/si';
import { EXTERNAL_LINKS } from '@/lib/external';

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
        <Flex gap='8' flexDir={{ base: 'column', lg: 'row' }} w='full' alignItems='flex-start' mb='10' mt='10'>
          <Box>
            <Img src='/imgs/logo-text-white.png' w='130px' mx={{ base: 'auto', lg: undefined }} />
          </Box>
          <Box color='white' ml={{ lg: 'auto' }} textAlign='left'>
            <Text color='#bcbfcd' fontWeight='bold' mb="2">Xone Chain</Text>
            <Flex
              justifyContent='flex-start'
              as='a'
              href={EXTERNAL_LINKS.docs + 'study/xone'}
              target='_blank'
              alignItems='center'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>About</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
            <Flex
              as='a'
              justifyContent='flex-start'
              href={EXTERNAL_LINKS.Events}
              target='_blank'
              alignItems='center'
              mt='2'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>Events</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
            <Flex
              as='a'
              justifyContent='flex-start'
              href={EXTERNAL_LINKS.docs + 'study/media'}
              target='_blank'
              alignItems='center'
              mt='2'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>Media Kit</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
            <Flex
              as='a'
              justifyContent='flex-start'
              href={EXTERNAL_LINKS.docs + 'study/service'}
              target='_blank'
              alignItems='center'
              mt='2'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>Terms of Service</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
            <Flex
              as='a'
              justifyContent='flex-start'
              href={EXTERNAL_LINKS.docs + 'study/privacy'}
              target='_blank'
              alignItems='center'
              mt='2'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>Privacy Policy</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
          </Box>
          <Box color='white' ml={{ lg: 'auto' }} textAlign='left'>
            <Text color='#bcbfcd' fontWeight='bold' mb="2">Build</Text>
            <Flex
              justifyContent='flex-start'
              as='a'
              href={EXTERNAL_LINKS.docs + 'developers/ready'}
              target='_blank'
              alignItems='center'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>Developer Docs</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
            <Flex
              as='a'
              justifyContent='flex-start'
              href={EXTERNAL_LINKS.docs + 'developers/rpc'}
              target='_blank'
              alignItems='center'
              mt='2'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>RPC Endpoints</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
            <Flex
              as='a'
              justifyContent='flex-start'
              href={EXTERNAL_LINKS.docs + 'developers/tools'}
              target='_blank'
              alignItems='center'
              mt='2'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>Tools</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
            <Flex
              as='a'
              justifyContent='flex-start'
              href={EXTERNAL_LINKS.docs + 'developers/explorers'}
              target='_blank'
              alignItems='center'
              mt='2'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>Block Explorers</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
            <Flex
              as='a'
              justifyContent='flex-start'
              href={EXTERNAL_LINKS.faucet}
              target='_blank'
              alignItems='center'
              mt='2'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>Faucets</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
            <Flex
              as='a'
              justifyContent='flex-start'
              href={EXTERNAL_LINKS.Github}
              target='_blank'
              alignItems='center'
              mt='2'
              gap='1'
              color='#808080'
              _hover={{ color: '#ffffff' }}
            >
              <Text>Github</Text>
              <Icon as={MdOutlineArrowOutward} fontSize='16px' />
            </Flex>
          </Box>

          <Box ml={{ lg: 'auto' }} textAlign='left'>
            <Text color='#bcbfcd' fontWeight='bold' mb="2">Follow Us</Text>
            <Flex
              alignItems='center'
              justifyContent='flex-start'
              mt='3'
              gap='4'
            >
              <IconButton as={FaXTwitter} href={EXTERNAL_LINKS.Twitter} />
              <IconButton as={PiTelegramLogo} href={EXTERNAL_LINKS.Telegram} />
              <IconButton as={FaGithub} href={EXTERNAL_LINKS.Github} />
              <IconButton as={FiYoutube} href={EXTERNAL_LINKS.Youtube} />
              <IconButton as={SiMedium} href={EXTERNAL_LINKS.Medium} />
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
