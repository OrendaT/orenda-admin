'use client';

import { useSession } from 'next-auth/react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import api from './axios';

const useAxios = () => {
  const { data, status, update } = useSession();

  if (status === 'unauthenticated') update();

  const axios = async <T = unknown>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    const access_token = data?.access_token;

    if (access_token && !config.headers?.Authorization) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }

    return api.request<T>(config);
  };

  return { axios, status, update };
};

export default useAxios;
