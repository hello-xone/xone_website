import {
  ApiResponse,
  ChartRes,
  Counter,
  FetchNetCountersRes,
  FetchNftTotalRes,
} from "@/types/response";

import {
  nftScanRequest,
  request
} from "./request";

export const addEmail = async (data: { email: string }): Promise<null> => {
  const res: ApiResponse<null> = await request.post(
    `${import.meta.env.VITE_APP_EMAIL_SERVER}/api/subscribe/submit?token=087a1fef6489`,
    data
  );

  if (res.code === 200) {
    return res.data;
  }
  throw Error(res.msg || "");
};

export const fetchStatsByNet = async () => {
  const res = await request.get("/chaindata/stats");
  return res.data;
};

export const fetchChart = async () => {
  const res = await request.get("/coindata/chart");
  return res.data as ChartRes;
};

export const submitContactForm = async (data: {
  name: string;
  email: string;
  company_name: string;
  content: string;
}): Promise<null> => {
  const res: ApiResponse<null> = await request.put("/contact-us", data);

  if (res.code === 0) {
    return res.data;
  }
  throw Error(res.message || "Submit failed");
};
