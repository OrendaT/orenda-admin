import { auth } from '@/auth';
import { isProvider } from '@/lib/utils';
import IntakeForm from '@/modules/admin/intake-form';
import ProviderWall from '@/modules/provider/provider-wall';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  const session = await auth();
  const _isProvider = isProvider(session?.user?.roles || []);

  return {
    title: _isProvider ? 'Provider Wall' : 'Intake Form',
    description: _isProvider ? 'Provider Wall page' : 'Intake Form page',
  };
}

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return isProvider(session.user.roles) ? <ProviderWall /> : <IntakeForm />;
}
