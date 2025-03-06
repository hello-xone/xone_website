import {
  Box,
  Button,
  Flex,
  Img,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import Check from '@/assets/imgs/release/instruction/check.png';
import Close from '@/assets/imgs/release/instruction/close.png';
import StepOne from '@/assets/imgs/release/instruction/stepOne.png';
import StepThree from '@/assets/imgs/release/instruction/stepThree.png';
import StepTwo from '@/assets/imgs/release/instruction/stepTwo.png';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const InstructionModal = (props: Props) => {
  const { isOpen, onClose } = props;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    isOpen && setActiveStep(0);
  }, [isOpen]);

  const handleNext = () => {
    setActiveStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleClose = () => {
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Text mb='24px' fontSize='16px' fontWeight='800'>
              Welcome to the XOC Release page! This guide will help you quickly
              understand why you need to release your XOC and how to complete
              the release to ensure your operation goes smoothly.
            </Text>
            <Text mb='12px' fontSize='16px' fontWeight='800'>
              1. Why Release XOC?
            </Text>
            <Text mb='24px' fontSize='14px' fontWeight='500'>
              XOC is the native token of the Xone public chain, and WXOC (Wrapped XOC) is a mapping token used for Xone Testnet interaction. In order to use XOC on the Xone Mainnet, you need to convert WXOC to XOC, a process called unwrap.
            </Text>
            <Text mb='12px' fontSize='16px' fontWeight='800'>
              2. How to Release XOC?
            </Text>
            <Text mb='24px' fontSize='14px' fontWeight='500'>
              Get your tokens unlocked fast by learning what to do in this guide! Ready to start unlocking XOC?
            </Text>
            <Flex alignItems='center' justifyContent='center' gap='44px' flexDir={{ base: 'column', md: 'row' }}>
              <Flex flexDirection='column' alignItems='center' w={{ base: '100%', md: '310px' }}>
                <Box
                  bg='#FFF0F0'
                  w={{ base: '100%', lg: '310px' }}
                  h={{ base: '100%', lg: '165px' }}
                  borderRadius='15px'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  py='14px'
                  mb='24px'
                >
                  <Img src={Close} maxH='140px' />
                </Box>
                <Button
                  variant='outline'
                  rounded='full'
                  size='sm'
                  w={{ base: '100%', md: 'auto' }}
                  onClick={handleClose}
                >
                  I know how to release
                </Button>
              </Flex>
              <Flex flexDirection='column' alignItems='center' w={{ base: '100%', md: '310px' }}>
                <Box
                  bg='#FFF0F0'
                  w={{ base: '100%', md: '310px' }}
                  h={{ base: '100%', md: '165px' }}
                  borderRadius='15px'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  py='14px'
                  mb='24px'
                >
                  <Img src={Check} maxH='140px' />
                </Box>
                <Button
                  colorScheme='priRed'
                  rounded='full'
                  size='sm'
                  w={{ base: '100%', md: 'auto' }}
                  onClick={handleNext}
                >
                  I need to see the release guide
                </Button>
              </Flex>
            </Flex>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Box>
              <Img src={StepOne} />
              <Text mt='24px' fontSize='16px' fontWeight='800'>
                Step 1: Check wallet tokens.
              </Text>
              <Text mt='10px' fontSize='14px' fontWeight='500'>
                Verify that the connected wallet address has sufficient funds to pay transaction fees for interacting with the Xone testnet. Also, check if the wallet holds WXOC tokens.
              </Text>
            </Box>
            <Flex
              alignItems='center'
              direction={{ base: 'column', md: 'row' }}
              justifyContent='center'
              position={{ base: 'relative', md: 'absolute' }}
              bottom={{ base: '0', md: '30px' }}
              gap={{ base: '16px', md: '0' }}
              mt={{ base: '24px', md: '0' }}
              w={{ base: '100%', md: 'calc(100% - 3rem)' }}
            >
              <Button
                colorScheme='priRed'
                rounded='full'
                size='lg'
                ml={{ base: '0', md: '16px' }}
                w={{ base: '100%', md: '378px' }}
                onClick={handleNext}
              >
                Next step
              </Button>
            </Flex>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Box>
              <Img src={StepTwo} />
              <Text mt='24px' fontSize='16px' fontWeight='800'>
                Step 2: Transfer WXOC Tokens.
              </Text>
              <Text mt='10px' fontSize='14px' fontWeight='500'>
                Transfer WXOC tokens from the connected wallet to the specified contract address on the Xone testnet. Wait for transaction data confirmation.

              </Text>
            </Box>
            <Flex
              alignItems='center'
              direction={{ base: 'column', md: 'row' }}
              justifyContent='center'
              position={{ base: 'relative', md: 'absolute' }}
              bottom={{ base: '0', md: '30px' }}
              gap={{ base: '16px', md: '0' }}
              mt={{ base: '24px', md: '0' }}
            >
              <Button
                colorScheme='priRed'
                rounded='full'
                size='lg'
                variant='outline'
                w={{ base: '100%', md: '378px' }}
                onClick={handlePrev}
              >
                Previous
              </Button>
              <Button
                colorScheme='priRed'
                rounded='full'
                size='lg'
                ml={{ base: '0', md: '16px' }}
                w={{ base: '100%', md: '378px' }}
                onClick={handleNext}
              >
                Next step
              </Button>
            </Flex>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Box>
              <Img src={StepThree} />
              <Text mt='24px' fontSize='16px' fontWeight='800'>
                Step 3: Information confirmation.
              </Text>
              <Text mt='10px' fontSize='14px' fontWeight='500'>
                Once the WXOC token is successfully sent to the specified contract address and the transaction data is confirmed, Xone will automatically send the same amount of XOC to the address you used to interact with the contract. After that, switch the wallet network to the Xone mainnet and verify that the token has been received.
              </Text>
            </Box>
            <Flex
              alignItems='center'
              direction={{ base: 'column', md: 'row' }}
              justifyContent='center'
              position={{ base: 'relative', md: 'absolute' }}
              bottom={{ base: '0', md: '30px' }}
              gap={{ base: '16px', md: '0' }}
              mt={{ base: '24px', md: '0' }}
            >
              <Button
                colorScheme='priRed'
                rounded='full'
                size='lg'
                variant='outline'
                w={{ base: '100%', md: '378px' }}
                onClick={handlePrev}
              >
                Previous
              </Button>
              <Button
                colorScheme='priRed'
                rounded='full'
                size='lg'
                ml={{ base: '0', md: '16px' }}
                w={{ base: '100%', md: '378px' }}
                onClick={handleClose}
              >
                Go to release
              </Button>
            </Flex>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
      <ModalOverlay />
      <ModalContent
        w={{ base: '90%', md: '840px' }}
        h={{ base: 'auto', md: '620px' }}
        maxW={{ base: '90%', md: '840px' }}
        maxH={{ base: '571px', md: '620px' }}
        overflow='auto'
      >
        <ModalHeader textAlign='center' pt='44px'>
          Operation Guide
        </ModalHeader>
        <Button
          variant='outline'
          rounded='full'
          size='xs'
          right={{ base: '16px', md: '34px' }}
          top='34px'
          w='76px'
          position='absolute'
          onClick={handleClose}
        >
          {activeStep === 0 ? 'Skip' : 'End'}
        </Button>
        <ModalBody pb={{ base: '24px', md: '0' }}>{renderStepContent(activeStep)}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InstructionModal;
