import { Box, Collapse, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { forwardRef, Ref, useEffect, useImperativeHandle } from 'react';
import { Link, useLocation } from 'react-router-dom';

import ExternalLink from '@/components/comm/ExternalLink';
import { ReactRouterLink } from '@/components/comm/ReactRouterLink';
import RouteLink from '@/components/comm/RouteLink';
import { EXTERNAL_LINKS } from '@/lib/external';
import { isExternalLink } from '@/utils/helper';

import { MENUS_CONFIG } from '../../config/menus';
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
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.setProperty('--app-header-bg-color', 'white');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden auto';
      document.documentElement.style.setProperty('--app-header-bg-color', 'transparent');
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

  useEffect(() => {
    onClose();
  }, [location.pathname]);

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
        <Box minH='100%' bgColor='white' py='20px' height='100%' maxW='100%' overflow='auto'>
          {MENUS_CONFIG.map((menu, index) => (
            <MobileNavMenu key={index} title={menu.text} to={menu.href}>
              {menu.items &&
                menu.items.map((item, subIndex) => (
                  <Flex key={subIndex} alignItems='center' h='48px' fontWeight='bold'>
                    <RouteLink to={item.href}>{item.label}</RouteLink>
                  </Flex>
                ))}
            </MobileNavMenu>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

export default forwardRef(MobileNavContainer);
