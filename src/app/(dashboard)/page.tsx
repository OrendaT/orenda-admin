import { auth } from '@/auth';
import { isProvider } from '@/lib/utils';
import IntakeForm from '@/modules/admin/intake-form';
import ProviderWall from '@/modules/provider/provider-wall';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return isProvider(session.user.roles) ? <ProviderWall /> : <IntakeForm />;
}
