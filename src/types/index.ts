import { IconType } from 'react-icons/lib';
import { JSX } from 'react';

export type MenuItem = {
  id: string;
  title: string;
  href?: string;
  Icon: React.ReactNode;
  className?: string;
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
