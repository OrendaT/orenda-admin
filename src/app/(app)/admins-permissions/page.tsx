'use client';

import React, { useState } from 'react';
// import { useUsers } from '@/hooks/useUsers';
import UserTable from '@/components/AdminsPermissions/UserTable';
import InviteUserModal from '@/components/AdminsPermissions/InviteUserModal';
import { Button } from '@/components/ui/button';

import { useQueryClient } from '@tanstack/react-query';

const AdminsPermissionsPage = () => {

  const queryClient = useQueryClient();

  const [inviteOpen, setInviteOpen] = useState(false);

  return (

    <div className="w-full h-screen flex">
      <div className="flex-1 bg-gray-50 p-6 overflow-auto scrollbar-none">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[clamp(1.5rem, 3vw + 0.75rem, 2.25rem)] font-semibold">Admins & Permissions</h1>
          <Button
            onClick={() => setInviteOpen(true)}
            // style={{ width: '12rem' }}
            className="w-[clamp(6rem,50vw,12rem)] flex items-center justify-center bg-[#2E0086] hover:bg-[#25006D] text-white py-2 rounded-3xl"
          >
            + Add User
          </Button>
        </div>

        
        <div className="w-full overflow-x-auto">
          <UserTable />
        </div>

        <InviteUserModal
          isOpen={inviteOpen}
          onClose={() => setInviteOpen(false)}
          onSuccess={async () => {
            setInviteOpen(false);
            await queryClient.invalidateQueries();
          }}
        />
      </div>
    </div>


  );
};

export default AdminsPermissionsPage;
