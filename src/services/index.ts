import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '@/store';
import Router from '@/router';
import { getToken, clearAll } from '@/store/localStorage';

// const API_URL = process.env.API_URL || "/api";
// const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

const instance = axios.create({
  // baseURL: API_URL,
  method: 'get',
  timeout: 60000,
  responseEncoding: 'utf8',
  headers: { 'client-version': '1.0.0' },
});
// instance.defaults.withCredentials = true
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const token: string | null = GetToken();
    const headers = config.headers;
    if (headers) {
      headers['client-version'] = 'v1.0.0';
      headers['cache-control'] = 'no-cache, no-store, no-transform';
      const token: string | null = getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
    // store.dispatch("loading/set", true);
    return config;
  },
  (error) => {
    // store.dispatch("loading/set", false);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // store.dispatch("loading/set", false);
    return response;
  },
  (error) => {
    if (error.response?.status == 401) {
      // off err message
      store.dispatch('notification/updateAllow', false);

      clearAll();
      Router.replace({
        path: '/login',
        query: {
          redirect: Router.currentRoute.value.path,
        },
      });
    } else {
      // store.dispatch("loading/set", false);
      return Promise.reject(error);
    }
  }
);

export const Get = async (url: string, params = {}) => {
  const res = await instance.get(url, { params });
  return res.data;
};

export const Post = async (url: string, body: any = {}, option?: AxiosRequestConfig) => {
  const res = await instance.post(url, body, option);
  return res.data;
};

export const Put = async (url: string, body: any = {}, option?: AxiosRequestConfig) => {
  const res = await instance.put(url, body, option);
  return res.data;
};

export const Patch = async (url: string, body: any = {}, option?: AxiosRequestConfig) => {
  const res = await instance.patch(url, body, option);
  return res.data;
};

export const Delete = async (url: string, option?: AxiosRequestConfig) => {
  const res = await instance.delete(url, option);
  return res.data;
};
