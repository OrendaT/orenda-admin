// hooks/useUsers.ts

import { useState, useEffect, useCallback } from 'react';
import { User, InviteUserPayload, Role } from '@/types/user';
import { userService } from '@/services/userService';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchUsers: (page?: number, search?: string) => Promise<void>;
  inviteUser: (payload: InviteUserPayload) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  changeUserRole: (userId: string, role: Role) => Promise<void>;
}

// Sample data for development/fallback
const SAMPLE_USERS: User[] = [
  {
    id: '1',
    first_name: 'Olivia',
    last_name: 'Coraldos',
    email: 'Olivia@orenda.com',
    role: 'Owner',
    name: 'Olivia Coraldos',
    isCurrentUser: true
  },
  {
    id: '2',
    first_name: 'Arlene',
    last_name: 'Mccoy',
    email: 'arlenemccoy@orenda.com',
    role: 'SuperAdmin',
    name: 'Arlene Mccoy'
  },
  {
    id: '3',
    first_name: 'Guy',
    last_name: 'Hawkins',
    email: 'Guyhawkins@orenda.com',
    role: 'ContentManager',
    name: 'Guy Hawkins'
  },
  {
    id: '4',
    first_name: 'Dianne',
    last_name: 'Russell',
    email: 'Diannerus@orenda.com',
    role: 'ProviderManager',
    name: 'Dianne Russell'
  },
  {
    id: '5',
    first_name: 'Kathryn',
    last_name: 'Murphy',
    email: 'kathrynmurphy@orenda.com',
    role: 'ProviderManager',
    name: 'Kathryn Murphy'
  },
  {
    id: '6',
    first_name: 'Jacob',
    last_name: 'Jones',
    email: 'Jj@orenda.com',
    role: 'ContentManager',
    name: 'Jacob Jones'
  },
  {
    id: '7',
    first_name: 'Darlene',
    last_name: 'Robertson',
    email: 'Darlenerobertson@orenda.com',
    role: 'ProviderManager',
    name: 'Darlene Robertson'
  },
  {
    id: '8',
    first_name: 'Marvin',
    last_name: 'McKinney',
    email: 'Marvin@orenda.com',
    role: 'ContentManager',
    name: 'Marvin McKinney'
  },
  {
    id: '9',
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah@orenda.com',
    role: 'ProviderManager',
    name: 'Sarah Johnson'
  },
  {
    id: '10',
    first_name: 'Michael',
    last_name: 'Brown',
    email: 'michael@orenda.com',
    role: 'ContentManager',
    name: 'Michael Brown'
  },
  {
    id: '11',
    first_name: 'Emily',
    last_name: 'Davis',
    email: 'emily@orenda.com',
    role: 'SuperAdmin',
    name: 'Emily Davis'
  },
  {
    id: '12',
    first_name: 'John',
    last_name: 'Smith',
    email: 'john@orenda.com',
    role: 'ContentManager',
    name: 'John Smith'
  },
  {
    id: '13',
    first_name: 'Jane',
    last_name: 'Williams',
    email: 'jane@orenda.com',
    role: 'ProviderManager',
    name: 'Jane Williams'
  },
  {
    id: '14',
    first_name: 'Robert',
    last_name: 'Miller',
    email: 'robert@orenda.com',
    role: 'ContentManager',
    name: 'Robert Miller'
  },
  {
    id: '15',
    first_name: 'Lisa',
    last_name: 'Wilson',
    email: 'lisa@orenda.com',
    role: 'ProviderManager',
    name: 'Lisa Wilson'
  },
  {
    id: '16',
    first_name: 'James',
    last_name: 'Anderson',
    email: 'james@orenda.com',
    role: 'ContentManager',
    name: 'James Anderson'
  },
  {
    id: '17',
    first_name: 'Sarah',
    last_name: 'Thomas',
    email: 'sarah@orenda.com',
    role: 'ProviderManager',
    name: 'Sarah Thomas'
  },
  {
    id: '18',
    first_name: 'Daniel',
    last_name: 'Enoch',
    email: 'daniel@orenda.com',
    role: 'SuperAdmin',
    name: 'Daniel Enoch'
  },
  {
    id: '19',
    first_name: 'Jocelyn',
    last_name: 'Dunice',
    email: 'jocelyn@orenda.com',
    role: 'ProviderManager',
    name: 'Jocelyn Dunice'
  },
  {
    id: '20',
    first_name: 'Elena',
    last_name: 'Clive',
    email: 'elena@orenda.com',
    role: 'ContentManager',
    name: 'Elena Clive'
  }
];

