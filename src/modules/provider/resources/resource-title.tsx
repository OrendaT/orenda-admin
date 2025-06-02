import { resources } from '@/lib/data/resources';
import { cn, findResource } from '@/lib/utils';

const ResourceTitle = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const resource = findResource(resources, id);

  const title = resource?.name;

  return (
    <h1 className={cn('clamp-[text,lg,xl] mb-8 font-semibold', className)}>
      {title}
    </h1>
  );
};
export default ResourceTitle;
