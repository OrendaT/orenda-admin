'use client';

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
  } = Object.fromEntries(params.entries());

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
