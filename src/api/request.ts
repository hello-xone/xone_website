import axios, { AxiosResponse } from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || "http://47.96.7.108:8081",
});


const commonResponseInterceptors = (response: AxiosResponse<any, any>) => {
  return response.data;
};

request.interceptors.response.use(commonResponseInterceptors);
