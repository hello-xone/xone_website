import { waitForTransactionReceipt,writeContract as write } from '@wagmi/core';

import { wagmiConfig } from '@/config/wallet/wagmiClient';

type TWriteParameters = {
  address: string;
  functionName: string;
  args: any[];
  value?: bigint;
  abi: any;
};

// 写入合约
export const writeContract = async (params: TWriteParameters) => {
  const hash = await write(wagmiConfig, params as any);
  await waitForTransactionReceipt(wagmiConfig, { hash });
  return hash;
};
