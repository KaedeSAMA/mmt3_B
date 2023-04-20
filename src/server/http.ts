import Request from './request';
import { BASE_URL, TIME_OUT } from './request/config';
const _axios = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestInterceptor: (config) => {
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch(error) {
      return error;
    }
  }
});

export { _axios };
