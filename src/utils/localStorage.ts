export const LOCAL_PRE = '';

const _getCacheOperations = <T = string>(name: any, defaultValue?: any) => {
  const key = LOCAL_PRE + name;
  return {
    get: () => (localStorage.getItem(key) as T | null) || defaultValue,
    remove: () => localStorage.removeItem(key),
    set: (val: string) => localStorage.setItem(key, val)
  };
};

const localCache = {
  token: _getCacheOperations<string>('token')
};

export { localCache };
