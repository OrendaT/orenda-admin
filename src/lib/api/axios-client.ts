'use client';

import { useSession } from 'next-auth/react';
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

  // Setup interceptors
  useEffect(() => {
    // Request interceptor to add auth token
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const access_token = session?.access_token;

        if (access_token && !config.headers?.Authorization) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor to handle 401s
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshingRef.current) {
            // Token refresh is already in progress, queue this request
            return (
              new Promise((resolve, reject) => {
                failedQueueRef.current.push({ resolve, reject });
              })
                .then((newToken) => {
                  // This runs when resolve(newToken) is called
                  // Retry with updated token
                  if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                  }
                  return api(originalRequest);
                })
                // This runs if/when reject(err) is called
                .catch((err) => {
                  return Promise.reject(err);
                })
            );
          }

          originalRequest._retry = true;
          isRefreshingRef.current = true;

          try {
            // Get updated session
            const updatedSession = await update();
            const newToken = updatedSession?.access_token;

            if (newToken) {
              // Process queued requests with new token
              failedQueueRef.current.forEach(({ resolve }) => {
                resolve(newToken);
              });

              // Update original request with new token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;

              // Retry original request
              return api(originalRequest);
            } else {
              // No new token available
              const error = new Error('Unable to refresh token from useAxios');

              // Reject all queued requests
              failedQueueRef.current.forEach(({ reject }) => {
                reject(error);
              });

              throw error;
            }
          } catch (refreshError) {
            // Token refresh failed, reject all queued requests
            failedQueueRef.current.forEach(({ reject }) => {
              reject(refreshError);
            });

            return Promise.reject(refreshError);
          } finally {
            isRefreshingRef.current = false;
            failedQueueRef.current = [];
          }
        }

        return Promise.reject(error);
      },
    );

    // Cleanup interceptors on effect cleanup
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [session?.access_token, update]);

  return { axios: api, status, update };
};

export default useAxios;
