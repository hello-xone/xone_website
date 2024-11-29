const getEnv = (name: string) => {
  return import.meta.env[name];
};
const getBoolEnv = (name: string) => {
  return getEnv(name) === 'true' || getEnv(name) === true;
};

export const Envs = {
  ApiBaseUrl: getEnv('VITE_APP_BASE_URL'),
  isTestNet: getBoolEnv('VITE_APP_IS_TESTNET')
};
