import { file } from '@/assets';
import type { ResourceFile } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const ResourceFile = ({
  file: { url, name, image },
}: {
  file: ResourceFile;
}) => {
  return (
    <Link href={url} target="_blank" className="w-full">
      <article className="h-full w-full items-center justify-center overflow-clip rounded-lg border shadow">
        <div className="flex h-28 w-full border-b bg-[#F6F6F6]">
          <Image
            className="size-12 object-center m-auto"
            src={image || file}
            alt="file cover image"
          />
        </div>

        <div className="min-h-[4.5rem] content-center px-4 py-3">
          <h3 className="line-clamp-2 text-sm">{name}</h3>
        </div>
      </article>
    </Link>
  );
};

export default ResourceFile;
