import { auth } from '@/auth';
import { isProvider } from '@/lib/utils';
import IntakeForm from '@/modules/admin/intake-form';
import ProviderResources from '@/modules/provider/resources';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
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

  return isProvider(session.user.roles) ? (
    <ProviderResources />
  ) : (
    <IntakeForm />
  );
}
