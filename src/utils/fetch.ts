import Axios from 'axios';
import { localCache } from './localStorage';
import { getAccount } from 'wagmi/actions';
import { wagmiConfig } from '@/config/wallet/wagmiClient';
import { UserState } from '@/store/user';
import { Envs } from '@/lib/env';

declare module 'axios' {
  interface IAxiosResponse<T = null> {
    code: number;
    msg: string | null;
    data: T;
    success: boolean;
  }
  export interface AxiosResponse<T = any> extends IAxiosResponse<T> {}
}

const axios = Axios.create({
  baseURL: Envs.ApiBaseUrl
});

axios.interceptors.request.use((config) => {
  const token = localCache.token.get();
  if (token) {
    // TODO add headers token
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (getAccount(wagmiConfig).address) {
    config.headers['address'] = getAccount(wagmiConfig).address;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => {
    const { url, method, baseURL } = response.config;
    console.log();

    const requestUrl = /^https?:\/\//.test(url!) ? url : `${baseURL}${url}`;

    console.group(`%c [${method}] ${requestUrl}`, 'color:#E6A23C');
    console.log('--------- response start ------------ ');
    // console.log(`[${method}] ${baseURL}${url}`);
    if (response.data) {
      // 登录失效
      if ([40001].includes(response.data.code)) {
        console.warn('%c Failed User', 'color:#F56C6C');
        console.log('========= response end ============');
        console.groupEnd();
        throw {
          msg: response.data.msg
        };
      }
      console.log(`%c Success`, 'color:#48BB78');
      console.log(response.data);
      console.log('========= response end ============');
      console.groupEnd();
      return response.data;
    }

    console.warn('%c Failed', 'color:#F56C6C');
    console.log('========= response end ============');
    console.groupEnd();
    return response;
  },
  (err) => {
    console.group('||||||||||| error start ||||||||');
    console.log(err);
    console.log('||||||||||| error end ||||||||');
    console.groupEnd();

    throw {
      ...err,
      code: err.response?.data.code || err?.code,
      message: err.response?.data.msg || err?.message || err?.msg
    };
  }
);

export default axios;
