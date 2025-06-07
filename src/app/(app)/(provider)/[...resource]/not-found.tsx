'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const { back } = useRouter();
  return (
    <div className="flex min-h-[75dvh] flex-col items-center justify-center gap-4">
      <h1 className="clamp-[text,xl,2xl] text-center font-semibold">
        Resource not found
      </h1>

      <Button className="w-fit" variant="ghost" onClick={back}>
        Go back
      </Button>
    </div>
  );
};
export default NotFound;
