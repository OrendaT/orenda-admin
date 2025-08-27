// lib/useAxios.ts
'use client';

import { useSession, getSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import api from './axios';

const useAxios = () => {
  const { data: session, status, update } = useSession();
  const isRefreshingRef = useRef(false);
  const failedQueueRef = useRef<
    Array<{
      resolve: (newToken: string) => void;
      reject: (error: unknown) => void;
    }>
  >([]);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const access_token = session?.access_token;
        if (access_token && !config.headers?.Authorization) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshingRef.current) {
            return new Promise((resolve, reject) => {
              failedQueueRef.current.push({ resolve, reject });
            })
              .then((newToken) => {
                if (newToken) {
                  originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }
                return api(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshingRef.current = true;

          try {
            const refreshedSession = await getSession(); // ensures latest token
            const newToken = refreshedSession?.access_token;

            if (newToken) {
              failedQueueRef.current.forEach(({ resolve }) => resolve(newToken));
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
            } else {
              const error = new Error('Unable to refresh token from useAxios');
              failedQueueRef.current.forEach(({ reject }) => reject(error));
              throw error;
            }
          } catch (refreshError) {
            failedQueueRef.current.forEach(({ reject }) => reject(refreshError));
            return Promise.reject(refreshError);
          } finally {
            isRefreshingRef.current = false;
            failedQueueRef.current = [];
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [session?.access_token, update]);

  return { axios: api, status, update };
};

export default useAxios;