import FileList from './file-list';
import ResourceTitle from './resource-title';

const ProviderResources = async () => {
  return (
    <div>
      <ResourceTitle />

      <FileList />
    </div>
  );
};
export default ProviderResources;
