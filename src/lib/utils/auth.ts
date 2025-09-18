import { Teams, UserRole } from "@/types";

/**
 * @function getUserRole
 * @description Determines the user's highest role based on the provided roles array.
 */
export const getUserRole = (
  roles?: UserRole[],
): {
  role: UserRole;
  isProvider: boolean;
  isAdmin: boolean;
  isManager: boolean;
} => {
  let role: UserRole = 'Provider';
  let isProvider = false;
  let isAdmin = false;
  let isManager = false;

  if (roles?.some((role) => /Admin/i.test(role))) {
    isAdmin = true;
    role = 'Admin';
  } else if (roles?.some((role) => /Manager/i.test(role))) {
    isManager = true;
    role = 'Manager';
  } else if (roles?.some((role) => /Provider/i.test(role))) {
    isProvider = true;
    role = 'Provider';
  }

  return { role, isProvider, isAdmin, isManager };
};

export const getTeams = (teams: Teams) => Object.keys(teams) as (keyof Teams)[];
