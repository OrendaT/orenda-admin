'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const useFormsParams = () => {
  const params = useSearchParams();

  // ✅ memoise the params object so it's stable
  const entries = useMemo(() => Object.fromEntries(params.entries()), [params]);

  const { page = '1', search, flag, from, to, status } = entries;

  return {
    page,
    search,
    flag,
    from,
    to,
    status,
    params: entries, // stable reference now
  };
};
export default useFormsParams;
