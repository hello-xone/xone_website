import { Chain } from 'viem';

export const XoneMainnet: Chain = {
  id: 3721,
  name: 'Xone Mainnet',
  nativeCurrency: {
    name: 'XOC',
    symbol: 'XOC',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.xone.org']
    }
  },
  blockExplorers: {
    default: {
      name: 'Xone explorer',
      url: 'https://xscscan.com',
      apiUrl: 'https://xscscan.com/api'
    }
  }
};
