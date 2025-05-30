import { WavingHandEmoji } from '@/assets/svgs';
import { auth } from '@/auth';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { isProvider } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <AppSidebar isProvider={isProvider(session.user.roles)} />
      <main className="clamp-[p,4,8] w-full bg-[#f6f6f6] pb-[1.31rem]">
        <SidebarTrigger className="mb-4 ml-auto md:hidden" />
        {isProvider(session.user.roles) && (
          <h1 className="clamp-[text,lg,2xl] clamp-[mb,5,8] flex items-center font-bold">
            Welcome Back {session?.user.name?.split(' ')[0]}{' '}
            <WavingHandEmoji className="ml-2 size-8" />
          </h1>
        )}
        {children}
      </main>
    </SidebarProvider>
  );
};
export default DashboardLayout;
