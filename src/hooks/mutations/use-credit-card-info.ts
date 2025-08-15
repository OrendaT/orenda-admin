import useAxios from '@/lib/api/axios-client';
import { CreditCardInfo } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import useFormEP from '../use-form-ep';

const useCreditCardInfo = () => {
  const { axios } = useAxios();

  const { CREDIT_CARD } = useFormEP();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { password: string };
    }) =>
      await axios<{ success: boolean; message: string; data: CreditCardInfo }>({
        url: CREDIT_CARD(id),
        method: 'POST',
        data,
      }),
    onError: (error: AxiosError<{ message: string; success: boolean }>) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
  });
};
export default useCreditCardInfo;
