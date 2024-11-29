import { wagmiConfig } from '@/config/wallet/wagmiClient';
import { writeContract as write, waitForTransactionReceipt } from '@wagmi/core';

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
