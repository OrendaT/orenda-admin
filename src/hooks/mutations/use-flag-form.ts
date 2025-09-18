import useAxios from '@/lib/api/axios-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/query-keys';
import useFormsParams from '../use-forms-params';
import useFormType from '../use-form-type';
import useFormEP from '../use-form-ep';

const useFlagForm = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();

  const { page, search, flag, from, to } = useFormsParams();

  const { url } = useFormType();

  const { FLAG } = useFormEP();

  return useMutation({
    mutationFn: async (id: string) =>
      await axios({
        url: FLAG(id),
        method: 'PATCH',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.allForms({
          page,
          search,
          filters: { flag, from, to },
          url,
        }),
      });
    },
  });
};
export default useFlagForm;
