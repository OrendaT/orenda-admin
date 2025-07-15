import useAxios from '@/lib/api/axios-client';
import { INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/query-keys';
import useIntakeFormParams from '../use-forms-params';

const useDownloadForm = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();

  const { page, search, flag, from, to } = useIntakeFormParams();

  return useMutation({
    mutationFn: async (id: string) =>
      await axios<Blob>({
        url: INTAKE_FORMS_EP.DOWNLOAD_FORM(id),
        responseType: 'blob',
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
export default useDownloadForm;
