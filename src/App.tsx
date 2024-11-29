import { Box } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { RenderRoutes } from './routes/router';
import { Suspense } from 'react';
// import { wagmiConfig } from './config/wallet/wagmiClient';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/assets/style/app.less';
import MobileNavContainer from './components/layout/components/mobile/MobileNavContainer';
import { mobileNavWrapRef } from './components/layout/hooks';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

const queryClient = new QueryClient();

function App() {
  return (
    <Box>
      {/* <WagmiProvider config={wagmiConfig}> */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense>
            <RenderRoutes />
          </Suspense>
          <MobileNavContainer ref={mobileNavWrapRef} />
        </BrowserRouter>
      </QueryClientProvider>
      {/* </WagmiProvider> */}
    </Box>
  );
}

export default App;
