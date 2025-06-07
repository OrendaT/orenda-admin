import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resources } from '@/lib/data/resources';
import ResourceList from './resource-list';
import { findResource } from '@/lib/utils';

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

      {resources.map(({ id }) => {
        const resources = findResource(id);
        if (!resources) return null;

        return (
          <TabsContent key={id} value={id}>
            <ResourceList resources={resources} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
export default Resources;
