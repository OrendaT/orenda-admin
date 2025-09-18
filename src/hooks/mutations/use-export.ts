import useAxios from '@/lib/api/axios-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../queries/query-keys';
import useFormsParams from '../use-forms-params';
import useFormType from '../use-form-type';
import useFormEP from '../use-form-ep';

const useExport = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();
  const { url } = useFormType();

  const { page, search, flag, from, to } = useFormsParams();

  const { EXPORT } = useFormEP();

  return useMutation({
    mutationFn: async (data: Record<string, string[]>) =>
      await axios<{ success: boolean; message: string; task_id: string }>({
        url: EXPORT,
        method: 'POST',
        data,
      }),
    onSuccess: () => {
      const queryKey = QUERY_KEYS.allForms({
        page,
        search,
        filters: { flag, from, to },
        url,
      });
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: (error: AxiosError<{ message: string }>, data) => {
      const key = Object.keys(data)[0];
      const forms = data[key];
      if (forms)
        toast.error(
          forms.length
            ? error.response?.data?.message?.split(':')?.[0] ||
                'Something went wrong'
            : 'No forms selected',
        );
    },
  });
};
export default useExport;
