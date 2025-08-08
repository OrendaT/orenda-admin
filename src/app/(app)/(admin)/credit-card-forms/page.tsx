import { auth } from '@/auth';
import BillingForms from '@/modules/admin/billing';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Billing Forms',
  description: 'Billing Forms page',
};

export default async function BillingFormsPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <BillingForms />;
}
