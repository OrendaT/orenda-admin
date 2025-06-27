import { useState, useEffect, useCallback } from 'react';
import { User, InviteUserPayload, Role } from '@/types/user';
import { createUserService } from '@/services/userService';
import useAxios from '@/lib/api/axios-client';

export const useUsers = () => {
  const { axios } = useAxios();
  const userService = createUserService(axios); // inject authenticated axios

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = useCallback(async (page = 1, search = '') => {
    setLoading(true);
    setError(null);
    try {
      const { data, total_pages } = await userService.getUsers(page, search);
      setUsers(data);
      setTotalPages(total_pages);
      setCurrentPage(page);
    } catch (e) {
      setError((e as Error).message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [userService]);

  const inviteUser = useCallback(async (data: InviteUserPayload) => {
    setLoading(true);
    try {
      const res = await userService.inviteUser(data);
      if (res.success) {
        await fetchUsers(currentPage);
      }
    } catch (e) {
      setError((e as Error).message || 'Failed to invite user');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [userService, fetchUsers, currentPage]);

  const changeUserRole = useCallback(async (userId: string, role: Role) => {
    setLoading(true);
    try {
      const res = await userService.changeRole(userId, role);
      if (res.success) {
        await fetchUsers(currentPage);
      }
    } catch (e) {
      setError((e as Error).message || 'Failed to change user role');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [userService, fetchUsers, currentPage]);

  const deleteUser = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const res = await userService.deleteUser(userId);
      if (res.success) {
        await fetchUsers(currentPage);
      }
    } catch (e) {
      setError((e as Error).message || 'Failed to delete user');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [userService, fetchUsers, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    totalPages,
    currentPage,
    fetchUsers,
    inviteUser,
    changeUserRole,
    deleteUser,
  };
};
