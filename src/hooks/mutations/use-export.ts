import useAxios from '@/lib/api/axios-client';
import { INTAKE_FORMS_EP, CREDIT_CARD_FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../queries/query-keys';
import useFormsParams from '../use-forms-params';
import useFormType from '../use-form-type';

const useExport = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();
  const { type, url } = useFormType();

  const { page, search, flag, from, to } = useFormsParams();

  const { EXPORT } = type === 'intake' ? INTAKE_FORMS_EP : CREDIT_CARD_FORMS_EP;

  return useMutation({
    mutationFn: async (data: { patients: string[] }) =>
      await axios<{ success: boolean; message: string; task_id: string }>({
        url: EXPORT,
        method: 'POST',
        data,
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
