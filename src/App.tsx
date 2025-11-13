import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "@/assets/style/app.less";

import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { RenderRoutes } from "./routes/router";
import { useThemeConfig } from "@/hooks/useThemeConfig";
import { ThemeProvider, createTheme } from "@mui/material";
import { I18nProvider } from "@/i18n/provider";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-solidity";
import "@/assets/style/animation.less";
import { WalletKitProvider, ChainType } from "@web3jskit/walletkit";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const { themeConfig } = useThemeConfig();
  const theme = createTheme(themeConfig);
  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense>
            <Helmet>
              <meta
                name="keywords"
                content="Explore Xone Chain, the leading Behavior Value Incentive (BVI) blockchain platform. Here, every interaction creates value, and every contribution is rewarded. Join our decentralized finance revolution to experience true financial freedom, privacy protection, and community governance."
              />
              <meta name="author" content="Xone Org" />
              <meta
                property="og:title"
                content="Xone Chain - Decentralized Blockchain Platform"
              />
              <meta
                property="og:description"
                content="Xone Chain, Behavior Value Incentive Blockchain, BVI, Decentralized Finance, DeFi, Blockchain Technology, Smart Contracts, Decentralized Governance, Digital Currency, XOC, Ethereum Compatible, Peer-to-Peer Transactions, Censorship Resistance, Transparent Governance"
              />
              <meta property="og:image" content="/summary_large_image.png" />
              <meta property="og:url" content="https://www.xone.org" />
            </Helmet>
            <I18nProvider>
              <WalletKitProvider
                language="en"
                isTokenUp
                defaultChainType={ChainType.EVM}
              >
                <NotificationsProvider>
                  <RenderRoutes />
                </NotificationsProvider>
                <Analytics />
                <SpeedInsights />
              </WalletKitProvider>
            </I18nProvider>
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
