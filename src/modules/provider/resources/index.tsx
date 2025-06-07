import ResourceList from './resource-list';
import ResourceTitle from './resource-title';

const ProviderResources = async ({ id = '/' }: { id?: string }) => {
  return (
    <div className="px-1">
      <ResourceTitle id={id} />

      <ResourceList id={id} />
    </div>
  );
};
export default ProviderResources;
