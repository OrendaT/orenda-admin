import { LuCircleCheckBig, LuTimer } from 'react-icons/lu';

export const INTAKE_FORM_URL = 'https://forms.orendapsych.com/intake';
export const CREDIT_CARD_FORM_URL = 'https://forms.orendapsych.com/credit-card';

//  INTAKE FORM FILTERS DATA
export const initialFilters = {
  status: undefined,
  flag: undefined,
  from: undefined,
  to: undefined,
};

export const statusFilters: {
  id: string;
  label: string;
  value: 'pending' | 'submitted';
  Icon: React.ComponentType;
}[] = [
  {
    id: 'pending',
    label: 'Pending',
    value: 'pending',
    Icon: LuTimer,
  },
  {
    id: 'submitted',
    label: 'Submitted',
    value: 'submitted',
    Icon: LuCircleCheckBig,
  },
];
