import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import useAxios from '@/lib/api/axios-client';
import { INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import { IntakeFormData } from '@/types';

const useForm = (id: string) => {
  const { axios, status } = useAxios();

  return useQuery({
    queryKey: QUERY_KEYS.form(id),
    queryFn: async () => {
      const res = await axios<{ data: IntakeFormData }>({
        method: 'GET',
        url: INTAKE_FORMS_EP.FORM(id),
      });

      return res.data.data;
    },
    enabled: status === 'authenticated',
  });
};
export default useForm;
