import HomePage from '@/ui/home/HomePage';
import { Box } from '@chakra-ui/react';
type Props = {};

const Home = (props: Props) => {
  return (
    <Box className='pt-header'>
      <HomePage />
    </Box>
  );
};

export default Home;
