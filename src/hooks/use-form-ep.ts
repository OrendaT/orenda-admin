import { getEP } from '@/lib/api/endpoints';
import useFormType from './use-form-type';

// A simplified hook to get the EP needed
const useFormEP = () => {
  const { type } = useFormType();

  return getEP({ type });
};
export default useFormEP;
