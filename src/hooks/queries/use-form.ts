import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import useAxios from '@/lib/api/axios-client';
import { CREDIT_CARD_FORMS_EP, INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import useFormType from '../use-form-type';

const useForm = <T = unknown>(id: string) => {
  const { axios, status } = useAxios();
  const { type } = useFormType();

  const { FORM } = type === 'intake' ? INTAKE_FORMS_EP : CREDIT_CARD_FORMS_EP;

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
