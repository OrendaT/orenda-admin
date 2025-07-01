import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { announcements } from '@/lib/data/announcements';
import { IoMegaphoneOutline } from 'react-icons/io5';

const Announcements = () => {
  return (
    <Dialog>
      <DialogTrigger className="clamp-[p,1.5,2] rounded-lg border border-zinc-600">
        <IoMegaphoneOutline className="size-5" />
        <span className="sr-only">Announcements</span>
      </DialogTrigger>

      <DialogContent className="pb-10">
        <DialogHeader>
          <DialogTitle>Announcements</DialogTitle>
          <DialogDescription>View important announcements</DialogDescription>
        </DialogHeader>

        <hr className="mx-auto w-1/3 border-gray-700" />

        <ul className="divide-y">
          {announcements.length ? (
            announcements.map(({ id, message }) => (
              <li className="py-2 text-sm" key={id}>
                {message}
              </li>
            ))
          ) : (
            <li className="text-center clamp-[text,sm,base]">
             No announcements</li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
export default Announcements;
