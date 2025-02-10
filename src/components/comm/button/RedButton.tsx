import React from 'react';

import LoadingButton from './LoadingButton';

type Props = React.ComponentProps<typeof LoadingButton>;

const OutlineButton = (props: Props) => {
  return (
    <LoadingButton
      rounded='full'
      borderWidth='2px'
      borderColor='priRed.500'
      color='priRed.500'
      _hover={{
        bgColor: 'priRed.500',
        color: 'white'
      }}
      variant='outline'
      {...props}
      colorScheme='priRed'
    />
  );
};

export default OutlineButton;
