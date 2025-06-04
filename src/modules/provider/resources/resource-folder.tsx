import type { ResourceFolder } from '@/types';
import Link from 'next/link';
import { LuFolder } from 'react-icons/lu';

const ResourceFolder = ({
  folder: { id, name, resources, sub_folders },
}: {
  folder: ResourceFolder;
}) => {
  const fileCount = resources.length;
  const folderCount = sub_folders?.length;
  return (
    <Link
      href={id}
      className="flex w-full items-center gap-4 rounded-lg bg-white px-4 py-2 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)]"
    >
      <LuFolder className="size-7 shrink-0" />
      <div className="flex flex-col">
        <h3 className="line-clamp-1 font-medium" title={name}>
          {name}
        </h3>
        <p className="text-xs">
          {folderCount ? `${folderCount} folders, ` : ''}
          {fileCount} file{fileCount !== 1 && 's'}
        </p>
      </div>
    </Link>
  );
};

export default ResourceFolder;
