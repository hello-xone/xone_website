import axios from '@/utils/fetch';
import { localCache } from '@/utils/localStorage';

export const Api_Twitter = {
  getOauthURL() {
    const _URL = new URL(window.location.href);
    _URL.searchParams.append('token', localCache.token.get()!);
    return axios.get<string>('/api/twitter/oauth', {
      params: {
        client_url: _URL.toString()
      }
    });
  }
};
