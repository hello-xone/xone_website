import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isActive?: ReactNode;
} & BoxProps;

const MobileNavButton = (props: Props) => {
  const { isActive, ...rest } = props;
  return (
    <Flex
      w='full'
      as='button'
      px='20px'
      alignItems='center'
      h='48px'
      borderBottom='1px solid #F5F5F5'
      fontWeight='bold'
      color={isActive ? 'red.pri' : undefined}
      {...rest}
    ></Flex>
  );
};

export default MobileNavButton;
