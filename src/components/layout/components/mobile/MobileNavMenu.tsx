import { Box, Collapse, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { To } from 'react-router';

import { getToProps } from '@/utils/helper';

import MobileNavButton from './MobileNavButton';

type Props = {
  title: ReactNode;
  to?: To;
  children?: ReactNode;
};

export type TNavMenuItem = {
  content: ReactNode;
};

const MobileNavMenu = (props: Props) => {
  const { title, to, children } = props;
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <MobileNavButton
        {...getToProps(to)}
        borderBottomColor={isOpen ? 'transparent' : '#F5F5F5'}
        onClick={onToggle}
      >
        <Text color={isOpen ? 'red.pri' : undefined}>{title}</Text>
        {!to ? <Icon ml='2' as={IoChevronDown} /> : undefined}
      </MobileNavButton>
      <Collapse in={isOpen} animateOpacity>
        <Box px='40px' bgColor='#F2F0FF'>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default MobileNavMenu;
