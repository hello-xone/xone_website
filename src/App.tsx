import '@/assets/style/app.less';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

import { Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';

import MobileNavContainer from './components/layout/components/mobile/MobileNavContainer';
import { mobileNavWrapRef } from './components/layout/hooks';
import { wagmiConfig } from './config/wallet/wagmiClient';
import { RenderRoutes } from './routes/router';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta
          name='keywords'
          content='Explore Xone Chain, the leading Behavior Value Incentive (BVI) blockchain platform. Here, every interaction creates value, and every contribution is rewarded. Join our decentralized finance revolution to experience true financial freedom, privacy protection, and community governance.'
        />
        <meta name='author' content='Xone Org' />
        <meta property='og:title' content='Xone Chain - Decentralized Blockchain Platform' />
        <meta
          property='og:description'
          content='Xone Chain, Behavior Value Incentive Blockchain, BVI, Decentralized Finance, DeFi, Blockchain Technology, Smart Contracts, Decentralized Governance, Digital Currency, XOC, Ethereum Compatible, Peer-to-Peer Transactions, Censorship Resistance, Transparent Governance'
        />
        <meta property='og:image' content='/summary_large_image.png' />
        <meta property='og:url' content='https://www.xone.org' />
      </Helmet>
      <Box>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
              <Suspense>
                <RenderRoutes />
              </Suspense>
              <MobileNavContainer ref={mobileNavWrapRef} />
            </BrowserRouter>
          </QueryClientProvider>
        </WagmiProvider>
      </Box>
    </HelmetProvider>
  );
}

export default App;
