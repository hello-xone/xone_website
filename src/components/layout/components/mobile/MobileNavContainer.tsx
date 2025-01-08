import { Box, Collapse, Text, useDisclosure } from '@chakra-ui/react';
import { forwardRef, Ref, useEffect, useImperativeHandle } from 'react';

import ExternalLink from '@/components/comm/ExternalLink';
import { EXTERNAL_LINKS } from '@/lib/external';

import MobileNavMenu from './MobileNavMenu';

type Props = {};

export type TMobileNavContainerRef = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
};

function MobileNavContainer(props: Props, ref: Ref<TMobileNavContainerRef>) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden auto';
    }
  }, [isOpen]);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: onOpen,
        close: onClose,
        toggle: onToggle,
        isOpen
      };
    },
    [isOpen]
  );

  return (
    <Box
      display={isOpen ? 'block' : 'none'}
      position='fixed'
      top='calc(var(--app-header-height) - var(--app-header-alert-height))'
      left='0'
      right='0'
      bottom='0'
      overflow='auto'
      zIndex={10}
    >
      <Collapse endingHeight='100%' in={isOpen} animateOpacity>
        <Box minH='100%' bgColor='white' py='20px'>
          <MobileNavMenu
            title='Study'
            menus={[
              // {
              //   content: (
              //     <Text as={Link} to='/'>
              //       Get started
              //     </Text>
              //   )
              // },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.docs + 'study/xone'}>
                    <Text>What is Xone?</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.docs + 'study/account'}>
                    <Text>What is a Xone Account?</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.docs + 'study/xoc'}>
                    <Text>Xone Coin</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.docs + 'study/gas'}>
                    <Text>Gas Fees</Text>
                  </ExternalLink>
                )
              }
            ]}
          />

          <MobileNavMenu
            title='Build'
            menus={[
              // {
              //   content: (
              //     <Text as={Link} to='/'>
              //       Get started
              //     </Text>
              //   )
              // },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.docs + 'developers/ready'}>
                    <Text>Docs</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.TestnetExplorer}>
                    <Text>Testnet explorer</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.faucet}>
                    <Text>Faucet</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.docs + 'study/bug'}>
                    <Text>Bounty Hunter</Text>
                  </ExternalLink>
                )
              }
            ]}
          />
          <MobileNavMenu
            title='Donate'
            menus={[
              // {
              //   content: (
              //     <Text as={Link} to='/'>
              //       Get started
              //     </Text>
              //   )
              // },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.Donate}>
                    <Text>Go to Donate</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.DonateDocs}>
                    <Text>Donate Support</Text>
                  </ExternalLink>
                )
              }
            ]}
          />
          <MobileNavMenu
            title='Social'
            menus={[
              // {
              //   content: (
              //     <Text as={Link} to='/'>
              //       Get started
              //     </Text>
              //   )
              // },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.Twitter}>
                    <Text>X</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.Telegram}>
                    <Text>Telegram</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.Events}>
                    <Text>Events</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.Medium}>
                    <Text>News</Text>
                  </ExternalLink>
                )
              }
            ]}
          />
          <MobileNavMenu
            title='Ecosystem'
            menus={[
              // {
              //   content: (
              //     <Text as={Link} to='/'>
              //       Get started
              //     </Text>
              //   )
              // },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.TokenUp}>
                    <Text>TokenUp</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.SwapX}>
                    <Text>SwapX</Text>
                  </ExternalLink>
                )
              },
              {
                content: (
                  <ExternalLink to={EXTERNAL_LINKS.RainLink}>
                    <Text>RainLink</Text>
                  </ExternalLink>
                )
              }
            ]}
          />
        </Box>
      </Collapse>
    </Box>
  );
}

export default forwardRef(MobileNavContainer);
