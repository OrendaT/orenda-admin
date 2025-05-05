import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/query-keys';

const useFlagForm = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) =>
      await axios({
        url: FORMS_EP.FLAG_PATIENT(id),
        method: 'PATCH',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.allForms] });
    },
  });
};
export default useFlagForm;
