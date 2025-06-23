import { auth } from '@/auth';
import { AppSidebar } from '@/components/layout/app-sidebar';
import ProviderHeader from '@/components/layout/provider-header';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getUserRole } from '@/lib/utils';
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

  const { role, isProvider } = getUserRole(session.user.roles);

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <main className="clamp-[p,4,8] w-full bg-[#f6f6f6] pb-[1.31rem]">
        <SidebarTrigger className="mb-4 ml-auto md:hidden" />
        {isProvider && <ProviderHeader />}
        {children}
      </main>
    </SidebarProvider>
  );
};
export default DashboardLayout;
