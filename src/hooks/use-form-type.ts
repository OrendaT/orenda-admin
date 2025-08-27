import { BILLING_FORMS_EP, INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import { ExportKey, FormType } from '@/types';
import { usePathname } from 'next/navigation';

const useFormType = () => {
  const pathname = usePathname();
  let url = INTAKE_FORMS_EP.ALL_FORMS;
  let type: FormType = 'intake';
  let export_key: ExportKey = 'patients';

  switch (pathname) {
    case '/credit-card-forms':
      type = 'billing';
      url = BILLING_FORMS_EP.ALL_FORMS;
      export_key = 'credit_cards';
      break;

    case '/provider-onboarding-forms':
      type = 'credentialing';
      url = INTAKE_FORMS_EP.ALL_FORMS;
      export_key = 'providers';

      break;

    default:
      break;
  }

  return { type, export_key, url };
};
export default useFormType;
