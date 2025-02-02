import axios, { AxiosInstance, AxiosProgressEvent } from 'axios';
import { getCookie } from './getCookie';
import { delete_cookie } from './removeCookie';
import { setCookie } from './setCookie';
import { REFRESH_TOKEN } from './endpoints/login_endpoints';

export const BASE_URL = 'http://10.10.10.22:8090';
export const BASE_URL_SERVICES = 'http://10.10.10.22:8099';
const refreshAccessToken = async () => {
  try {
    const refreshToken = getCookie('refreshToken');
    const response = await postMethod(REFRESH_TOKEN, {
      refreshToken,
    });
    if (response.isSuccess) {
      const { accessToken, refreshKey, expireDate } = response.data;
      setCookie('accessToken', accessToken, expireDate);
      setCookie('refreshToken', refreshKey, expireDate);

      return accessToken;
    } else {
      delete_cookie('accessToken');
      delete_cookie('refreshToken');
      window.location.href = '/login';
      return null;
    }
  } catch (err) {
    console.error('Unable to refresh token', err);
    return null;
  }
};
// تابعی برای ایجاد یک Axios instance
const createAxiosInstance = (customHeaders?: object): AxiosInstance => {
  const accessToken = getCookie('accessToken');
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    ...customHeaders,
  };

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers,
  });

  // Interceptor برای بررسی کدهای وضعیت 401 و 403
  instance.interceptors.response.use((response) => {
    if (response.data.statusCode === 401 || response.data.statusCode === 403) {
      refreshAccessToken();
    }
    return response;
  });

  return instance;
};

// تابع عمومی برای مدیریت خطاها
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('Server error:', error.response.status);
      console.error('Error data:', error.response.data);
    } else if (error.request) {
      console.error('Network error:', error.request);
    }
  } else {
    console.error('Unexpected error:', error.message);
  }
};
// post متد
export const postMethod = async (
  endpoint: string,
  body: object | FormData,
  customHeaders?: object,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<any> => {
  const isFormData = body instanceof FormData;
  const headers = isFormData
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'application/json' };

  const axiosInstance = createAxiosInstance({
    headers: { ...headers, ...customHeaders },
  });

  try {
    const response = await axiosInstance.post(endpoint, body, {
      onUploadProgress,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// متد GET
export const getMethod = async (
  endpoint: string,
  customHeaders?: object
): Promise<any> => {
  const axiosInstance = createAxiosInstance(customHeaders);

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
