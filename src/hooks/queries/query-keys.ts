import { UseAllFormsProps } from '@/types';

export const QUERY_KEYS = {
  allForms: ({
    page,
    url,
    search = '',
    filters,
  }: Partial<UseAllFormsProps>) => {
    let _filters = {};
    if (filters)
      _filters = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value),
      );

    return ['all_forms', page, url, search, _filters];
  },
  form: (id: string) => ['form', id],
  downloadTask: (id?: string) => ['download-task', id],
};
