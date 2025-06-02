'use client';

import { resources } from '@/lib/data/resources';
import { cn, findResource } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const ResourceTitle = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const resource = findResource(resources, pathname);

  const title = resource?.name;

  return (
    <h1 className={cn('clamp-[text,lg,xl] mb-8 font-semibold', className)}>
      {title}
    </h1>
  );
};
export default ResourceTitle;
