import ReleaseAbi from "./abis/XOCRelease.json";
import { Contract, providers } from "ethers";

export const getXoneEpochByNet = async (
  isTestNet?: boolean
): Promise<string> => {
  let rpc = import.meta.env.VITE_APP_XO_MAIN_NET_RPC;
  let contractAddress = import.meta.env.VITE_APP_XO_RELEASE_MAIN_NET_CONTRACT;

  if (isTestNet) {
    const blockNumber = await fetchBlockNumber(
      import.meta.env.VITE_APP_XO_TEST_NET_RPC
    );
    // Testnet: 172,800 blocks constitute one Epoch
    const epoch = Math.floor(blockNumber / 172800);
    return String(epoch < 1 ? 1 : epoch);
  }
  const provider = new providers.JsonRpcProvider(rpc);
  const contract = new Contract(contractAddress, ReleaseAbi, provider);
  const res = await contract.getEpochDetailsInfo();
  return res.curlEpoch.toString();
};

export const fetchBlockNumber = async (rpc: string) => {
  const provider = new providers.JsonRpcProvider(rpc);
  return provider.getBlockNumber();
};

export const getBlockByNumber = async (blockNumber: number, rpc: string) => {
  const provider = new providers.JsonRpcProvider(rpc);
  return provider.getBlock(blockNumber);
};
