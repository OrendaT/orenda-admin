import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { FORMS_EP } from '@/lib/api/endpoints';
import { AllFormsResponse } from '@/types';
import useAxios from '@/lib/api/axios-client';

export const useAllForms = (page?: string | number, search?: string) => {
  const { axios, status } = useAxios();

  return useQuery({
    queryKey: [QUERY_KEYS.allForms, page, search],
    queryFn: async () => {
      const res = await axios<AllFormsResponse>({
        url: FORMS_EP.ALL_PATIENTS,
        method: 'GET',
        params: {
          per_page: 6,
          page,
          search,
        
        },
      });
      return res.data;
    },
    enabled: status === 'authenticated'
  });
};
