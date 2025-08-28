'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarListItem,
  SidebarMenu,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import Header from './header';
import { MdLogout, MdGroups } from 'react-icons/md';
import React, { useState } from 'react';
import type { SidebarMenuItem, Teams, UserRole } from '@/types';
import { logOut } from '@/app/actions/auth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { LuPanelLeftClose } from 'react-icons/lu';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { getSidebarMenu } from '@/lib/data';

export function AppSidebar({
  roles,
  teams,
}: {
  roles: UserRole[];
  teams: Teams;
}) {
  const [open, setOpen] = useState(false);

  const navMenu = getSidebarMenu({ roles, teams });


  const footerItem: SidebarMenuItem = {
    id: 'log-out',
    title: 'Log out',
    Icon: MdLogout({}),
    className:
      'text-red-500 hover:text-error-red hover:bg-red-50 active:bg-red-100 active:text-error-red',
    itemClassName: 'hover:bg-red-50 active:bg-red-100',
    onClick: () => {
      setOpen(true);
    },
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <HeaderComp />
      </SidebarHeader>
      <SidebarContent>
        {/* top menu list */}
        {navMenu.map(
          (item) =>
            !Boolean(item.hidden) && (
              <SidebarGroup key={item.id} className="mt-4">
                {item.title && (
                  <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                )}

                <SidebarMenu>
                  {item.items?.map(
                    (item) =>
                      !Boolean(item.hidden) && (
                        <SidebarListItem key={item.id} item={item} />
                      ),
                  )}
                </SidebarMenu>
              </SidebarGroup>
            ),
        )}

        {/* Team Management route */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarListItem
              item={{
                id: 'team-management',
                title: 'Team Management',
                href: '/team-management',
                Icon: <MdGroups />,
                className: 'hover:bg-gray-100',
                itemClassName: '',
              }}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter className="border-t border-[#ECECEC]">
        <SidebarMenu>
          <LogOutModal open={open} setOpen={setOpen}>
            <SidebarListItem item={footerItem} />
          </LogOutModal>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

const HeaderComp = () => {
  const { open, isMobile } = useSidebar();
  return (
    <div className="flex items-center justify-between">
      <Header
        className={cn(
          '!clamp-[ps,2,4] !clamp-[pt,4,1.62rem] static transition-all duration-300',
          !open && '!w-0 overflow-clip !ps-0',
        )}
      />

      {!isMobile && (
        <SidebarTrigger
          className="mt-4 focus-visible:ring-0"
          Icon={
            <LuPanelLeftClose
              className={cn(
                'size-6 text-neutral-700 transition-all duration-300',
                !open && 'rotate-180',
              )}
            />
          }
        />
      )}
    </div>
  );
};

const LogOutModal = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    setIsLoading(true);
    await logOut();
    setIsLoading(false);
    setOpen(false);
    toast.success('Log out successful');
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row justify-center *:w-fit *:py-1.5">
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <Button isLoading={isLoading} onClick={signOut} variant="destructive">
            Log out
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};