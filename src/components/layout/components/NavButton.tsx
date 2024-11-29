import { Box, Text } from '@chakra-ui/react';

type Props = {
  text: string;
  active?: boolean;
};

const NavButton = (props: Props) => {
  return (
    <Box
      py='8px'
      cursor='pointer'
      rounded='full'
      px='20px'
      fontWeight='bold'
      bgColor={props.active ? '#F2F0FF' : undefined}
      _hover={{
        bgColor: '#F2F0FF'
      }}
    >
      <Text>{props.text}</Text>
    </Box>
  );
};

export default NavButton;
