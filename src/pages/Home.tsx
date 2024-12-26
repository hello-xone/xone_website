import { Box } from '@chakra-ui/react';

import HomePage from '@/ui/home/HomePage';

type Props = {};

const Home = (props: Props) => {
  return (
    <Box className='pt-header'>
      <HomePage />
    </Box>
  );
};

export default Home;
