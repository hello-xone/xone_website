import { Box } from '@chakra-ui/react';

import Banner from '@/ui/build/sections/Banner';
import DevSupports from '@/ui/build/sections/DevSupports';
import Expert from '@/ui/build/sections/Expert';
import Section3 from '@/ui/build/sections/Section3';
import Technology from '@/ui/build/sections/Technology';

type Props = {};

const Build = (props: Props) => {
  return (
    <Box bgColor='#F2F4F8' pb='80px'>
      <Banner />
      <Technology />
      <Section3 />
      <Expert />
      <DevSupports />
    </Box>
  );
};

export default Build;
