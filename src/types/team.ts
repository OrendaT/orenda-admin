// src/types/team.ts
export type TeamCategory =
  | 'Intake'
  | 'Billing'
  | 'Credentialing'
  | 'Clinical'
  | 'Comms'
  | 'PriorAuths'
  | 'Doxy';

export type Role = 'Admin' | 'Manager' | 'Team Member';

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  teams: Partial<Record<TeamCategory, boolean>>;
}