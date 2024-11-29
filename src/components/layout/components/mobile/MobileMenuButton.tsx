import { Box, BoxProps, Center, Icon } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { clsx } from 'clsx';

const _css = css`
  width: 24px;
  height: 24px;
  position: relative;
  &:before,
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: white;
    border-radius: 8px;
    position: absolute;
    left: 0;
    -webkit-transition: all 0.15s ease-in-out;
    transition: all 0.15s ease-in-out;
  }
  &:before {
    top: 4px;
    box-shadow: 0 7px white;
  }
  &:after {
    bottom: 4px;
  }
  &.active:before {
    top: 11px;
    box-shadow: none;
    -webkit-transform: rotate(225deg);
    transform: rotate(225deg);
  }
  &.active:after {
    bottom: 11px;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }
`;

type Props = {
  isOpen: boolean;
} & BoxProps;

const MobileMenuButton = (props: Props) => {
  const { isOpen, ...rest } = props;
  return (
    <Box display={{ base: 'block', lg: 'none' }} {...rest}>
      <Center as='button' rounded='full' boxSize='44px' bgColor='black'>
        <Box className={clsx('menu', isOpen ? 'active' : '')} css={_css} />
      </Center>
    </Box>
  );
};

export default MobileMenuButton;
