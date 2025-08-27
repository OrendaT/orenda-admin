import { auth } from '@/auth';
import CredentialingForms from '@/modules/admin/credentialing';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Provider Onboarding Forms',
  description: 'Provider Onboarding Forms page',
};

export default async function CredentialingFormsPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <CredentialingForms />;
}
