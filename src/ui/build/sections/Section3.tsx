import { Box, Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { ElementType, useMemo } from 'react';

import IconFaucet from '@/assets/imgs/build/cards/faucet.svg?react';
import IconId from '@/assets/imgs/build/cards/id.svg?react';
import IconRpc from '@/assets/imgs/build/cards/rpc.svg?react';
import { EXTERNAL_LINKS } from '@/lib/external';
import { getToProps } from '@/utils/helper';

const Section3 = () => {
  const cardsData = useMemo(() => {
    return [
      {
        icon: IconFaucet,
        title: 'Faucet',
        description: 'A collection of testnet funds to help you build or grow your project',
        to: EXTERNAL_LINKS.faucet
      },
      {
        icon: IconRpc,
        title: 'Network RPC',
        description: 'A collection of testnet funds to help you build or grow your project',
        to: '/build/access'
      },
      {
        icon: IconId,
        title: 'Create your ID',
        description: 'A collection of testnet funds to help you build or grow your project',
        to: ''
      }
    ];
  }, []);

  return (
    <Box mt='80px'>
      <Container>
        <Flex flexDir={{ base: 'column', lg: 'row' }} alignItems='center' gap='5'>
          {cardsData.map((data) => {
            return <Card key={data.title} {...data} />;
          })}
        </Flex>
      </Container>
    </Box>
  );
};
export default Section3;

interface CardProps {
  icon: ElementType;
  title: string;
  description: string;
  to?: string;
}

const Card = ({ icon, title, description, to }: CardProps) => {
  return (
    <Box
      bg='white'
      flex='1'
      w='full'
      p={6}
      borderRadius='20px'
      transition='all 0.3s'
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg'
      }}
      cursor='pointer'
      {...getToProps(to)}
    >
      <Flex direction='column' gap={4}>
        <Icon as={icon} boxSize={'54px'} color='gray.600' />
        <Box>
          <Heading size='26px' mb={2}>
            {title}
          </Heading>
          <Text>{description}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
