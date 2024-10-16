import axios from 'axios';
import { getToken } from '../services/authService';
import appStore from '../store/app';
import router from '../router';
// import { handleServerError } from '@/utils/validateServerError';
import {
  CODE_200,
  CODE_400,
  CODE_401,
  CODE_403,
  CODE_500,
  TIME_REQUEST_TIMEOUT,
  ERROR_PAGE_PATH,
} from '../constants';
import { setNotifyError, setNotifySuccess } from '../services/notiService';
import { upperCase } from 'lodash';
// import userStore from '@/store/user';

let reqConfig;

const service = axios.create({
  // baseURL: process.env.API_BASE,
  timeout: TIME_REQUEST_TIMEOUT,
  responseEncoding: "utf8",
  headers: {
    "mnp-web-client-version": "1.1.1",
    "accept": "application/json"
  },
});
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = 'Bearer ' + getToken();
    }
    if (config.isDownLoadFile) {
      config.responseType = 'blob';
    }
    if (config.isUploadFile) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    reqConfig = config;
    if (config.isLoading) {
      appStore().setLoading(true);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  async (response) => {
    if (reqConfig.isLoading) {
      setTimeout(() => {
        appStore().setLoading(false);
      }, 500);
    }
    if (reqConfig.isDownLoadFile) {
      return response;
    }
    const res = response.data;
    const statusCode = res.status;
    switch (statusCode) {
      case 200:
        break;
      case 422:
        appStore().setErrorCode(CODE_200);
        break;
      case 400:
        appStore().setErrorCode(CODE_400);
        break;
      case 403:
        appStore().setErrorCode(CODE_403);
        break;
      case 401:
        appStore().setErrorCode(CODE_401);
        break;
      case 500:
        appStore().setErrorCode(CODE_500);
        break;
    }
    if (statusCode === 200 || statusCode === 422 || statusCode === 401) {
      if (reqConfig.isAlertMessage && statusCode === 200) {
        setNotifySuccess(res.message);
      } else if (reqConfig.isAlertMessage && statusCode === 401) {
        setNotifyError(res.message);
      }
      return res;
    } else {
      if (reqConfig.isAlertMessage) {
        setNotifyError(res.message);
      }
      if (
        statusCode.toString().startsWith('5') &&
        upperCase(reqConfig.method) === 'GET'
      ) {
        appStore().setErrorCode(CODE_500);
        await router.push({ path: ERROR_PAGE_PATH });
      }
      return Promise.reject(new Error(res.message || 'error'));
    }
  },
  async (error) => {
    if (reqConfig.isAlertMessage) {
      setNotifyError(error.message);
    }
    appStore().setErrorCode(CODE_500);
    await router.push({ path: ERROR_PAGE_PATH });
    return Promise.reject(error);
  }
);
export function axiosRequest({
  url,
  method,
  data,
  isLoading,
  isAlertMessage = true,
  isUploadFile,
  isDownLoadFile,
  timeout,
}) {
  return service({
    url,
    method: method ?? 'get',
    data: data ?? {},
    isLoading: isLoading ?? false,
    isAlertMessage,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    timeout: timeout ?? 15000,
  });
}

export default axiosRequest;
