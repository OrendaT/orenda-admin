import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import useAxios from '@/lib/api/axios-client';
import { FORMS_EP } from '@/lib/api/endpoints';
import { TaskStatusResponse } from '@/types';

const useCheckStatus = (task_id?: string) => {
  const { axios, status } = useAxios();

  return useQuery({
    queryKey: QUERY_KEYS.downloadTask(task_id),
    queryFn: async () => {
      const res = await axios<TaskStatusResponse>({
        method: 'GET',
        url: FORMS_EP.CHECK_TASK(task_id),
      });

      return res.data;
    },
    retry: (_, error?: { response: { data: { ready: boolean } } }) => {
      console.log(error);
      if (error) {
        // check response before retrying
        if (!error.response.data.ready) {
          return true;
        } else {
          return false;
        }
      }

      return true; // if no error just retry
    },
    retryDelay: 3000,
    enabled: status === 'authenticated' && !!task_id,
  });
};
export default useCheckStatus;
