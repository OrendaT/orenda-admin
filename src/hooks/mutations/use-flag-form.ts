import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/query-keys';
import { useSearchParams } from 'next/navigation';

const useFlagForm = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();
  const params = useSearchParams();

  const {
    page = '1',
    search,
    flag,
    from,
    to,
  } = Object.fromEntries(params.entries());

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
