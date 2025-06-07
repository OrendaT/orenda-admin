'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[80dvh] w-full flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold">Error</h2>

      <p>{error?.message || 'An unknown error occurred. Please try again.'}</p>

      {error.digest && <p>Digest: {error.digest}</p>}

      <br />

      <Button
        className="w-fit"
        variant="outline"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
