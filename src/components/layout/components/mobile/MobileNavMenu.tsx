import { Box, Collapse, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import MobileNavButton from './MobileNavButton';
type Props = {
  title: ReactNode;
  menus: TNavMenuItem[];
};

export type TNavMenuItem = {
  content: ReactNode;
};

const MobileNavMenu = (props: Props) => {
  const { title, menus } = props;
  const { isOpen, onClose, onToggle } = useDisclosure();
  return (
    <Box>
      <MobileNavButton borderBottomColor={isOpen ? 'transparent' : '#F5F5F5'} onClick={onToggle}>
        <Text color={isOpen ? 'red.pri' : undefined}>{title}</Text>
        <Icon ml='2' as={IoChevronDown} />
      </MobileNavButton>
      <Collapse in={isOpen} animateOpacity>
        {menus?.map((menu, i) => {
          return (
            <Flex
              key={i}
              alignItems='center'
              h='48px'
              px='40px'
              fontWeight='bold'
              bgColor='#F2F0FF'
            >
              {menu.content}
            </Flex>
          );
        })}
      </Collapse>
    </Box>
  );
};

export default MobileNavMenu;
