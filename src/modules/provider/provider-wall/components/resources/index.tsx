import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourceFolder from './resource-folder';
import ResourceFile from './resource-file';
import { resources } from '@/lib/data/resources';

const Resources = () => {
  return (
    <Tabs className="pb-7" defaultValue={resources[0].id}>
      <TabsList className="scrollbar-none mb-6 w-full flex-wrap gap-2">
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
