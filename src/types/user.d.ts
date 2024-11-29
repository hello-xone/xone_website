type TUser = {
  id: number;
  name: string;
  email: string;
  address: string | TAddress;
  invite_code: string;
  referrer?: string;
  referrer_code?: string;
  twitter_info?: object;
  twitter_screen_name?: string;
  twitter_id?: string;
  last_online_time: string;
  invite_count?: number;
};

type TUserQuestPoint = {
  id: number;
  points: number;
  user_id: number;
};
