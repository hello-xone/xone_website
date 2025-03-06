import { Chain } from 'viem';

export const XoneTestnet: Chain = {
  id: 33772211,
  name: 'Xone Testnet',
  nativeCurrency: {
    name: 'XOC',
    symbol: 'XOC',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [
        'https://rpc-testnet.xone.org',
        'https://rpc-testnet.xone.plus',
        'https://rpc-testnet.knight.center'
      ]
    }
  },
  blockExplorers: {
    default: {
      name: 'Xone Testnet explorer',
      url: 'https://testnet.xscscan.com',
      apiUrl: 'https://testnet.xscscan.com/api'
    }
  }
};
