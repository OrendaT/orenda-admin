'use client';
import { Button } from '@/components/ui/button';

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Something went wrong!</h1>
        <p>
          {error?.message || 'An unknown error occurred. Please try again.'}
        </p>

        <p>Digest: {error.digest || ''}</p>

        <Button className="w-fit" variant={'outline'} onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
