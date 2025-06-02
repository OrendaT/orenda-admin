import ResourceFile from './resource-file';
import { cn, findResource } from '@/lib/utils';
import { resources } from '@/lib/data/resources';
import type { ResourceFile as File, ResourceFolder as Folder } from '@/types';
import ResourceFolder from './resource-folder';

interface ResourceListProps {
  id: string;
  className?: string;
}

const ResourceList = ({ id, className }: ResourceListProps) => {
  const foundResource = findResource(resources, id);
  const _resources =
    foundResource && 'resources' in foundResource
      ? (foundResource as { resources: File[] | Folder[] }).resources
      : [];

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))] justify-items-center gap-5',
        className,
      )}
    >
      {Array.isArray(_resources) &&
        _resources?.map((resource) =>
          'resources' in resource ? (
            <ResourceFolder key={resource.id} folder={resource} />
          ) : (
            <ResourceFile key={resource.id || resource.url} file={resource} />
          ),
        )}
    </div>
  );
};
export default ResourceList;
