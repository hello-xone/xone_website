import { getToProps } from '@/utils/helper';
import { BoxProps, Flex, Icon } from '@chakra-ui/react';
import React, { memo, ReactNode, useMemo } from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { To } from 'react-router';

type Props = {
  children: ReactNode;
  to?: To;
} & BoxProps;

const ExternalLink = (props: Props) => {
  const { to, ...rest } = props;

  const toProps = useMemo(() => {
    return getToProps(to);
  }, [to]);

  return (
    <Flex display='inline-flex' alignItems='center' {...rest} {...toProps}>
      {props.children}
      <Icon as={MdOutlineArrowOutward} ml='6px' />
    </Flex>
  );
};

export default memo(ExternalLink);
