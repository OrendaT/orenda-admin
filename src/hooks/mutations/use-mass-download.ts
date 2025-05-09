import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const useMassDownload = () => {
  const { axios } = useAxios();

  return useMutation({
    mutationFn: async (data: { from_date: string; to_date: string }) =>
      await axios<{ success: boolean; message: string }>({
        url: FORMS_EP.MASS_DOWNLOAD,
        method: 'POST',
        data,
      }),
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
export default useMassDownload;
