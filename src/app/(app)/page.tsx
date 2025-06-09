import { auth } from '@/auth';
import { findResource, isProvider } from '@/lib/utils';
import IntakeForm from '@/modules/admin/intake-form';
import ProviderResources from '@/modules/provider/resources';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();
  const _isProvider = isProvider(session?.user?.roles || []);

  return {
    title: _isProvider ? 'Policies & Info' : 'Intake Form',
    description: _isProvider ? 'Policies & Info page' : 'Intake Form page',
  };
}

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const _isProvider = isProvider(session.user.roles);

  const resource = findResource('/');

  if (_isProvider && !resource) {
    notFound();
  }
  return _isProvider ? (
    <ProviderResources resource={resource!} />
  ) : (
    <IntakeForm />
  );
}
