import FileList from './components/resources/file-list';
import ResourceTitle from './components/resources/resource-title';

const ProviderResources = async () => {
  return (
    <div>
      <ResourceTitle />

      <FileList />
    </div>
  );
};
export default ProviderResources;
