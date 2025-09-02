import { request } from "./request";

const prefix = "/api/v2";

interface VerifyData {
  category: string;
  value: string;
}

export const Api_Verification = {
  // 验证官方信息
  verify(data: VerifyData) {
    return request.post(prefix + "/verify", data);
  },
};
