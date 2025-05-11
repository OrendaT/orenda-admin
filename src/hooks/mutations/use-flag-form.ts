import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/query-keys';

const useFlagForm = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();

  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') ?? '1';
  const search = params.get('search') ?? undefined;
  const flag = params.get('flag') ?? undefined;
  const from = params.get('from') ?? undefined;
  const to = params.get('to') ?? undefined;

  return useMutation({
    mutationFn: async (id: string) =>
      await axios({
        url: FORMS_EP.FLAG(id),
        method: 'PATCH',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.allForms({
          page,
          search,
          filters: { flag, from, to },
        }),
      });
    },
  });
};
export default useFlagForm;
