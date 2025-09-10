import {
  ApiResponse,
  ChartRes,
  Counter,
  FetchNetCountersRes,
  FetchNftTotalRes,
  Stats,
} from "@/types/response";

import {
  nftScanRequest,
  request,
  xoMainScanRequest,
  xoTestScanRequest,
} from "./request";

export const addEmail = async (data: { email: string }): Promise<null> => {
  const res: ApiResponse<null> = await request.post("/api/v2/email/subscribe", data);

  if (res.code === 0) {
    return res.data;
  }
  throw Error(res.data || "");
};

export const fetchNftTotal = async (): Promise<FetchNftTotalRes> => {
  const res: ApiResponse<FetchNftTotalRes> =
    await nftScanRequest.get("/api/v2/nft/total");
  if (res.code === 0) {
    return res.data;
  }
  throw Error(res.message || "");
};

export const fetchNetCountersByNet = async (
  isTestNet?: boolean
): Promise<Counter[]> => {
  // const reqInstance = isTestNet ? xoTestScanRequest : xoMainScanRequest;
  try {
    const res: FetchNetCountersRes = await request.get(`/api/v2/counters`);
    return res?.data || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchStatsByNet = async (isTestNet?: boolean) => {
  // const reqInstance = isTestNet ? xoTestScanRequest : xoMainScanRequest;
  const res = await request.get("/api/v2/stats");
  return res.data;
};

export const fetchChart = async () => {
  const res = await request.get("/api/v2/chart");
  return res.data as ChartRes;
};
