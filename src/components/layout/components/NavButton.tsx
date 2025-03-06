import { Box, BoxProps, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';

type Props = {
  text: string;
  active?: boolean;
} & BoxProps;

const NavButton = (props: Props) => {
  const { text, active, ...rest } = props;
  return (
    <Box
      py='8px'
      cursor='pointer'
      display='block'
      // rounded='full'
      px='20px'
      fontWeight='bold'
      position='relative'
      className={active ? 'active' : ''}
      css={css`
        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          content: '';
          transition: 0.3s all;
          height: 2px;
        }
        &.active,
        &:hover {
          &::after {
            width: 100%;
            background-color: #ed0000;
          }
        }
      `}
      {...rest}
    >
      <Text>{text}</Text>
    </Box>
  );
};

export default NavButton;
