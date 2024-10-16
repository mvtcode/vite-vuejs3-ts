import { User } from '@/interfaces/user';
import { LOCAL_STORAGE_KEY } from '@/constants/localStorageKey';

export const getUserInfo = (): User | undefined => {
  const dataCache = localStorage.getItem(LOCAL_STORAGE_KEY.USER);
  if (dataCache) {
    return JSON.parse(dataCache) as User;
  }
  return undefined;
};

export const setUserInfo = (user: User) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(user));
};

export const getToken = (): string | undefined => {
  const dataCache = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
  if (dataCache) {
    return dataCache;
  }
  return undefined;
};

export const setToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
};

export const clearToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
};

export const clearAll = () => {
  localStorage.clear();
};
