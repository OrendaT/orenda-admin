// components/ui/avatar.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    width?: number;
    height?: number;
  }
>(({ className, alt = '', width = 40, height = 40, src, ...props }, ref) => {
  // Only render Image if src is provided and is a string
  if (!src || typeof src !== 'string') {
    return null;
  }

  return (
    <Image
      ref={ref}
      src={src}
      className={cn('aspect-square h-full w-full object-cover', className)}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
});
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };