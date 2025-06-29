'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { FORMS_EP } from '@/lib/api/endpoints';
import { AllFormsResponse, UseAllFormsProps } from '@/types';
import useAxios from '@/lib/api/axios-client';
import { useEffect } from 'react';

export const useAllForms = ({
  page = '1',
  search,
  filters,
}: UseAllFormsProps) => {
  const { axios, status } = useAxios();
  const queryClient = useQueryClient();

  const queryKey = (page: string) =>
    QUERY_KEYS.allForms({ page, search, filters });

  const getForms = async (page: string) => {
    const res = await axios<AllFormsResponse>({
      url: FORMS_EP.ALL_PATIENTS,
      method: 'GET',
      params: {
        page,
        search,
        ...filters,
      },
    });
    return res.data;
  };

  const query = useQuery({
    queryKey: queryKey(page),
    queryFn: () => getForms(page),
    enabled: status === 'authenticated',
  });

  // Prefetch next page when current query is successful
  useEffect(() => {
    if (query.isSuccess && status === 'authenticated') {
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
  }, [query.isSuccess, page, queryClient, status, getForms, queryKey]);

  return query;
};
