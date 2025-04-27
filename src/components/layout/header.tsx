import { site_logo } from '@/assets';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={cn('clamp-[ps,5,3.37rem] top-0 clamp-[pt,4,7] fixed w-full', className)}>
      <div className="clamp-[w,24,6.25rem] h-[2.25rem] bg-white">
        <Image
          className="object-contain "
          width={500}
          src={site_logo}
          alt="Orenda Psychiatry"
          priority
        />
      </div>
    </header>
  );
};
export default Header;
