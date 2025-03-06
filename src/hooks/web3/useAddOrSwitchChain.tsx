import React from 'react';
import { Chain } from 'viem';

import getErrorObj from '@/lib/errors/getErrorObj';

import useProvider from './useProvider';

export default function useAddOrSwitchChain({ chain }: { chain: Chain }) {
  const { wallet, provider } = useProvider();

  return React.useCallback(async () => {
    if (!wallet || !provider) {
      return;
    }

    const hexadecimalChainId = '0x' + Number(chain.id).toString(16);

    try {
      return await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexadecimalChainId }]
      });
    } catch (error) {
      const errorObj = getErrorObj(error) as any;
      const code = errorObj && 'code' in errorObj ? errorObj.code : undefined;
      const originalErrorCode = errorObj?.data?.originalError?.code;

      // This error code indicates that the chain has not been added to Wallet.
      if (code === 4902 || originalErrorCode === 4902) {
        const params = [
          {
            chainId: hexadecimalChainId,
            chainName: chain.name,
            nativeCurrency: {
              name: chain.nativeCurrency.name,
              symbol: chain.nativeCurrency.symbol,
              decimals: chain.nativeCurrency.decimals
            },
            rpcUrls: [chain.rpcUrls.default.http[0]],
            blockExplorerUrls: [chain.blockExplorers?.default.url]
          }
        ] as never;
        // in wagmi types for wallet_addEthereumChain method is not provided

        return await provider.request({
          method: 'wallet_addEthereumChain',
          params: params
        });
      }

      throw error;
    }
  }, [provider, wallet]);
}
