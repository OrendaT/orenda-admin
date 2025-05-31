import { WavingHandEmoji } from '@/assets/svgs';
import { auth } from '@/auth';
import Announcements from '@/modules/provider/announcements';

const ProviderHeader = async () => {
  const session = await auth();
  return (
    <div className="clamp-[mb,5,8] flex items-center justify-between">
      <h1 className="clamp-[text,xl,2xl] flex items-center font-bold">
        Welcome Back {session?.user.name?.split(' ')[0]}{' '}
        <WavingHandEmoji className="ml-2 size-8" />
      </h1>

      <Announcements />
    </div>
  );
};
export default ProviderHeader;
