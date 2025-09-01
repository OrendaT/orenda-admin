import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import Providers from '@/providers';

export const metadata: Metadata = {
  title: {
    default: 'Orenda Portal',
    template: '%s | Orenda Portal',
  },
  description: 'Orenda portal',
};

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-[100dvh] w-full flex-col antialiased',
          dmSans.className,
        )}
      >
        <Providers>{children}</Providers>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
