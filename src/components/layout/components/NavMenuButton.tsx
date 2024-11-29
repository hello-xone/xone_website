import { Box, Menu, MenuButton, MenuItem, MenuItemProps, MenuList, Text } from '@chakra-ui/react';
import NavButton from './NavButton';
import { css } from '@emotion/react';
import { MenuList_CSS } from '@/assets/style/menu';
import ExternalLink from '@/components/comm/ExternalLink';
import { EXTERNAL_LINKS } from '@/lib/external';
import { Link } from 'react-router-dom';
import { memo } from 'react';

type Props = {
  text: string;
};

const NavMenuButton = (props: Props) => {
  return (
    <Box>
      <Menu closeOnSelect={false}>
        {({ isOpen }) => {
          return (
            <>
              <MenuButton
                css={css`
                  &:hover {
                    > span {
                      > div {
                        background-color: #f2f0ff;
                      }
                    }
                  }
                `}
              >
                <NavButton active={isOpen} text={props.text} />
              </MenuButton>
              <MenuList css={MenuList_CSS}>
                {/* <CMenuItem href={'/'}>Get started</CMenuItem> */}

                <CMenuItem href={EXTERNAL_LINKS.docs + 'developers/ready'}>
                  <ExternalLink>
                    <Text>Docs</Text>
                  </ExternalLink>
                </CMenuItem>
                <CMenuItem href={EXTERNAL_LINKS.TestnetExplorer}>
                  <ExternalLink>
                    <Text>Testnet explorer</Text>
                  </ExternalLink>
                </CMenuItem>

                <CMenuItem href={EXTERNAL_LINKS.faucet}>
                  <ExternalLink>
                    <Text>Faucet</Text>
                  </ExternalLink>
                </CMenuItem>
              </MenuList>
            </>
          );
        }}
      </Menu>
    </Box>
  );
};

export default memo(NavMenuButton);

const CMenuItem = memo((props: { href?: string } & MenuItemProps) => {
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
        bgColor: '#F2F0FF'
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
