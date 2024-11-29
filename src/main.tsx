import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme, customColorModeManager } from './config/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={Theme} colorModeManager={customColorModeManager}>
    <App />
  </ChakraProvider>
);
