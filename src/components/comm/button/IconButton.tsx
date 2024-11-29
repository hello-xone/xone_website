import { Icon, Text } from '@chakra-ui/react';
import React, { ElementType } from 'react';
import { Link } from 'react-router-dom';

type Props = { href?: string; as: ElementType };

const IconButton = ({ href, as }: Props) => {
  return (
    // @ts-ignore
    <Text
      {...(href?.startsWith('/')
        ? {
            as: Link,
            to: href
          }
        : {
            as: 'a',
            href: href,
            to: '',
            target: '_blank'
          })}
    >
      <Icon as={as} fontSize='xl' cursor='pointer' color='white' />
    </Text>
  );
};

export default IconButton;
