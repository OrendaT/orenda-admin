import { cover_image } from '@/assets';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resources } from '@/lib/app-data';
import type { ResourceFolder, ResourceFile } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { LuFolder } from 'react-icons/lu';

const Resources = () => {
  return (
    <Tabs className="pb-7" defaultValue={resources[0].id}>
      <TabsList className="scrollbar-none mb-6 flex h-auto w-full flex-wrap gap-2 p-1">
        {resources.map(({ id, name }) => (
          <TabsTrigger key={id} value={id}>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>

      {resources.map(({ id }) => (
        <TabsContent key={id} value={id}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))] justify-items-center gap-5">
            {resources
              .find((resource) => resource.id === id)
              ?.resources.map((resource) =>
                'folder_name' in resource ? (
                  <ResourceFolder key={resource.id} folder={resource} />
                ) : (
                  <ResourceFile key={resource.id} file={resource} />
                ),
              )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Resources;

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

const ResourceFile = ({ file: { url, file_name } }: { file: ResourceFile }) => {
  return (
    <Link href={url} target="_blank" className="w-full max-w-64">
      <article className="h-full w-full items-center justify-center overflow-clip rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)]">
        <div className="clamp-[h,24,20] flex w-full bg-[#F6F6F6]">
          <Image
            className="size-full object-contain object-center"
            src={cover_image}
            alt="file cover image"
          />
        </div>

        <div className="min-h-[4.94rem] content-center px-2 py-4">
          <h3 className="line-clamp-2 text-sm">{file_name}</h3>
        </div>
      </article>
    </Link>
  );
};
