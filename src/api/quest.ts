import axios from '@/utils/fetch';

export const Api_Quest = {
  getAllConfigQuest() {
    return axios.get<TConfigQuest[]>('/api/config-quest/');
  },
  getUserQuest() {
    return axios.get<TUserQuest[]>('/api/user-quest/');
  },
  // 验证任务
  verify(user_quest_id: number) {
    return axios.post('/api/user-quest/verify', { user_quest_id });
  }
};
