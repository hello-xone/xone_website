import { Box, Center, Container, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import { RiTelegram2Fill } from 'react-icons/ri';

import { ReactRouterLink } from '@/components/comm/ReactRouterLink';
import { EXTERNAL_LINKS } from '@/lib/external';

type Props = {};

const AccessFeedback = (props: Props) => {
  return (
    <Box mt='60px'>
      <Container bg='white' py='5' px={{ base: '4', lg: '10' }} rounded='14px'>
        <Heading size='lg'>Send us feedback</Heading>

        <Box bgColor='#FFF8F8' rounded='15px' py={{ base: 5, lg: '10' }} px='5' mt='10'>
          <Flex alignItems='center'>
            <Center boxSize='42px' bgColor='#41B4E6' color='white' rounded='5px'>
              <Icon as={RiTelegram2Fill} fontSize='24px' />
            </Center>
            <Text fontSize={{ base: '14px', lg: '20px' }} ml='5' flex='1 0 0'>
              Having issues? Remove any previous Xone networks from your wallet and contact us at{' '}
              <Link href={'mailto:developers@xone.org'} isExternal>
                developers@xone.org
              </Link>{' '}
              for help.
            </Text>
          </Flex>

          <Flex alignItems='center' mt='5'>
            <Center boxSize='42px' bgColor='#FF7779' color='white' rounded='5px'>
              <Icon as={MdEmail} fontSize='24px' />
            </Center>

            <Text fontSize={{ base: '14px', lg: '20px' }} ml='5' flex='1 0 0 '>
              Chart with us on{' '}
              <Link href={EXTERNAL_LINKS.TelegramDevelopers} isExternal>
                Telegram
              </Link>
            </Text>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default AccessFeedback;
