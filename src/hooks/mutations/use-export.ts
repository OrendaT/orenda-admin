import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../queries/query-keys';
import { useSearchParams } from 'next/navigation';

const useExport = () => {
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
