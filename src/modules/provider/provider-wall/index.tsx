import { WavingHandEmoji } from '@/assets/svgs';
import { auth } from '@/auth';

import Resources from './components/resources';
import { announcements } from '@/lib/data/announcements';

const ProviderWall = async () => {
  const session = await auth();
  return (
    <div>
      <h1 className="clamp-[text,lg,1.75rem] clamp-[mb,5,8] flex items-center font-bold capitalize">
        Welcome Back {session?.user.name?.split(' ')[0]}{' '}
        <WavingHandEmoji className="ml-2 size-8" />
      </h1>

      <div className="flex w-full flex-col gap-4 *:w-full lg:flex-row">
        <div className="flex flex-col gap-4">
          {/* <section className="db_section">
            <div className="flex items-center gap-[0.62rem]">
              <div className="grid size-14 place-items-center overflow-hidden rounded-full border">
                <LuUser className="text-muted-foreground size-8" />
              </div>

              <h2 className="heading mb-0">{session?.user?.name}</h2>
            </div>
          </section> */}
          <section className="db_section">
            <h2 className="heading mb-4">Resources</h2>
            <Resources />
          </section>
        </div>

        <aside className="db_section lg:max-w-[clamp(0rem,_35%,_23.31rem)]">
          <h2 className="heading mb-4">Announcements</h2>

          <ul className="scrollbar-none divide-y divide-[#E7E7E7] lg:max-h-[calc(100vh-14.5rem)] lg:overflow-y-auto">
            {announcements.map(({ id, message }) => (
              <li key={id} className="py-6 pe-5 text-sm first:pt-2">
                {message}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};
export default ProviderWall;
