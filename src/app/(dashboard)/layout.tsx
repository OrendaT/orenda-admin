import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="clamp-[p,5,8] w-full bg-[#f6f6f6] pb-[1.31rem]">
        <SidebarTrigger className="md:hidden mb-4 ml-auto" />
        {children}
      </main>
    </SidebarProvider>
  );
};
export default DashboardLayout;
