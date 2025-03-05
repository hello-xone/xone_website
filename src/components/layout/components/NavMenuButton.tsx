import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  useDisclosure
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { memo, ReactNode, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { MenuList_CSS } from '@/assets/style/menu';
import { getToProps } from '@/utils/helper';

import NavButton from './NavButton';

type Props = {
  text: string;
  to?: string;
  children?: ReactNode;
};

const NavMenuButton = (props: Props) => {
  const { text, to, children } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const closeTimerRef = useRef<NodeJS.Timeout>();
  const _onOpen = () => {
    clearTimeout(closeTimerRef.current);
    onOpen();
  };

  const isActive = useLocation().pathname === to;

  return (
    <Box
      onMouseLeave={() => {
        closeTimerRef.current = setTimeout(() => {
          onClose();
        }, 50);
      }}
    >
      {to ? (
        <NavButton {...getToProps(to)} text={text} active={isActive} />
      ) : (
        <Menu closeOnSelect={false} isOpen={isOpen}>
          {({ isOpen: _isOpen }) => {
            return (
              <>
                <MenuButton
                  onMouseOver={!to ? _onOpen : undefined}
                  css={css`
                    &:hover {
                      > span {
                        > div {
                          &::after {
                            background-color: #ed0000;
                            width: 100%;
                          }
                        }
                      }
                    }
                  `}
                >
                  <NavButton active={_isOpen} text={text} />
                </MenuButton>
                <MenuList onMouseOver={_onOpen} css={MenuList_CSS}>
                  {children}
                </MenuList>
              </>
            );
          }}
        </Menu>
      )}
    </Box>
  );
};

export default memo(NavMenuButton);

export const CMenuItem = memo((props: MenuItemProps) => {
  const { ...rest } = props;
  return (
    <MenuItem
      rounded='full'
      w='full'
      lineHeight={1}
      py='14px'
      px='5'
      fontWeight='bold'
      bgColor='white'
      _hover={{
        bgColor: 'priRed.100'
      }}
      {...rest}
    />
  );
});
