import useAxios from '@/lib/api/axios-client';
import { INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../queries/query-keys';
import useIntakeFormParams from '../use-forms-params';

const useMassDownload = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();

  const { page, search, flag, from, to } = useIntakeFormParams();

  return useMutation({
    mutationFn: async (data: { from_date: string; to_date: string }) =>
      await axios<{
        success: boolean;
        message: string;
        data: string[];
        task_id: string;
      }>({
        url: INTAKE_FORMS_EP.MASS_DOWNLOAD,
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
