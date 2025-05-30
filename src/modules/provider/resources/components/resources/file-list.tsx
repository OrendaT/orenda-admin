'use client';

import ResourceFile from './resource-file';
import { cn, findResourceById } from '@/lib/utils';
import { resources } from '@/lib/data/resources';
import { usePathname } from 'next/navigation';
import type { ResourceFile as File } from '@/types';

interface FileListProps {
  id?: string;
  className?: string;
}

const FileList = ({ id, className }: FileListProps) => {
  const pathname = usePathname();

  const foundResource = findResourceById(resources, id || pathname);
  const _resources =
    foundResource && 'resources' in foundResource
      ? (foundResource as { resources: File[] }).resources
      : [];

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))] justify-items-center gap-5',
        className,
      )}
    >
      {Array.isArray(_resources) &&
        _resources?.map((resource) => (
          <ResourceFile key={resource.id} file={resource} />
        ))}
    </div>
  );
};
export default FileList;
