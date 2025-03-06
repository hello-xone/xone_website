import { Box, BoxProps } from '@chakra-ui/react';

type Props = {
  isActive?: boolean;
} & BoxProps;

const AppsTab = (props: Props) => {
  const { isActive, ...rest } = props;
  return (
    <Box
      as='button'
      bgColor={isActive ? 'red.pri' : 'white'}
      rounded='full'
      fontSize={{ lg: '20px' }}
      h='48px'
      px='5'
      minW='140px'
      transition='0.2s all'
      color={isActive ? 'white' : 'black'}
      _hover={{
        bgColor: isActive ? 'red.pri' : 'gray.200'
      }}
      {...rest}
    ></Box>
  );
};

export default AppsTab;
