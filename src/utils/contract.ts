import { decodeFunctionResult, encodeFunctionData } from 'viem';

export interface IContractOptions {
  abi: any;
  address: string;
  functionName: string;
  rpcUrl: string;
  args?: any[];
  value?: bigint | undefined | any;
  options?: any;
  from?: string;
}

export const readContract = async (params: IContractOptions): Promise<any> => {
  const { abi, address, functionName, args = [], rpcUrl, from } = params;
  const data = encodeFunctionData({
    abi,
    functionName,
    args,
  });
  // console.log('data---', data);
  const result = await fetch(rpcUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: Math.floor(Math.random() * 100000),
      jsonrpc: '2.0',
      method: 'eth_call',
      params: [
        from ? { from: from, to: address, data } : { to: address, data },
        'latest',
      ],
    }),
  });
  const resultJSON = await result.json();
  // console.log('resultJson', resultJSON);
  if (!resultJSON.result || resultJSON.result === '0x') return result;
  const decodeRes = decodeFunctionResult({
    abi,
    functionName,
    data: resultJSON.result,
  });
  // console.log('EVM-readContract', decodeRes);
  return decodeRes;
};
