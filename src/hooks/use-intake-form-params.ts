'use client';

import { decode } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

const useIntakeFormParams = () => {
  const params = useSearchParams();

  const {
    page = '1',
    search,
    flag,
    from,
    to,
    status,
  } = Object.fromEntries(
    Array.from(params.entries()).map(([key, value]) => [key, decode(value)]),
  );

  return {
    page,
    search,
    flag,
    from,
    to,
    status,
    params: Object.fromEntries(params.entries()),
  };
};
export default useIntakeFormParams;
