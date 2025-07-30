import { auth } from '@/auth';
import CreditCardForms from '@/modules/admin/credit-card';
import { Metadata } from 'next';
import {  redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Credit Card Forms',
  description: 'Credit Card Forms page',
};

export default async function CreditCardFormsPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <CreditCardForms />;
}


