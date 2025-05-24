import type { ResourceFolder } from '@/types';
import { LuFolder } from 'react-icons/lu';

const ResourceFolder = ({
  folder: { folder_name, files, sub_folders },
}: {
  folder: ResourceFolder;
}) => {
  return (
    <div className="flex w-full items-center gap-4 rounded-lg bg-white px-4 py-2 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)]">
      <LuFolder className="size-7 text-gray-500" />
      <div className="flex flex-col">
        <h3 className="font-medium">{folder_name}</h3>
        <p className="text-xs">
          {sub_folders?.length ? `${sub_folders.length} folders, ` : ''}
          {files.length} files
        </p>
      </div>
    </div>
  );
};

export default ResourceFolder;
