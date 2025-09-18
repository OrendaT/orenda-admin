import { IconType } from 'react-icons/lib';
import { JSX } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export * from './forms';
export * from './auth';

export type FormType = 'intake' | 'billing' | 'credentialing';
export type URLFormType = 'intake' | 'credit-card' | 'credentialing';
export type ExportKey = 'patients' | 'credit_cards' | 'providers';

export interface SidebarMenuItem {
  id: string;
  title: string;
  href?: string;
  Icon?: React.ReactNode;
  className?: string;
  itemClassName?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  isActive?: boolean;
  items?: SidebarMenuItem[];
  hidden?: boolean;
}

export interface DashboardCardStat {
  name: string;
  value: number;
  percentage: number;
  trend: 'up' | 'down';
  range: string;
  NameIcon: IconType | (() => JSX.Element);
}

export interface ENDPOINT {
  ALL_FORMS: string;
  EXPORT: string;
  FORM: (id: string) => string;
  FLAG: (id: string) => string;
  CREDIT_CARD: (id: string) => string;
  MASS_DOWNLOAD: string;
  CHECK_TASK: (id?: string) => string;
  DOWNLOAD_FORM: (id: string) => string;
}

export type Status =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface AllFormsResponse<T = unknown> {
  data: T[];
  message: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  success: boolean;
}

export interface UseAllFormsProps {
  url: string;
  page?: string;
  search?: string;
  filters?: {
    flag?: string;
    from?: string;
    to?: string;
    status?: string;
  };
  prefetchNextPages?: boolean;
}

export interface TaskStatusResponse {
  error: boolean | null;
  ready: boolean;
  successful: boolean;
  url: string;
}

// This is the type for the resources in the app-data.ts file
export interface Resource {
  id: string;
  name: string;
  resources: ResourceFolder[] | ResourceFile[];
  title?: SidebarMenuItem['title'];
  Icon: SidebarMenuItem['Icon'];
}

export interface ResourceFolder {
  id: string;
  name: string;
  title?: string;
  resources: ResourceFile[];
  sub_folders?: ResourceFolder[];
}

export interface ResourceFile {
  id?: string;
  name: string;
  url: string;
  image?: string | StaticImport;
}

export type FoundResource = Resource | ResourceFile | ResourceFolder;
