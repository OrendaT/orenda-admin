/**
 * Core roles for users in the system.
 * Note: these have been renamed from SuperAdmin→Admin, ContentManager→Manager, ProviderManager→Provider.
 */
export type Role = 'Admin' | 'Manager' | 'Provider' | 'Owner';

/**
 * Roles specific to teams (used inside each team).
 */
export type TeamRole = 'Admin' | 'Member';

/**
 * Fine-grained permissions.
 * If you still rely on the old ROLE_PERMISSIONS, update it to match the new Role names.
 */
export type Permission =
  | 'create_user'
  | 'delete_user'
  | 'edit_user'
  | 'view_all'
  | 'manage_providers'
  | 'view_own'
  | 'edit_own';

/**
 * (Optional) If you need permission lookups by role, update this to use the new Role keys.
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  Admin: [
    'create_user',
    'delete_user',
    'edit_user',
    'view_all',
    'manage_providers',
  ],
  Manager: ['edit_user', 'view_all', 'manage_providers'],
  Provider: ['view_own', 'edit_own'],
  Owner: [
    'create_user',
    'delete_user',
    'edit_user',
    'view_all',
    'manage_providers',
  ],
};

/**
 * The shape returned by your API for a user (before transformation).
 * `teams` maps each team name to an array of team-level roles (e.g. ['Admin'], ['Member']).
 */
export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  teams?: Record<string, TeamRole[]>;
}

/**
 * Frontend‐friendly user object, with split first/last names.
 * `teams` is always defined (might be an empty object).
 */
export interface User extends ApiUser {
  first_name: string;
  last_name: string;
  isCurrentUser?: boolean;
  teams: Record<string, TeamRole[]>;
}

/**
 * What we send when inviting a new user.
 * - `roles`: array of top-level roles (usually a single entry).
 * - `teams`: maps team name → array of team-level roles.
 */
export interface InviteUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  roles: Role[];
  teams: Record<string, TeamRole[]>;
}

/**
 * The API payload shape (closely matches InviteUserPayload, with password optional on updates).
 */
export interface ApiUserPayload {
  name: string;
  email: string;
  password?: string;
  roles: Role[];
  teams?: Record<string, TeamRole[]>;
}
