import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { FormData } from '@/types';

const useForm = (id: string) => {
  const { axios, status } = useAxios();

  return useQuery({
    queryKey: QUERY_KEYS.form(id),
    queryFn: async () => {
      const res = await axios<{ data: FormData }>({
        method: 'GET',
        url: FORMS_EP.PATIENT(id),
      });

      return res.data.data;
    },
    enabled: status === 'authenticated',
  });
};
export default useForm;
