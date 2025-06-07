import ResourceFile from './resource-file';
import { cn } from '@/lib/utils';
import type {
  ResourceFile as File,
  ResourceFolder as Folder,
  FoundResource,
} from '@/types';
import ResourceFolder from './resource-folder';

interface ResourceListProps {
  resources: FoundResource;
  className?: string;
}

const ResourceList = ({ resources, className }: ResourceListProps) => {
  const _resources =
    resources && 'resources' in resources
      ? (resources as { resources: File[] | Folder[] }).resources
      : [];

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fill,minmax(12.5rem,1fr))] justify-items-center gap-5 pb-12',
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
