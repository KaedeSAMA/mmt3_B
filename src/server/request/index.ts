import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { RequestConfig, RequestInterceptors } from './type';
import { ElLoading, ElMessage } from 'element-plus';
const DEFAULT_LOADING = true;
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
            background: 'red'
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    // 响应拦截器
    this.instance.interceptors.response.use((res) => {
      this.loading?.close();
      return res.data;
    });
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
