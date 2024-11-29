type TUserQuest = {
  id: number;
  user_id: number;
  config_quest: TConfigQuest;
  is_completed: boolean;
  completed_time: string;
};

type TConfigQuest = {
  id: number;
  name: string;
  point: number;
  target: string;
  mode: number;
  link: string;
  word: string;
  is_abandon: boolean;
};
