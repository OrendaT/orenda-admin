// types/user.ts

// Updated Role type to match backend exactly
export type Role = 'SuperAdmin' | 'ContentManager' | 'ProviderManager' | 'Owner';

// Updated Permission type to match backend exactly
export type Permission = 
  | 'create_user' 
  | 'delete_user' 
  | 'edit_user' 
  | 'view_all' 
  | 'manage_providers'
  | 'view_own'
  | 'edit_own';

// Define a mapping of roles to their permissions (for display only)
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SuperAdmin: ['create_user', 'delete_user', 'edit_user', 'view_all', 'manage_providers'],
  ContentManager: ['edit_user', 'view_all', 'manage_providers'],
  ProviderManager: ['view_own', 'edit_own'],
  Owner: ['create_user', 'delete_user', 'edit_user', 'view_all', 'manage_providers']
};

// Frontend user interface (with separate first_name and last_name)
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  avatar?: string;
  isCurrentUser?: boolean;
  name?: string; // Added for completeness
}

// Backend API user interface (with combined name field)
export interface ApiUser {
  id: string;
  name: string; // Combined first_name and last_name
  email: string;
  role: Role;
  avatar?: string;
  // Add any other fields from the API
}

// Frontend payload for inviting users (with separate first_name and last_name)
export interface InviteUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  note?: string; // Optional
}

// Backend API payload for inviting users (with combined name field)
export interface ApiUserPayload {
  name: string; // Combined first_name and last_name
  email: string;
  role: Role;
  note?: string; // Optional
}