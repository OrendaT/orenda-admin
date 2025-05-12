import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

const FormSkeleton = () => {
  return [...Array(10)].map((_, rowIndex) => (
    // rows
    <TableRow className='hover:bg-transparent' key={rowIndex}>
      {Array.from({ length: 5 }).map((_, colIndex) => (
        // cols
        <TableCell key={colIndex}>
          <Skeleton className="h-8 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ));
};
export default FormSkeleton;
