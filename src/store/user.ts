import { Api_Auth } from '@/api/auth';
import { Api_User } from '@/api/user';
import { localCache } from '@/utils/localStorage';
import { useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { useAccount } from 'wagmi';
import { signMessage } from '@wagmi/core';
import { wagmiConfig } from '@/config/wallet/wagmiClient';

type TUserState = {
  userInfo?: TUser;
};

const initialState: TUserState = {};

const _ = proxy(initialState);

export const UserState = {
  state: _,

  async onSignMessage(address: TAddress) {
    const resp = await Api_Auth.getUserSignMessage(address);
    return signMessage(wagmiConfig, {
      message: resp.data
    });
  },

  async login(address: TAddress, referrer_code?: string) {
    const signature = await UserState.onSignMessage(address);
    const resp = await Api_Auth.login(address, signature, referrer_code);
    localCache.token.set(resp.data.token);
    await UserState.refershUserInfo();
  },

  async refershUserInfo() {
    const resp = await Api_User.self();
    _.userInfo = resp.data;
  }
};

export const useUserState = () => {
  const state = useSnapshot(_);

  const { address, connector, isConnected } = useAccount();

  const _isConnected = useMemo(() => {
    return Boolean(address && connector && isConnected);
  }, [address, connector, isConnected]);

  const isLogin = useMemo(() => {
    if (!_isConnected || !state.userInfo) {
      return false;
    }
    return true;
  }, [_isConnected, state.userInfo]);

  return {
    isLogin,
    isConnected: _isConnected,
    ...state
  };
};
