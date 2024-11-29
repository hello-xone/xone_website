import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Img,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import IconCoin from '@/assets/svg/coin.svg?react';
import IconBVI from '@/assets/svg/bvi.svg?react';
import IconMod from '@/assets/svg/mod.svg?react';
import IconFee from '@/assets/svg/fee.svg?react';
import { ElementType } from 'react';

type Props = {};

const HelloXone = (props: Props) => {
  return (
    <Box py='60px'>
      <Container>
        <Box display={{ lg: 'flex' }} alignItems='center'>
          <Box position='relative' flex='1'>
            <Img src='/imgs/logo-stack.png' sizes='248px' mx='auto' />
            <Box className='absolute-center'>
              <Heading textAlign='center' fontSize={{ base: '40px', md: '60px' }}>
                Hello XONE
              </Heading>
              <Text
                mt='4px'
                fontSize={{ base: 'sm', md: '20px' }}
                textAlign='center'
                whiteSpace='nowrap'
              >
                The leading world blockchain network for everyone
              </Text>
            </Box>
          </Box>
          <Box flex='1' mt={{ base: '10', lg: '0' }}>
            <Box display={{ md: 'flex' }} alignItems='center' gap='20px'>
              <InfoItem icon={IconCoin} title='Get XOC' text='The native token of the XONE' />
              <InfoItem
                icon={IconBVI}
                title='Growth Value'
                text='BVI on-chain incentive program '
              />
            </Box>

            <Box display={{ md: 'flex' }} alignItems='center' gap='20px' mt={{ md: '20px' }}>
              <InfoItem
                icon={IconMod}
                title='Modular Network'
                text='Scalable, flexible architecture'
              />
              <InfoItem icon={IconFee} title='Low Fee' text='Transactions below one cent' />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HelloXone;

const InfoItem = ({ title, text, icon }: { title: string; text: string; icon: ElementType }) => {
  return (
    <Flex
      alignItems='center'
      justifyContent={{ base: 'center', lg: 'initial' }}
      flex='1'
      borderBottom='1px solid #F5F5F5'
      h='130px'
    >
      <Center boxSize='52px' bgColor='#FFE3E3' rounded='full' flexShrink='0'>
        <Icon as={icon} fontSize='25px' />
      </Center>
      <Box ml='2'>
        <Heading fontSize='24px'>{title}</Heading>
        <Text color='gray.500'>{text}</Text>
      </Box>
    </Flex>
  );
};
