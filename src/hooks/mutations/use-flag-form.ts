import useAxios from '@/lib/api/axios-client';
import { CREDIT_CARD_FORMS_EP, INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/query-keys';
import useFormsParams from '../use-forms-params';
import useFormType from '../use-form-type';

const useFlagForm = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();

  const { page, search, flag, from, to } = useFormsParams();

  const { type, url } = useFormType();

  const { FLAG } = type === 'intake' ? INTAKE_FORMS_EP : CREDIT_CARD_FORMS_EP;

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
