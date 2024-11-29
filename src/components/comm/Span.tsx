import { Text, TextProps } from '@chakra-ui/react';

type Props = TextProps;

const Span = (props: Props) => {
  return <Text as='span' {...props} />;
};

export default Span;
