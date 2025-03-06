import { Box, Button, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';

type Props = {};

const Expert = (props: Props) => {
  return (
    <Box mt='80px'>
      <Container>
        <Heading size='xl'>Expert How-tos</Heading>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4} mt='5'>
          <Card
            title='Deploying a smart contract'
            description='A collection of testnet funds to help you build or grow your project'
          />
          <Card
            title='Verify a smart contract'
            description='Learn to verify a smart contract on the Xone chain, ensuring transparency and security to build user trust.'
          />
          <Card title='Running a node'
          description='Learn to set up and operate your own nodes.'
          />
          <Card
            title='WXOC Release'
            description='WXOC will be released as Xone Mainnet XOC.'
            buttonText='Go to release'
            onClick={() => window.location.href = '/release'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Expert;

interface CardProps {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
}

const Card = ({ title, description, buttonText = 'Get started', onClick }: CardProps) => {
  return (
    <Box
      bg='white'
      p={6}
      pt='50px'
      borderRadius='20px'
      transition='0.3s all'
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg'
      }}
    >
      <VStack spacing={4} align='flex-start'>
        <Heading size='md'>{title}</Heading>
        <Text maxW='430px'>{description}</Text>
        <Button variant='outline' colorScheme='priRed' rounded='full' onClick={onClick} size='lg'>
          {buttonText}
        </Button>
      </VStack>
    </Box>
  );
};
