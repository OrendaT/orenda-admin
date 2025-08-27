import { IntakeFormsIcon } from '@/assets/svgs';
import { SidebarMenuItem, Teams, UserRole } from '@/types';
import { HiOutlineCreditCard } from 'react-icons/hi2';
import { convertResourcesToMenu } from '../utils';
import { resources } from './resources';
import { LuUsers } from 'react-icons/lu';

export const getSidebarMenu = ({
  roles,
  teams,
}: {
  roles: UserRole[];
  teams: Teams;
}): SidebarMenuItem[] => {
  const _teams = Object.keys(teams) as (keyof Teams)[];

  return [
    convertResourcesToMenu(resources, !roles.includes('Provider')),
    {
      id: '1',
      title: '',
      hidden: roles.includes('Provider'),
      items: [
        {
          id: 'intake-forms',
          title: 'Intake Forms',
          Icon: IntakeFormsIcon({ className: 'mt-0.5' }),
          href: '/',
        },
        {
          id: 'credit-card-forms',
          title: 'Credit Card Forms',
          Icon: HiOutlineCreditCard({}),
          href: '/credit-card-forms',
          hidden: !(_teams.includes('Billing') || _teams.includes('Intake')),
        },
        {
          id: 'provider-onboarding-forms',
          title: 'Onboarding Forms',
          Icon: LuUsers({}),
          href: '/provider-onboarding-forms',
        },
      ],
    },
  ];
};
