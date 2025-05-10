import { UseAllFormsProps } from '@/types';

export const QUERY_KEYS = {
  allForms: ({ page, search, filters }: UseAllFormsProps) => [
    'all_forms',
    page,
    search,
    filters,
  ],
  downloadTask: (id?: string) => ['download-task', id],
};
