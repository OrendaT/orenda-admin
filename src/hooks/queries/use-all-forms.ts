'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { FORMS_EP } from '@/lib/api/endpoints';
import { AllFormsResponse, UseAllFormsProps } from '@/types';
import useAxios from '@/lib/api/axios-client';

export const useAllForms = ({
  page = '1',
  search,
  filters,
}: UseAllFormsProps) => {
  const { axios, status } = useAxios();

  return useQuery({
    queryKey: QUERY_KEYS.allForms({ page, search, filters }),
    queryFn: async () => {
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
    },
    enabled: status === 'authenticated',
  });
};
