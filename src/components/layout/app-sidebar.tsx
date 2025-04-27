import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarListItem,
  SidebarMenu,
} from '@/components/ui/sidebar';
import Header from './header';
import { FormIcon, ProviderWallIcon } from '@/assets/svgs';
import { MdLogout } from 'react-icons/md';
import React from 'react';
import { MenuItem } from '@/types';

const topMenuItems: (MenuItem | false)[] = [
  true && {
    id: 'intake-forms',
    title: 'Intake Forms',
    Icon: FormIcon({ className: 'mt-0.5' }),
    href: '/intake-forms',
  },
  false && {
    id: 'provider-wall',
    title: 'Provider Wall',
    Icon: ProviderWallIcon({}),
    href: '/',
  },
];

const bottomMenuItems: MenuItem[] = [
  {
    id: 'log-out',
    title: 'Log out',
    Icon: MdLogout({}),
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Header className="!clamp-[ps,2,4] !clamp-[pt,4,1.62rem] static" />
      </SidebarHeader>
      <SidebarContent>
        {/* top menu list */}
        <SidebarGroup className="mt-20">
          <SidebarMenu>
            {topMenuItems.map(
              (item) => item && <SidebarListItem key={item.id} item={item} />,
            )}
          </SidebarMenu>
        </SidebarGroup>

        {/* bottom menu list */}
        <SidebarGroup className="mt-40 border-t border-[#ECECEC]">
          <SidebarMenu>
            {bottomMenuItems.map(
              (item) => item && <SidebarListItem key={item.id} item={item} />,
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
