import '@/assets/style/app.less';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

import { Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

// import { wagmiConfig } from './config/wallet/wagmiClient';
// import { WagmiProvider } from 'wagmi';
import MobileNavContainer from './components/layout/components/mobile/MobileNavContainer';
import { mobileNavWrapRef } from './components/layout/hooks';
import { RenderRoutes } from './routes/router';

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
