import "@/assets/style/app.less";
import "@/assets/style/code-highlight.less";
import "@/assets/style/font.css";

import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { ChainType, WalletKitProvider } from "@web3jskit/walletkit";
import { Suspense, useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";

import { useHreflang } from "@/hooks/useHreflang";
import { I18nProvider } from "@/i18n/provider";

import Announcement from "./components/comm/announcement";
import { RenderRoutes } from "./routes/router";

function AppContent() {
  useHreflang(); // 自动管理 hreflang 标签
  
  return (
    <WalletKitProvider
      language="en"
      isTokenUp
      defaultChainType={ChainType.EVM}
    >
      <NotificationsProvider>
        <Toaster toastOptions={{
          className: "common-toast"
        }} />
        <RenderRoutes />
        <Announcement />
      </NotificationsProvider>
    </WalletKitProvider>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
  }, [])
  return (
    <BrowserRouter>
      <Suspense>
        <I18nProvider>
          <AppContent />
        </I18nProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
