import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useFormType from './use-form-type';

const useSendEmail = () => {
  const { type: form } = useFormType();
  return useMutation({
    mutationFn: async ({
      data,
      type,
    }: {
      data: {
        email: string;
        first_name?: string;
      };
      type: 'new-form' | 'reminder';
    }) => {
      const res = await axios.post(`/api/send-email/${form}`, {
        ...data,
        type,
      });

      return res.data;
    },
    onError: (error) => {
      console.error('Error sending reminder email:', error);
    },
  });
};

export default useSendEmail;
