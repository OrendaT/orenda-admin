import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useExport = () => {
  const { axios } = useAxios();

  return useMutation({
    mutationFn: async (data: { patients: string[] }) =>
      await axios<{ success: boolean; message: string; task_id: string }>({
        url: FORMS_EP.EXPORT,
        method: 'POST',
        data,
      }),
    onError: (error: AxiosError<{ message: string }>, { patients }) => {
      toast.error(
        patients.length
          ? error.response?.data?.message?.split(':')?.[0] || 'Something went wrong'
          : 'No forms selected',
      );
    },
  });
};
export default useExport;
