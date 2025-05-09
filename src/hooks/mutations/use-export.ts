import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const useExport = () => {
  const { axios } = useAxios();

  return useMutation({
    mutationFn: async (data: { patients: string[] }) =>
      await axios<{ success: boolean; message: string }>({
        url: FORMS_EP.EXPORT,
        method: 'POST',
        data,
      }),
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
export default useExport;
