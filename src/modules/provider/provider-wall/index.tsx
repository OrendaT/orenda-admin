import { auth } from '@/auth';

const ProviderWall = async () => {
  const session = await auth();
  return (
    <div>
      <h1 className="clamp-[text,xl,1.75rem] clamp-[mb,5,8] font-bold capitalize">
        Welcome Back {session?.user.name?.split(' ')[0]} 👋
      </h1>

      <div className="flex w-full flex-col gap-4 *:w-full xl:flex-row">
        <div className="grid gap-4">
          <section className="db_section">
            <h2 className="heading">{session?.user?.name}</h2>
          </section>
          <section className="db_section">
            <h2 className="heading">Resources</h2>
          </section>
        </div>

        <aside className="db_section xl:max-w-[35%]">
          <h2 className="heading">Announcements</h2>
        </aside>
      </div>
    </div>
  );
};
export default ProviderWall;
