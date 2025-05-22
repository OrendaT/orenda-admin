// components/AdminsPermissions/index.tsx

'use client';

import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import UserTable from './UserTable';
import InviteUserModal from './InviteUserModal';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '../layout/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminsPermissionsPage: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const { users, loading, error, fetchUsers } = useUsers();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-[#F6F6F6]">
          <div className="w-full p-6">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-semibold">Admins & Permissions</h1>
              <Button 
                onClick={() => setIsInviteModalOpen(true)}
                className="bg-[#2e0086] hover:bg-[#25006d] w-40 h-11 text-white"
              >
                <span className="mr-1">+</span> Add user
              </Button>
            </div>

            <UserTable users={users} loading={loading} />

            {isInviteModalOpen && (
              <InviteUserModal 
                isOpen={isInviteModalOpen} 
                onClose={() => setIsInviteModalOpen(false)}
                onSuccess={() => {
                  setIsInviteModalOpen(false);
                  fetchUsers(); // Refresh the user list
                }}
              />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminsPermissionsPage;