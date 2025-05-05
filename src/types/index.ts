import { IconType } from 'react-icons/lib';
import { JSX } from 'react';

export type MenuItem = {
  id: string;
  title: string;
  href?: string;
  Icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export interface DashboardCardStats {
  name: string;
  value: number;
  percentage: number;
  trend: 'up' | 'down';
  range: string;
  NameIcon: IconType | (() => JSX.Element);
}

export type Status =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface IntakeFormTableData {
  id: string;
  first_name: string;
  last_name: string;
  status: 'pending' | 'submitted';
  type: 'Intake form';
  date: Date;
  flag?: boolean;
}

export interface AllFormsResponse {
  data: IntakeFormTableData[];
  message: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  success: boolean;
}
