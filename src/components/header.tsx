import { site_logo } from '@/assets';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="clamp-[left,2,6] clamp-[top,2,4] fixed">
      <div className="clamp-[w,24,8.25rem]">
        <Image
          className="object-contain"
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
