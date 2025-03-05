import { Box } from '@chakra-ui/react';

import { ReleaseProvider } from './context/provider';
import Records from './sections/Records';
import ReleaseBanner from './sections/ReleaseBanner';
import Steps from './sections/Steps';
import UserReleaseForm from './sections/UserReleaseForm';

const Release = () => {
  return (
    <ReleaseProvider>
      <Box bgColor='#F2F4F8' pb='120px'>
        <ReleaseBanner />
        <UserReleaseForm />
        <Steps />
        <Records />
      </Box>
    </ReleaseProvider>
  );
};

export default Release;

