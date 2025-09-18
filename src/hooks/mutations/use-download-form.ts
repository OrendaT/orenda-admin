import useAxios from '@/lib/api/axios-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/query-keys';
import useFormsParams from '../use-forms-params';
import useFormType from '../use-form-type';
import useFormEP from '../use-form-ep';

const useDownloadForm = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();

  const { page, search, flag, from, to } = useFormsParams();
  const { url } = useFormType();

  const { DOWNLOAD_FORM } = useFormEP();

  return useMutation({
    mutationFn: async (id: string) =>
      await axios<Blob>({
        url: DOWNLOAD_FORM(id),
        responseType: 'blob',
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
  });
};
export default useDownloadForm;
