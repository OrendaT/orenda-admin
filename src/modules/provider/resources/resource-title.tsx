import { cn } from '@/lib/utils';

const ResourceTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1 className={cn('clamp-[text,lg,xl] mb-8 font-semibold', className)}>
      {title}
    </h1>
  );
};
export default ResourceTitle;
