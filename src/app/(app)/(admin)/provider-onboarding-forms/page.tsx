import { auth } from '@/auth';
import ProviderOnboardingForms from '@/modules/admin/provider-onboarding';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Provider Onboarding Forms',
  description: 'Provider Onboarding Forms page',
};

export default async function CreditCardFormsPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <ProviderOnboardingForms />;
}
