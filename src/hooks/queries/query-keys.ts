import { UseAllFormsProps } from '@/types';

export const QUERY_KEYS = {
  allUsers: ['all_users'] as const,
  allForms: ({ page, search, filters, url }: Partial<UseAllFormsProps>) => [
    'all_forms',
    page,
    search,
    filters,
    url,
  ],
  form: (id: string) => ['form', id],
  downloadTask: (id?: string) => ['download-task', id],
};
