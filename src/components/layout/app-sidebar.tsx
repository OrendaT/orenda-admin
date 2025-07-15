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
import { IntakeFormsIcon } from '@/assets/svgs';
import { MdLogout } from 'react-icons/md';
import { MdAdminPanelSettings } from "react-icons/md";

import React, { useState } from 'react';
import type { SidebarMenuItem, UserRole } from '@/types';
import { logOut } from '@/app/actions/auth';
import { toast } from 'sonner';
import { cn, convertResourcesToMenu } from '@/lib/utils';
import { LuPanelLeftClose } from 'react-icons/lu';
import { HiOutlineCreditCard } from 'react-icons/hi2';
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
import { resources } from '@/lib/data/resources';

export function AppSidebar({ role }: { role: UserRole }) {
  const [open, setOpen] = useState(false);

  const navMenu: (SidebarMenuItem | undefined)[] = [
    role === 'Provider' ? convertResourcesToMenu(resources) : undefined,
    role === 'Admin' || role === 'Manager'
      ? {
        id: '1',
        title: '',
        items: [
          {
            id: 'intake-forms',
            title: 'Intake Forms',
            Icon: IntakeFormsIcon({ className: 'mt-0.5' }),
            href: '/',
          },
        ],
      }
      : undefined,
    role === 'Admin'
      ? {
        id: '2',
        title: '',
        items: [
          {
            id: 'admins',
            title: 'Admins Permissions',
            Icon: MdAdminPanelSettings({ className: 'mt-0.5' }),
            href: 'admins-permissions',
          },
        ],
      }
      : undefined,
  ];


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
            item && (
              <SidebarGroup key={item.id} className="mt-4">
                {item.title && (
                  <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                )}

                <SidebarMenu>
                  {item.items?.map(
                    (item) =>
                      item && <SidebarListItem key={item.id} item={item} />,
                  )}
                </SidebarMenu>
              </SidebarGroup>
            ),
        )}
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