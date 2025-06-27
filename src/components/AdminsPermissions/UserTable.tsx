'use client';

import React from 'react';
import UserRow from './UserRow';
import { Button } from '@/components/ui/button';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Pagination from './Pagination';
import { User } from '@/types/user';
import { cn } from '@/lib/utils';

interface UserTableProps {
  users: User[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number, search?: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="w-full bg-[#F6F6F6] shadow-sm">
      {/* Table headers */}
      <div className="grid grid-cols-12 p-4 text-sm text-gray-500 border-b">
        <div className="col-span-4">User</div>
        <div className="col-span-3">Role</div>
        <div className="col-span-4">Team</div>
        <div className="col-span-1"></div>
      </div>

      {/* Table body with loading, empty, or populated state */}
      {loading ? (
        <div className="p-8 flex justify-center">Loading...</div>
      ) : users.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No users found.</div>
      ) : (
        users.map((user) => <UserRow key={user.id} user={user} />)
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="p-4 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;
