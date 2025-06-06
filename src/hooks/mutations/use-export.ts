import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../queries/query-keys';

const useExport = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();

  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') ?? '1';
  const search = params.get('search') ?? undefined;
  const flag = params.get('flag') ?? undefined;
  const from = params.get('from') ?? undefined;
  const to = params.get('to') ?? undefined;

  return useMutation({
    mutationFn: async (data: { patients: string[] }) =>
      await axios<{ success: boolean; message: string; task_id: string }>({
        url: FORMS_EP.EXPORT,
        method: 'POST',
        data,
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
    onError: (error: AxiosError<{ message: string }>, { patients }) => {
      toast.error(
        patients.length
          ? error.response?.data?.message?.split(':')?.[0] ||
              'Something went wrong'
          : 'No forms selected',
      );
    },
  });
};
export default useExport;
