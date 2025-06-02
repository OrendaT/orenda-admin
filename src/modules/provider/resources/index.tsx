import ResourceList from './resource-list';
import ResourceTitle from './resource-title';

const ProviderResources = async ({ id = '/' }: { id?: string }) => {
  return (
    <div>
      <ResourceTitle id={id} />

      <ResourceList id={id} />
    </div>
  );
};
export default ProviderResources;
