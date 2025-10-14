import axios, { AxiosResponse } from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || "http://47.96.7.108:8081",
});

export const nftScanRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_NFT_SCAN_SERVER,
});

export const xoMainScanRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || "http://47.96.7.108:8081",
  headers: {
    "updated-gas-oracle": true,
  },
});

export const xoTestScanRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_XO_TEST_NET_SCAN || "http://47.96.7.108:8081",
  headers: {
    "updated-gas-oracle": true,
  },
});

export const openApiRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

const commonResponseInterceptors = (response: AxiosResponse<any, any>) => {
  return response.data;
};

request.interceptors.response.use(commonResponseInterceptors);
nftScanRequest.interceptors.response.use(commonResponseInterceptors);
xoMainScanRequest.interceptors.response.use(commonResponseInterceptors);
xoTestScanRequest.interceptors.response.use(commonResponseInterceptors);
openApiRequest.interceptors.response.use(commonResponseInterceptors);