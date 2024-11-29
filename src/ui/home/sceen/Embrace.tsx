import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const Embrace = (props: Props) => {
  return (
    <Box bg={'linear-gradient(181.17deg, #F2F0FF 0.97%, #FFFFFF 98.97%)'} pt='60px' pb='100px'>
      <Container textAlign='center'>
        <Heading fontSize='48px'>Embrace the future together</Heading>
        <Text mt='3' color='gray.500' maxW='980px' mx='auto'>
          Join us in building value—focus on impactful contributions that drive real rewards. Track
          your impact on the blockchain and be part of our journey.
        </Text>
        <Button colorScheme='priBlack' rounded='full' size='lg' mt='5'>
          Explore BVI
        </Button>
      </Container>
    </Box>
  );
};

export default Embrace;
