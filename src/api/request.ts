import axios, { AxiosResponse } from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

export const nftScanRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_NFT_SCAN_SERVER,
});

export const xoMainScanRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_XO_MAIN_NET_SCAN,
  headers: {
    "updated-gas-oracle": true,
  },
});

export const xoTestScanRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_XO_TEST_NET_SCAN,
  headers: {
    "updated-gas-oracle": true,
  },
});

export const openApiRequest = axios.create({
  baseURL: "/openapi",
});

const commonResponseInterceptors = (response: AxiosResponse<any, any>) => {
  return response.data;
};

request.interceptors.response.use(commonResponseInterceptors);
nftScanRequest.interceptors.response.use(commonResponseInterceptors);
xoMainScanRequest.interceptors.response.use(commonResponseInterceptors);
xoTestScanRequest.interceptors.response.use(commonResponseInterceptors);
openApiRequest.interceptors.response.use(commonResponseInterceptors);
