import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import NavButton from './NavButton';
import { css } from '@emotion/react';
import { MenuList_CSS } from '@/assets/style/menu';
import ExternalLink from '@/components/comm/ExternalLink';
import { EXTERNAL_LINKS } from '@/lib/external';
import { Link } from 'react-router-dom';
import { memo, useRef } from 'react';

type Props = {
  text: string;
};

const NavMenuButton = (props: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const closeTimerRef = useRef<number>();
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
      <Menu closeOnSelect={false} isOpen={isOpen} onClose={onClose}>
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
                <NavButton active={_isOpen} text={props.text} />
              </MenuButton>
              <MenuList onMouseOver={_onOpen} css={MenuList_CSS}>
                {props.text === 'Build' ? (
                  <>
                    <CMenuItem href={EXTERNAL_LINKS.docs + 'developers/ready'}>
                      <ExternalLink>
                        <Text>Developer Docs</Text>
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
                  </>
                ) : props.text === 'Donate' ? (
                  <>
                    <CMenuItem href={EXTERNAL_LINKS.Donate}>
                      <ExternalLink>
                        <Text>Go to Donate</Text>
                      </ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.DonateDocs}>
                      <ExternalLink>
                        <Text>Donate Support</Text>
                      </ExternalLink>
                    </CMenuItem>
                  </>
                ) : props.text === 'Social' ? (
                  <>
                    <CMenuItem href={EXTERNAL_LINKS.Twitter}>
                      <ExternalLink>
                        <Text>X</Text>
                      </ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.Telegram}>
                      <ExternalLink>
                        <Text>Telegram</Text>
                      </ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.Events}>
                      <ExternalLink>
                        <Text>Events</Text>
                      </ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.Medium}>
                      <ExternalLink>
                        <Text>News</Text>
                      </ExternalLink>
                    </CMenuItem>
                  </>
                ) : props.text === 'Ecosystem' ? (
                  <>
                    <CMenuItem href={EXTERNAL_LINKS.TokenUp}>
                      <ExternalLink>
                        <Text>TokenUp</Text>
                      </ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.SwapX}>
                      <ExternalLink>
                        <Text>SwapX</Text>
                      </ExternalLink>
                    </CMenuItem>
                    <CMenuItem href={EXTERNAL_LINKS.Bridge}>
                      <ExternalLink>
                        <Text>RainLink</Text>
                      </ExternalLink>
                    </CMenuItem>
                  </>
                ) : null}
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
