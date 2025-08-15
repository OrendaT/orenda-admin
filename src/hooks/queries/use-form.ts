import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import useAxios from '@/lib/api/axios-client';
import useFormEP from '../use-form-ep';

const useForm = <T = unknown>(id: string) => {
  const { axios, status } = useAxios();

  const { FORM } = useFormEP();

  return useQuery({
    queryKey: QUERY_KEYS.form(id),
    queryFn: async () => {
      const res = await axios<{ data: T }>({
        method: 'GET',
        url: FORM(id),
      });

      return res.data.data;
    },
    enabled: status === 'authenticated',
  });
};
export default useForm;
