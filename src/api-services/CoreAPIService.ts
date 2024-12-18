import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { checkAccessToken } from '@/utils';

class CoreAPIService {
  private axiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = Axios.create({
      baseURL,
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
          const accessToken = checkAccessToken();
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );
  }

  private responseData = (response: AxiosResponse) => response.data;

  private handleError = (error: AxiosError) => {
    const status = error.response && error.response.status;
    if (status === 401 || status === 403) {
    }
    throw error;
    if (status === 401 || status === 403) {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
    throw error;
  };

  async post<T>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.axiosInstance
      .post(url, data, config)
      .then(this.responseData)
      .catch(this.handleError);
  }

  async get<T>(url: string, params: Record<string, any> = {}): Promise<T> {
    return this.axiosInstance
      .get(url, { params })
      .then(this.responseData)
      .catch(this.handleError);
  }

  async put<T>(url: string, data: Record<string, any> = {}): Promise<T> {
    return this.axiosInstance
      .put(url, data)
      .then(this.responseData)
      .catch(this.handleError);
  }

  async patch<T>(url: string, data: Record<string, any> = {}): Promise<T> {
    return this.axiosInstance
      .patch(url, data)
      .then(this.responseData)
      .catch(this.handleError);
  }

  async delete<T>(url: string, data: Record<string, any> = {}): Promise<T> {
    return this.axiosInstance
      .delete(url, { data })
      .then(this.responseData)
      .catch(this.handleError);
  }
}

export default CoreAPIService;
