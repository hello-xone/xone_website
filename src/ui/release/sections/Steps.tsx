import { Box, Container, Flex, Heading, Img, Text } from '@chakra-ui/react';

import IMG_Arrow from '@/assets/imgs/release/arrow.png';
import IMG_Step1 from '@/assets/imgs/release/step/1.png';
import IMG_Step2 from '@/assets/imgs/release/step/2.png';
import IMG_Step3 from '@/assets/imgs/release/step/3.png';

type Props = {};

const Steps = (props: Props) => {
  return (
    <Box mt='24px'>
      <Container bgColor='white' py='10' rounded='xl'>
        <Flex 
          justifyContent='space-between'
          direction={{ base: 'column', md: 'row' }}
          alignItems='center'
        >
          <StepCard
            img={IMG_Step1}
            title='Step 1 :Send WXOC Tokens'
            content='Send your WXOC tokens to our contract address.'
          />
          <Box 
            w={{ base: '40px', md: '120px' }}
            my={{ base: '20px', md: '0' }}
            transform={{ base: 'rotate(180deg)', md: 'rotate(90deg)' }}
          >
            <Img src={IMG_Arrow} w='12px' mx='auto' />
          </Box>
          <StepCard
            img={IMG_Step2}
            title='Step 2: Data Sync'
            content='Once the contract receives the tokens, it will sync with the Xone Mainnet.'
          />
          <Box 
            w={{ base: '40px', md: '120px' }}
            my={{ base: '20px', md: '0' }}
            transform={{ base: 'rotate(180deg)', md: 'rotate(90deg)' }}
          >
            <Img src={IMG_Arrow} w='12px' mx='auto' />
          </Box>
          <StepCard
            img={IMG_Step3}
            title='Step 3: Unwrap XOC'
            content='XOC will be unwrapped after synchronization. You can verify on the Mainnet.'
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Steps;

const StepCard = ({
  img,
  title,
  content,
}: {
  img: string;
  title: string;
  content: string;
}) => {
  return (
    <Box 
      textAlign='center' 
      flex={{ base: 'none', md: '1 0 0' }}
      w={{ base: '100%', md: 'auto' }}
      display='flex'
      flexDir='column'
      alignItems='center'
    >
      <Img 
        src={img} 
        textAlign='center' 
        display='inline-block'
        w={{ base: '240px', md: 'auto' }}
      />
      <Heading size='md'>{title}</Heading>
      <Text 
        color='#505868' 
        fontSize={{ base: 'xs', md: 'sm' }} 
        mt='1'
        maxW={{ base: '280px', md: 'none' }}
        mx='auto'
      >
        {content}
      </Text>
    </Box>
  );
};
