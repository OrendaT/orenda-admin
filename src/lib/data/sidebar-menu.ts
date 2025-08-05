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
          id: 'billing-forms',
          title: 'Billing Forms',
          Icon: HiOutlineCreditCard({}),
          href: '/billing-forms',
          hidden: !(_teams.includes('Billing') || _teams.includes('Intake')),
        },
        {
          id: 'credentialing',
          title: 'Credentialing Forms',
          Icon: LuUsers({}),
          href: '/credentialing-forms',
        },
      ],
    },
  ];
};
