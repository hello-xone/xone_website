import { Box } from '@chakra-ui/react';

import { XoneMainnet } from '@/config/chain/XoneMainnet';
import { XoneTestnet } from '@/config/chain/XoneTestnet';
import AccessEndpointsCard from '@/ui/build/access/components/AccessEndpointsCard';
import AccessBanner from '@/ui/build/access/sections/AccessBanner';
import AccessFeedback from '@/ui/build/access/sections/AccessFeedback';

type Props = {};

const Access = (props: Props) => {
  return (
    <Box bg='#F2F4F8' pb='80px'>
      <AccessBanner />
      <AccessEndpointsCard chain={XoneMainnet} />
      <AccessEndpointsCard chain={XoneTestnet} isTestnet />

      <AccessFeedback />
    </Box>
  );
};

export default Access;
