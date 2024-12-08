import { Box, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';

type Props = {
  text: string;
  active?: boolean;
};

const NavButton = (props: Props) => {
  return (
    <Box
      py='8px'
      cursor='pointer'
      // rounded='full'
      px='20px'
      fontWeight='bold'
      position='relative'
      className={props.active ? 'active' : ''}
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
    >
      <Text>{props.text}</Text>
    </Box>
  );
};

export default NavButton;
