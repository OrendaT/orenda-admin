import 'server-only';

import { auth } from '@/auth';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import api from './axios';

const request = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const access_token = (await auth())?.access_token;

  if (access_token && !config.headers?.Authorization)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${access_token}`,
    };

  return api.request(config);
};

export default request;
