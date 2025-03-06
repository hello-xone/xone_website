import axios from 'axios';

export const API_Explorer = {
  getState(url: string) {
    return axios.get<{ average_block_time: number }>(url + '/v2/stats');
  }
};
