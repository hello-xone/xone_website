import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { lineaSepolia, polygonAmoy, sepolia } from 'viem/chains';
const projectId = import.meta.env.VITE_APP_PROJECT_ID;

export const chains = [sepolia, polygonAmoy, lineaSepolia] as const;

// 判断当前是否是支持的chain
export const isSupportedChain = (chainId: number) => chains.find((chain) => chain.id === chainId);

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains,
  metadata
});

createWeb3Modal({
  allowUnsupportedChain: true,
  wagmiConfig,
  projectId
});
