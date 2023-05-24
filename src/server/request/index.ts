import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { RequestConfig, RequestInterceptors } from './type';
import { ElLoading } from 'element-plus';
const DEFAULT_LOADING = true;
import showErrorInfo from './error';
class Request {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors<AxiosResponse>;
  showLoading: boolean;
  loading?: any;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // 将传入的属性进行实例化 -> 请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 通用的拦截器
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            background: 'rgba(0, 0, 0, 0.1)',
            text: '请求中...'
          });
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        const { data = {}, status } = res || {};
        if (status === 200) {
          return data;
        }
        showErrorInfo(res);
        return Promise.reject(data);
      },
      (err: AxiosError) => {
        this.loading?.close();
        if (err.response && err.response.status) {
          showErrorInfo({
            code: err.response.status,
            message: err.response.statusText
          });
        }
      }
    );
  }
  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config as any);
      }
      this.instance
        .request<any, T>(config as any)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor<T>(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
  get<T, D>(url: string, params?: D, config = {}): Promise<T> {
    return this.request<T>({
      url,
      params,
      method: 'GET',
      ...config
    });
  }

  post<T, D>(url: string, data?: D, config = {}): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST',
      url,
      data
    });
  }
}

export default Request;
