import { Box, BoxProps } from '@chakra-ui/react';
import { useMemo } from 'react';
import { To } from 'react-router';

import { getToProps, isExternalLink } from '@/utils/helper';

import ExternalLink from './ExternalLink';

type Props = {
  to: To;
} & BoxProps;

const RouteLink = (props: Props) => {
  const { to, ...rest } = props;
  const toProps = useMemo(() => getToProps(to), [to]);
  if (isExternalLink(to)) {
    return (
      <ExternalLink to={to} {...rest}>
        {rest.children}
      </ExternalLink>
    );
  }

  return <Box {...rest} {...toProps}></Box>;
};

export default RouteLink;
