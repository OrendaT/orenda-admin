import { FoundResource } from '@/types';
import ResourceList from './resource-list';
import ResourceTitle from './resource-title';

const ProviderResources = async ({ resource }: { resource: FoundResource }) => {
  return (
    <div className="px-1">
      <ResourceTitle title={resource.name} />

      <ResourceList resources={resource} />
    </div>
  );
};
export default ProviderResources;
