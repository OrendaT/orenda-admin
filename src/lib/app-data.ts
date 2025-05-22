import { LuCircleCheckBig, LuTimer } from 'react-icons/lu';

export const INTAKE_FORM_URL = 'https://orenda-intake.vercel.app/';

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

export const announcements = [
  {
    id: 1,
    message:
      'Updated documentation guidelines now live. Please review under ‘Clinical Resources’ > ‘Compliance’',
  },
  {
    id: 2,
    message:
      "Don't forget to complete your Practice Orientation Checklist – 2 items remaining!",
  },
  {
    id: 3,
    message:
      'Explore curated readings and clinical cases under ‘Resources’ to honor Mental Health Awareness Month.',
  },
  {
    id: 4,
    message:
      'You can now save clinical templates directly to your personal folder. See ‘Tools’ > ‘Templates’',
  },
  {
    id: 5,
    message:
      'Quarterly HIPAA training due by May 15. Find it in your Training tab.',
  },
  {
    id: 6,
    message:
      'We’ve added a quick-reference guide for DSM-5-TR diagnostic changes.',
  },
  {
    id: 7,
    message:
      'Updated documentation guidelines now live. Please review under ‘Clinical Resources’ > ‘Compliance’',
  },
];

export const resources = [
  {
    id: 'brick-mortar-office-info',
    title: 'Brick & Mortar Office Info',
  },
  {
    id: 'meet-the-team',
    title: 'Meet the Team',
  },
  {
    id: 'partnerships-referrals',
    title: 'Partnerships-Referrals',
  },
  {
    id: 'policies-forms',
    title: 'Policies & Forms',
  },
  {
    id: 'provider-templates',
    title: 'Provider Templates',
  },
  {
    id: 'student-folder',
    title: 'Student Folder',
  },
  {
    id: 'therapy-worksheets',
    title: 'Therapy Worksheets',
  },
  {
    id: 'town-hall-recordings',
    title: 'Town Hall Recordings',
  },
  {
    id: 'training-resources',
    title: 'Training Resources',
  },
];
