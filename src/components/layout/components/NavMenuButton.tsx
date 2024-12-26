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
import { Link } from 'react-router-dom';

import { MenuList_CSS } from '@/assets/style/menu';

import NavButton from './NavButton';

type Props = {
  text: string;
  MenuListContent: ReactNode;
};

const NavMenuButton = (props: Props) => {
  const { text, MenuListContent } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const closeTimerRef = useRef<NodeJS.Timeout>();
  const _onOpen = () => {
    clearTimeout(closeTimerRef.current);
    onOpen();
  };

  return (
    <Box
      onMouseLeave={() => {
        closeTimerRef.current = setTimeout(() => {
          onClose();
        }, 50);
      }}
    >
      <Menu closeOnSelect={false} isOpen={isOpen}>
        {({ isOpen: _isOpen }) => {
          return (
            <>
              <MenuButton
                onMouseOver={_onOpen}
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
                {MenuListContent}
              </MenuList>
            </>
          );
        }}
      </Menu>
    </Box>
  );
};

export default memo(NavMenuButton);

export const CMenuItem = memo((props: { href?: string } & MenuItemProps) => {
  const { href, ...rest } = props;
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
      {...(href
        ? href?.startsWith('/')
          ? {
              as: Link,
              to: href
            }
          : {
              as: 'a',
              href: href,
              target: '_blank'
            }
        : {})}
      {...rest}
    />
  );
});
