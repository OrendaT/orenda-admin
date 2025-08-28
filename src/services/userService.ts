// services/userService.ts

import {
  User,
  ApiUser,
  InviteUserPayload,
  ApiUserPayload,
  Role,
} from '@/types/user';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type SuccessResponse = { success: boolean };

type RequestFn = <T = unknown>(
  config: AxiosRequestConfig
) => Promise<AxiosResponse<T>>;

const transformUserFromApi = (apiUser: ApiUser): User => {
  const [first_name, ...rest] = apiUser.name?.split(' ') || [''];
  const last_name = rest.join(' ');
  return {
    ...apiUser,
    first_name,
    last_name,
    teams: apiUser.teams || {},
  };
};

const transformUserForApi = (data: InviteUserPayload): ApiUserPayload => ({
  name: `${data.first_name} ${data.last_name}`.trim().replace(/\s+/g, ' '),
  email: data.email,
  password: data.password,
  roles: data.roles,
  teams: Object.entries(data.teams).every(([roles]) => roles.length === 0)
    ? undefined
    : data.teams,
});

export const createUserService = (request: RequestFn) => ({
  getUsers: async (page = 1, search = '') => {
    const response = await request<{
      data: ApiUser[];
      total_pages: number;
    }>({
      url: '/admin/users',
      method: 'GET',
      params: { page, search },
    });
    const users = response.data.data.map(transformUserFromApi);
    return { data: users, total_pages: response.data.total_pages };
  },

  inviteUser: async (data: InviteUserPayload): Promise<SuccessResponse> => {
    console.log('👤 roles:', data.roles);
    console.log('📂 teams:', data.teams);

    const payload = transformUserForApi(data);
    console.log('[inviteUser payload]', payload);

    const response = await request<SuccessResponse>({
      url: '/admin/users',
      method: 'POST',
      data: payload,
    });

    return response.data;
  },

  // ✅ FIXED: use roles array instead of role string
  changeRole: async (userId: string, newRole: Role): Promise<SuccessResponse> => {
    const payload = { roles: [newRole] };
    console.log('[changeRole payload]', payload);

    const response = await request<SuccessResponse>({
      url: `/admin/users/${userId}`,
      method: 'PATCH',
      data: payload,
    });

    return response.data;
  },

  deleteUser: async (userId: string): Promise<SuccessResponse> => {
    const response = await request<SuccessResponse>({
      url: `/admin/users/${userId}`,
      method: 'DELETE',
    });

    return response.data;
  },
});
