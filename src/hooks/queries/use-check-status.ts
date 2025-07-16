import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import useAxios from '@/lib/api/axios-client';
import { INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import { TaskStatusResponse } from '@/types';
import { AxiosError } from 'axios';

const useCheckStatus = (task_id?: string) => {
  const { axios, status } = useAxios();

  return useQuery({
    queryKey: QUERY_KEYS.downloadTask(task_id),
    queryFn: async () => {
      const res = await axios<TaskStatusResponse>({
        method: 'GET',
        url: INTAKE_FORMS_EP.CHECK_TASK(task_id),
      });

      return res.data;
    },
    retry: (_, error: AxiosError<TaskStatusResponse>) => {
      console.error(error);

      // retry if not ready
      if (!error.response?.data?.ready) return true;

      return false;
    },
    retryDelay: 2000,
    enabled: status === 'authenticated' && Boolean(task_id),
    refetchOnWindowFocus: false,
  });
};
export default useCheckStatus;
