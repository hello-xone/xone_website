import { wagmiConfig } from '@/config/wallet/wagmiClient';
import { readContract } from '@wagmi/core';
import { writeContract } from './contractActions';
import { erc20Abi, maxUint256 } from 'viem';

export const Erc20BalanceOf = (contractAddress: TAddress, from: TAddress | string) => {
  return readContract(wagmiConfig, {
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'balanceOf',
    args: [from as TAddress]
  });
};

// 授权代币
export const Erc20Approve = async (
  contractAddress: TAddress,
  from: TAddress | string,
  to: TAddress | string,
  amountWei: bigint
) => {
  const allowance = await Erc20Allowance(contractAddress, from, to);
  if (allowance >= amountWei) {
    return true;
  }
  return writeContract({
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'approve',
    args: [to as TAddress, maxUint256]
  });
};

// 查询授权
export const Erc20Allowance = (
  contractAddress: TAddress,
  from: TAddress | string,
  to: TAddress | string
) => {
  return readContract(wagmiConfig, {
    abi: erc20Abi,
    address: contractAddress,
    functionName: 'allowance',
    args: [from as TAddress, to as TAddress]
  });
};
