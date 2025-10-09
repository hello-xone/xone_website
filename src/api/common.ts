import {
  ApiResponse,
  ChartRes,
} from "@/types/response";

import { request } from "./request";

export const addEmail = async (data: { email: string }): Promise<null> => {
  const res: ApiResponse<null> = await request.post("/emailsub/subscribe", data);

  if (res.code === 0) {
    return res.data;
  }
  throw Error(res.data || "");
};


export const fetchStatsByNet = async () => {
  const res = await request.get("/chaindata/stats");
  return res.data;
};

export const fetchChart = async () => {
  const res = await request.get("/coindata/chart");
  return res.data as ChartRes;
};
