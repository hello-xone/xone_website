import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { customColorModeManager,Theme } from './config/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={Theme} colorModeManager={customColorModeManager}>
    <App />
  </ChakraProvider>
);
