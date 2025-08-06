import {
  ApiResponse,
  Counter,
  FetchNetCountersRes,
  FetchNftTotalRes,
  Stats,
} from "@/types/response";
import {
  request,
  nftScanRequest,
  xoMainScanRequest,
  xoTestScanRequest,
} from "./request";
export const addEmail = async (data: { email: string }): Promise<null> => {
  const res: ApiResponse<null> = await request.post("/api/v1/email/add", data);

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

export const fetchStatsByNet = async (isTestNet?: boolean) => {
  const reqInstance = isTestNet ? xoTestScanRequest : xoMainScanRequest;
  const res: Stats = await reqInstance.get("/api/v2/stats");
  return res;
};
