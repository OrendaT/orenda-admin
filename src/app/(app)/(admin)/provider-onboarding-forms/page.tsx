import { auth } from '@/auth';
import { getTeams } from '@/lib/utils';
import CredentialingForms from '@/modules/admin/credentialing';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Provider Onboarding Forms',
  description: 'Provider Onboarding Forms page',
};

export default async function CredentialingFormsPage() {
  const session = await auth();

  if (!session) redirect('/login');

  const teams = getTeams(session.user.teams);
  if (!teams.includes('Credentialing')) notFound();

  return <CredentialingForms />;
}
