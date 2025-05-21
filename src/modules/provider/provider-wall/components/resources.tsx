import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resources } from '@/lib/app-data';

const Resources = () => {
  return (
    <Tabs>
      <TabsList className="scrollbar-none flex w-full flex-wrap h-auto gap-2">
        {resources.map(({ id, title }) => (
          <TabsTrigger key={id} value={id}>
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
export default Resources;
