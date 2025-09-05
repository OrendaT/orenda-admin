export type UserRole = 'Admin' | 'Provider' | 'Manager';
export type TeamRole = 'Manager' | 'Member';

export interface DBUser {
  access_token: string;
  refresh_token?: string;
  user: {
    name: string | null;
    email: string;
    roles: UserRole[];
    teams: Teams;
    id: string;
  };
}

export interface Teams {
  Billing?: TeamRole[];
  Communication?: TeamRole[];
  Clinical?: TeamRole[];
  Onboarding?: TeamRole[];
  Intake?: TeamRole[];
}
