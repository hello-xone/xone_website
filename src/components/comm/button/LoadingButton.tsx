import { getToProps } from '@/utils/helper';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { To } from 'react-router';
import { Link } from 'react-router-dom';

function LoadingButton(
  props: {
    to?: To;
  } & ButtonProps
) {
  const { to, ...rest } = props;
  const [loading, setLoading] = useState(false);

  const _onClick = async (event: any) => {
    try {
      setLoading(true);
      await props.onClick?.(event);
    } finally {
      setLoading(false);
    }
  };

  const toObj = useMemo(() => {
    return getToProps(to);
  }, [to]);

  return <Button {...toObj} {...rest} isLoading={loading || props.isLoading} onClick={_onClick} />;
}

export default LoadingButton;
