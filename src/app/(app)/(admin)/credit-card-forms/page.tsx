import { auth } from '@/auth';
import { getTeams } from '@/lib/utils';
import CreditCardForms from '@/modules/admin/credit-card';
import { Teams } from '@/types';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Credit Card Forms',
  description: 'Credit Card Forms page',
};

export default async function CreditCardFormsPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const teams = getTeams(session.user.teams);

  if (!(teams.includes('Billing') || teams.includes('Intake'))) {
    notFound();
  }

  return <CreditCardForms />;
}
