import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resources } from '@/lib/data/resources';
import FileList from './file-list';

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
          <FileList id={id} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Resources;
