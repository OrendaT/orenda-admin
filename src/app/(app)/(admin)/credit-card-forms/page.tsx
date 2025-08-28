import { auth } from '@/auth';
import { getTeams } from '@/lib/utils';
import BillingForms from '@/modules/admin/billing';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Credit Card Forms',
  description: 'Credit Card Forms page',
};

export default async function BillingFormsPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const teams = getTeams(session.user.teams);

  if (!(teams.includes('Billing') || teams.includes('Intake'))) {
    notFound();
  }

  return <BillingForms />;
}
