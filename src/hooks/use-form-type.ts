import { BILLING_FORMS_EP, INTAKE_FORMS_EP } from '@/lib/api/endpoints';
import {
  BILLING_FORM_URL as cc_url,
  CREDENTIALING_FORM_URL as onboarding_url,
  INTAKE_FORM_URL as intake_url,
} from '@/lib/data';
import { ExportKey, FormType } from '@/types';
import { usePathname } from 'next/navigation';

const useFormType = () => {
  const pathname = usePathname();
  let url = INTAKE_FORMS_EP.ALL_FORMS;
  let formURL = intake_url;
  let type: FormType = 'intake';
  let export_key: ExportKey = 'patients';

  switch (pathname) {
    case '/credit-card-forms':
      type = 'billing';
      url = BILLING_FORMS_EP.ALL_FORMS;
      formURL = cc_url;
      export_key = 'credit_cards';
      break;

    case '/provider-onboarding-forms':
      type = 'credentialing';
      url = INTAKE_FORMS_EP.ALL_FORMS;
      formURL = onboarding_url;
      export_key = 'providers';

      break;

    default:
      break;
  }

  return { type, export_key, url, formURL };
};
export default useFormType;
