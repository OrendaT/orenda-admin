// app/admins-permissions/page.tsx
'use client';

import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { useUsers } from '@/hooks/useUsers';
import UserTable from '@/components/AdminsPermissions/UserTable';
import InviteUserModal from '@/components/AdminsPermissions/InviteUserModal';
import { Button } from '@/components/ui/button';

const AdminsPermissionsPage = () => {
  const { users, loading, fetchUsers, totalPages, currentPage } = useUsers();

  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    
      <div className="w-full h-screen flex">
        
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Admins & Permissions</h1>
            <Button
              onClick={() => setInviteOpen(true)}
              style={{ width: '12rem' }}
              className="flex items-center justify-center bg-[#2E0086] hover:bg-[#25006D] text-white py-2 rounded-3xl"
            >
              + Add User
            </Button>
          </div>
          <UserTable
            users={users}
            loading={loading}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={fetchUsers}
          />
          <InviteUserModal
            isOpen={inviteOpen}
            onClose={() => setInviteOpen(false)}
            onSuccess={() => {
              setInviteOpen(false);
              fetchUsers();
            }}
          />
        </div>
      </div>
    
  );
};

export default AdminsPermissionsPage;
