import {
  ApiResponse,
  Counter,
  FetchNetCountersRes,
  FetchNftTotalRes,
  NewStatsData,
} from "@/types/response";

import {
  nftScanRequest,
  openApiRequest,
  request,
  xoMainScanRequest,
  xoTestScanRequest,
} from "./request";

export const addEmail = async (data: { email: string }): Promise<null> => {
  const res: ApiResponse<null> = await request.post(
    "/emailsub/subscribe",
    data
  );

  if (res.code === 0) {
    return res.data;
  }
  throw Error(res.message || "");
};

export const fetchNftTotal = async (): Promise<FetchNftTotalRes> => {
  const res: ApiResponse<FetchNftTotalRes> =
    await nftScanRequest.get("/api/v1/nft/total");
  if (res.code === 200) {
    return res.data;
  }
  throw Error(res.message || "");
};

export const fetchNetCountersByNet = async (
  isTestNet?: boolean
): Promise<Counter[]> => {
  const reqInstance = isTestNet ? xoTestScanRequest : xoMainScanRequest;
  try {
    const res: FetchNetCountersRes = await reqInstance.get(`/api/v1/counters`);
    return res?.counters || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchStatsByNet = async (
  isTestNet?: boolean
): Promise<NewStatsData> => {
  const { data } = await openApiRequest.get("/chaindata/stats");
  const { mainnet, testnet } = data;
  const res = isTestNet ? testnet : mainnet;
  return res;
};
