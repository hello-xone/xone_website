import axios from '@/utils/fetch';

export const Api_Auth = {
  // 初始化用户
  initUser(address: TAddress) {
    return axios.post<TUser>('/api/auth/init-user', { address });
  },
  // 获取需要签名的信息
  getUserSignMessage(address: TAddress, referrer_code?: string) {
    return axios.get<string>('/api/auth/sign-message', { params: { address, referrer_code } });
  },
  // 登录
  login(address: TAddress, signature: string, referrer_code?: string) {
    return axios.post<{
      user: TUser;
      token: string;
    }>('/api/auth/login', { address, signature, referrer_code });
  }
};
