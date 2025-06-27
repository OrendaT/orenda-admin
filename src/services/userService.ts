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

// ✅ This matches what useAxios returns — a function that takes config and returns a response
type RequestFn = <T = any>(
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
  teams: Object.entries(data.teams).every(([_, roles]) => roles.length === 0)
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

  console.log('👤 roles:', data.roles);  // e.g. ['Manager']
  console.log('📂 teams:', data.teams);  // e.g. { Credentialing: ['Member'] }

    const payload = transformUserForApi(data);
    console.log('[inviteUser payload]', payload); 
    const response = await request<SuccessResponse>({
      url: '/admin/users',
      method: 'POST',
      data: payload,
    });
    return response.data;
  },

  changeRole: async (userId: string, role: Role): Promise<SuccessResponse> => {
    const response = await request<SuccessResponse>({
      url: `/admin/users/${userId}/role`,
      method: 'PATCH',
      data: { role },
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
