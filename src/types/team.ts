// src/types/team.ts

export type TeamCategory =
  | 'Intake'
  | 'Billing'
  | 'Credentialing'
  | 'Clinical'
  | 'Communication'
  | 'PriorAuths'
  | 'Doxy';

export type Role = 'Admin' | 'Manager' | 'Member';

export interface TeamMember {
  id: string;
  name: string | null;
  email: string;
  roles?: string[];
  teams: Record<TeamCategory, string | undefined>; // ✅ required and fully typed
  firstName?: string;
  lastName?: string;
}