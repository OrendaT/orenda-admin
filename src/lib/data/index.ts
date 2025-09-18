import { LuCircleCheckBig, LuTimer } from 'react-icons/lu';

export { getSidebarMenu } from './sidebar-menu';
export { resources } from './resources';
export { announcements } from './announcements';

export const INTAKE_FORM_URL = 'https://forms.orendapsych.com/intake';
export const BILLING_FORM_URL = 'https://forms.orendapsych.com/credit-card';
export const CREDENTIALING_FORM_URL =
  'https://forms.orendapsych.com/provider-onboarding';
export const ORENDA_LOGO =
  'https://mcusercontent.com/f49e77d8389e110b514988d07/images/bd4a6ffd-dce6-72c2-e379-2223ce4d0a6b.png';

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
