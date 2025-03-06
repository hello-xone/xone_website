import { Box, BoxProps, Flex, Text } from '@chakra-ui/react';

import ExternalLink from '@/components/comm/ExternalLink';

type Props = {
  title: string;
  links: {
    text: string;
    to: string;
  }[];
} & BoxProps;

const FooterLinks = (props: Props) => {
  const { title, links, ...rest } = props;
  return (
    <Box color='white' textAlign='left' {...rest}>
      <Text color='#bcbfcd' fontWeight='bold' mb='2'>
        {title}
      </Text>
      <Flex flexDirection='column' gap='2'>
        {links.map((link, i) => (
          <Box key={i}>
            <ExternalLink to={link.to} color='#808080' _hover={{ color: '#ffffff' }}>
              {link.text}
            </ExternalLink>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default FooterLinks;