// Items per page for pagination
const ITEMS_PER_PAGE = 8;

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchUsers = useCallback(async (page = 1, search = '') => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to use your API service first
      const response = await userService.getUsers(page, search);
      setUsers(response.data);
      setTotalPages(response.total_pages);
      setCurrentPage(page);
    } catch (err) {
      console.warn('API call failed, using sample data:', err);
      
      // Fallback to sample data for development with proper pagination
      const filteredSampleUsers = search 
        ? SAMPLE_USERS.filter(user => 
            user.first_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.role?.toLowerCase().includes(search.toLowerCase())
          )
        : SAMPLE_USERS;
      
      // Calculate pagination for sample data
      const totalPages = Math.ceil(filteredSampleUsers.length / ITEMS_PER_PAGE);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedUsers = filteredSampleUsers.slice(startIndex, endIndex);
      
      // Set paginated data
      setUsers(paginatedUsers);
      setTotalPages(totalPages);
      setCurrentPage(page);
      
      // Only set error if it's not a network/API connection issue
      if (err instanceof Error && !err.message.includes('Network Error')) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const inviteUser = useCallback(async (payload: InviteUserPayload) => {
    setLoading(true);
    setError(null);

    try {
      // Use your API service
      const response = await userService.inviteUser(payload);
      
      if (response.success) {
        // Refresh users list after successful invite
        await fetchUsers(currentPage);
      } else {
        throw new Error(response.message || 'Failed to invite user');
      }
    } catch (err) {
      console.warn('API invite failed, simulating success:', err);
      
      // Fallback: Add to sample data and refresh current page
      const newUser: User = {
        id: Date.now().toString(),
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        role: payload.role,
        name: `${payload.first_name} ${payload.last_name}`.trim()
      };
      
      // Add to sample users array
      SAMPLE_USERS.push(newUser);
      
      // Refresh current page to show updated data
      await fetchUsers(currentPage);
      
      // Only set error if it's not a network/API connection issue
      if (err instanceof Error && !err.message.includes('Network Error')) {
        setError(err.message);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, [fetchUsers, currentPage]);

  const deleteUser = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Use your API service
      const response = await userService.deleteUser(userId);
      
      if (response.success) {
        // Refresh users list after successful deletion
        await fetchUsers(currentPage);
      } else {
        throw new Error(response.message || 'Failed to delete user');
      }
    } catch (err) {
      console.warn('API delete failed, removing from sample data:', err);
      
      // Fallback: Remove from sample data and refresh
      const userIndex = SAMPLE_USERS.findIndex(user => user.id === userId);
      if (userIndex > -1) {
        SAMPLE_USERS.splice(userIndex, 1);
      }
      
      // Calculate if we need to go to previous page after deletion
      const totalPages = Math.ceil(SAMPLE_USERS.length / ITEMS_PER_PAGE);
      const newCurrentPage = currentPage > totalPages ? Math.max(1, totalPages) : currentPage;
      
      // Refresh with potentially adjusted page
      await fetchUsers(newCurrentPage);
      
      // Only set error if it's not a network/API connection issue
      if (err instanceof Error && !err.message.includes('Network Error')) {
        setError(err.message);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, [fetchUsers, currentPage]);

  const changeUserRole = useCallback(async (userId: string, role: Role) => {
    setLoading(true);
    setError(null);

    try {
      // Use your API service
      const response = await userService.changeRole(userId, role);
      
      if (response.success) {
        // Refresh users list after successful role change
        await fetchUsers(currentPage);
      } else {
        throw new Error(response.message || 'Failed to change user role');
      }
    } catch (err) {
      console.warn('API role change failed, updating sample data:', err);
      
      // Fallback: Update sample data and refresh current page
      const userIndex = SAMPLE_USERS.findIndex(user => user.id === userId);
      if (userIndex > -1) {
        SAMPLE_USERS[userIndex] = {
          ...SAMPLE_USERS[userIndex],
          role: role
        };
      }
      
      // Refresh current page to show updated data
      await fetchUsers(currentPage);
      
      // Only set error if it's not a network/API connection issue
      if (err instanceof Error && !err.message.includes('Network Error')) {
        setError(err.message);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, [fetchUsers, currentPage]);

  // Fetch users on mount
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
    deleteUser,
    changeUserRole,
  };
};