import { BILLING_FORMS_EP, INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import { FormType, URLFormType } from '@/types';
import { usePathname } from 'next/navigation';

const useFormType = () => {
  const pathname = usePathname();
  let url = INTAKE_FORMS_EP.ALL_FORMS;
  let type: FormType = 'intake';
  let url_type: URLFormType = 'intake';

  switch (pathname) {
    case '/credit-card-forms':
      type = 'billing';
      url_type = 'credit-card';
      url = BILLING_FORMS_EP.ALL_FORMS;
      break;

    // case '/provider-onboarding-forms':
    //   type = 'credentialing';
    //   url_type = 'intake';
    //   url = INTAKE_FORMS_EP.ALL_FORMS;
    //   break;

    default:
      break;
  }

  return { type, url_type, url };
};
export default useFormType;
