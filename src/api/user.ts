import axios from '@/utils/fetch';

const prefix = '/api/user';
export const Api_User = {
  // 获取用户的个人信息
  self() {
    return axios.get<TUser>(prefix + '/self');
  },
  //
  getUserQuestPoint() {
    return axios.get<TUserQuestPoint>(prefix + '/user-quest-point');
  }
};
