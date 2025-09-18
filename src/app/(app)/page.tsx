import { auth } from '@/auth';
import { findResource, getUserRole } from '@/lib/utils';
import IntakeForms from '@/modules/admin/intake';
import ProviderResources from '@/modules/provider/resources';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();

  const { isProvider } = getUserRole(session?.user?.roles || []);

  return {
    title: isProvider ? 'Policies & Info' : 'Intake Forms',
    description: isProvider ? 'Policies & Info page' : 'Intake Forms page',
  };
}

export default async function Home() {
  const session = await auth();

  if (!session) redirect('/login');

  const { isProvider } = getUserRole(session.user.roles);

  const resource = findResource('/');

  if (isProvider && !resource) notFound();

  return isProvider ? (
    <ProviderResources resource={resource!} />
  ) : (
    <IntakeForms />
  );
}
