'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { AllFormsResponse, UseAllFormsProps } from '@/types';
import useAxios from '@/lib/api/axios-client';
import { useCallback, useEffect } from 'react';

export const useAllForms = <T = unknown>({
  url,
  page = '1',
  search,
  filters,
  prefetchNextPages,
}: UseAllFormsProps) => {
  const { axios, status } = useAxios();
  const queryClient = useQueryClient();

  const queryKey = useCallback(
    (page: string) => QUERY_KEYS.allForms({ page, search, filters, url }),
    [search, filters, url],
  );

  const getForms = useCallback(
    async (page: string) => {
      const res = await axios<AllFormsResponse<T>>({
        url,
        method: 'GET',
        params: {
          page,
          search,
          ...filters,
        },
      });
      return res.data;
    },
    [axios, search, filters, url],
  );

  const query = useQuery({
    queryKey: queryKey(page),
    queryFn: () => getForms(page),
    enabled: status === 'authenticated',
  });

  // Prefetch next page when current query is successful
  useEffect(() => {
    if (query.isSuccess && status === 'authenticated' && prefetchNextPages) {
      const nextPage = String(Number(page) + 1);
      const pageAfterNext = String(Number(page) + 2);

      queryClient.prefetchQuery({
        queryKey: queryKey(nextPage),
        queryFn: () => getForms(nextPage),
      });

      queryClient.prefetchQuery({
        queryKey: queryKey(pageAfterNext),
        queryFn: () => getForms(pageAfterNext),
      });
    }
  }, [
    query.isSuccess,
    page,
    queryClient,
    status,
    queryKey,
    getForms,
    prefetchNextPages,
  ]);

  return query;
};
