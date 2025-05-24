import { cover_image } from '@/assets';
import type { ResourceFile } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const ResourceFile = ({ file: { url, file_name } }: { file: ResourceFile }) => {
  return (
    <Link href={url} target="_blank" className="w-full max-w-64">
      <article className="h-full w-full items-center justify-center overflow-clip rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)]">
        <div className="clamp-[h,24,20] flex w-full bg-[#F6F6F6]">
          <Image
            className="size-full object-contain object-center"
            src={cover_image}
            alt="file cover image"
          />
        </div>

        <div className="min-h-[4.94rem] content-center px-2 py-4">
          <h3 className="line-clamp-2 text-sm">{file_name}</h3>
        </div>
      </article>
    </Link>
  );
};

export default ResourceFile;
