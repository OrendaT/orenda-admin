// components/AdminsPermissions/UserTable.tsx

'use client';

import React, { useState, useEffect } from 'react';
import UserRow from './UserRow';
import { Button } from '@/components/ui/button';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Pagination from './Pagination';
import { User } from '@/types/user';
import { cn } from '@/lib/utils';
import { useUsers } from '@/hooks/useUsers';

interface UserTableProps {
  users: User[];
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users: propUsers, loading: propLoading }) => {
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  
  // Use the useUsers hook for pagination and search
  const { 
    users: hookUsers, 
    loading: hookLoading, 
    totalPages, 
    currentPage, 
    fetchUsers 
  } = useUsers();

  // Use hook users if available, otherwise fall back to prop users
  const users = hookUsers.length > 0 ? hookUsers : propUsers;
  const loading = hookLoading || propLoading;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch users when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== undefined) {
      fetchUsers(1, debouncedSearch);
    }
  }, [debouncedSearch, fetchUsers]);

  const handlePageChange = (page: number) => {
    fetchUsers(page, debouncedSearch);
  };

  // For local filtering when not using API pagination
  const filteredUsers = users.filter(user => 
    user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
    user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase()) ||
    user.role?.toLowerCase().includes(search.toLowerCase())
  );

  // Use filteredUsers for display if we're not using API pagination
  const displayUsers = totalPages > 1 ? users : filteredUsers;
  const displayTotalPages = totalPages > 1 ? totalPages : Math.ceil(filteredUsers.length / 10);

  return (
    <div className="w-full bg-[#F6F6F6]  shadow-sm">
      <div className="p-4 flex items-center gap-10 border-b">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className={cn(
              'w-full rounded-lg pl-10 pr-4 py-2.5 outline outline-[#E7E7E7] text-sm',
              'focus:outline-blue-500 focus:outline-2'
            )}
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 w-30 h-11">
          <FiFilter /> Filter
        </Button>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-12 p-4 text-sm text-gray-500 border-b">
          <div className="col-span-4">User</div>
          <div className="col-span-3">Role</div>
          <div className="col-span-4">Access control</div>
          <div className="col-span-1"></div> {/* Actions column */}
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="text-gray-500 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
              Loading users...
            </div>
          </div>
        ) : displayUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {search ? `No users found matching "${search}"` : 'No users found'}
          </div>
        ) : (
          displayUsers.map((user) => (
            <UserRow key={user.id || user.email} user={user} />
          ))
        )}
      </div>

      {displayTotalPages > 1 && (
        <div className="p-4 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={displayTotalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;