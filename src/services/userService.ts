// services/userService.ts

import axios from '@/lib/api/axios';
import { User, ApiUser, InviteUserPayload, ApiUserPayload, Role, ROLE_PERMISSIONS } from '@/types/user';

// Transformation functions
const transformUserForApi = (userData: InviteUserPayload): ApiUserPayload => {
  // Create the base payload
  const payload: ApiUserPayload = {
    name: `${userData.first_name} ${userData.last_name}`.trim(),
    email: userData.email,
    role: userData.role
  };
  
  // Only add note if it has content (since backend might not support it yet)
  if (userData.note && userData.note.trim() !== '') {
    payload.note = userData.note.trim();
  }
  
  return payload;
};

const transformUserFromApi = (apiUser: ApiUser): User => {
  // Split the name into first_name and last_name
  const nameParts = apiUser.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  return {
    ...apiUser,
    first_name: firstName,
    last_name: lastName,
    name: apiUser.name // Keep the original name too
  };
};

export const userService = {
  // Get all users with optional pagination and filtering
  getUsers: async (page = 1, search = '', filters = {}): Promise<{ data: User[], total_pages: number }> => {
    const response = await axios.get('/users', {
      params: { page, search, ...filters }
    });
    
    // Transform API users to frontend users
    const transformedUsers = response.data.data.map(transformUserFromApi);
    
    return {
      ...response.data,
      data: transformedUsers
    };
  },
  
  // Invite a new user
  inviteUser: async (userData: InviteUserPayload): Promise<{ success: boolean; message: string }> => {
    // Transform the user data for the API
    const apiPayload = transformUserForApi(userData);
    
    const response = await axios.post('/users/invite', apiPayload);
    return response.data;
  },
  
  // Change user role
  changeRole: async (userId: string, role: Role): Promise<{ success: boolean; message: string }> => {
    const response = await axios.patch(`/users/${userId}/role`, { role });
    return response.data;
  },
  
  // Delete a user
  deleteUser: async (userId: string): Promise<{ success: boolean; message: string }> => {
    const response = await axios.delete(`/users/${userId}`);
    return response.data;
  }
};