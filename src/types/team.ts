// src/types/team.ts
export type TeamCategory =
  | 'Intake'
  | 'Billing'
  | 'Credentialing'
  | 'Clinical'
  | 'Comms'
  | 'PriorAuths'
  | 'Doxy';

export type Role = 'Admin' | 'Manager' | 'Member';

export interface TeamMember {
  id: string;
  name: string | null;
  email: string; // ✅ Add this line
  roles?: string[];
  teams?: Record<string, boolean>;
  firstName?: string;
  lastName?: string;
  intake: boolean;
  billing: boolean;
  onboarding: boolean;
  clinical: boolean;
  comms: boolean;
  proAuths: boolean;
  today: boolean;
}
