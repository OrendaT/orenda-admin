import { auth } from '@/auth';
import { AppSidebar } from '@/components/layout/app-sidebar';
import ProviderHeader from '@/components/layout/provider-header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getUserRole } from '@/lib/utils';
import { redirect } from 'next/navigation';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) redirect('/login');

  const { isProvider } = getUserRole(session.user.roles);
  const { roles, teams } = session.user;

  return (
    <SidebarProvider>
      <AppSidebar roles={roles} teams={teams} />
      <main className="clamp-[p,4,8] w-full bg-[#f6f6f6] pb-[1.31rem]">
        <SidebarTrigger className="mb-4 ml-auto md:hidden" />
        {isProvider && <ProviderHeader />}
        {children}
      </main>
    </SidebarProvider>
  );
};
export default AppLayout;
