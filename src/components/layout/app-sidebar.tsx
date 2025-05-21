'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarListItem,
  SidebarMenu,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import Header from './header';
import { FormIcon, ProviderWallIcon } from '@/assets/svgs';
import { MdLogout } from 'react-icons/md';
import React, { useState } from 'react';
import { MenuItem } from '@/types';
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

export function AppSidebar({ isProvider }: { isProvider: boolean }) {
  const [open, setOpen] = useState(false);

  const topMenuItems: (MenuItem | false)[] = [
    !isProvider && {
      id: 'intake-forms',
      title: 'Intake Forms',
      Icon: FormIcon({ className: 'mt-0.5' }),
      href: '/',
    },
    isProvider && {
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
      className:
        'text-red-500 hover:text-error-red hover:bg-red-50 active:bg-red-100 active:text-error-red',
      itemClassName: 'hover:bg-red-50 active:bg-red-100',
      onClick: () => {
        setOpen(true);
      },
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <HeaderComp />
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
            {bottomMenuItems.map((item) =>
              item && item.id === 'log-out' ? (
                <LogOutModal key={item.id} open={open} setOpen={setOpen}>
                  <SidebarListItem item={item} />
                </LogOutModal>
              ) : (
                <SidebarListItem key={item.id} item={item} />
              ),
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
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
        <AlertDialogFooter className="*:w-fit *:py-1.5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button isLoading={isLoading} onClick={signOut} variant="destructive">
            Log out
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
