import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../queries/query-keys';

const useMassDownload = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();

  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') ?? '1';
  const search = params.get('search') ?? undefined;
  const flag = params.get('flag') ?? undefined;
  const from = params.get('from') ?? undefined;
  const to = params.get('to') ?? undefined;

  return useMutation({
    mutationFn: async (data: { from_date: string; to_date: string }) =>
      await axios<{
        success: boolean;
        message: string;
        data: string[];
        task_id: string;
      }>({
        url: FORMS_EP.MASS_DOWNLOAD,
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
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
export default useMassDownload;
