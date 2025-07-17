import useAxios from '@/lib/api/axios-client';
import { INTAKE_FORMS_EP, CREDIT_CARD_FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { QUERY_KEYS } from '../queries/query-keys';
import useFormsParams from '../use-forms-params';
import useFormType from '../use-form-type';

const useMassDownload = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();
  const { type, url } = useFormType();

  const { page, search, flag, from, to } = useFormsParams();

  const { MASS_DOWNLOAD } =
    type === 'intake' ? INTAKE_FORMS_EP : CREDIT_CARD_FORMS_EP;

  return useMutation({
    mutationFn: async (data: { from_date: string; to_date: string }) =>
      await axios<{
        success: boolean;
        message: string;
        data: string[];
        task_id: string;
      }>({
        url: MASS_DOWNLOAD,
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
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
export default useMassDownload;
