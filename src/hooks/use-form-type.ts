import { CREDIT_CARD_FORMS_EP, INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import { usePathname } from 'next/navigation';

const useFormType = () => {
  const pathname = usePathname();
  let url = INTAKE_FORMS_EP.ALL_FORMS;
  let type: 'intake' | 'credit-card' = 'intake';

  switch (pathname) {
    case '/credit-card-forms':
      type = 'credit-card';
      url = CREDIT_CARD_FORMS_EP.ALL_FORMS;
      break;
    default:
      break;
  }

  return { type, url };
};
export default useFormType;
