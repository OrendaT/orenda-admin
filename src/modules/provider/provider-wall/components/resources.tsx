import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resources } from '@/lib/app-data';

const Resources = () => {
  return (
    <Tabs defaultValue={resources[0].id}>
      <TabsList className="scrollbar-none flex h-auto w-full flex-wrap gap-2">
        {resources.map(({ id, title }) => (
          <TabsTrigger key={id} value={id}>
            {title}
          </TabsTrigger>
        ))}
      </TabsList>

      {resources.map(({ id, title }) => (
        <TabsContent key={id} value={id}>
          <div className="h-40 content-center text-center">{title}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default Resources;
