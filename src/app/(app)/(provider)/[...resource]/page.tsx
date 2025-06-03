import { auth } from '@/auth';
import { isProvider } from '@/lib/utils';
import ProviderResources from '@/modules/provider/resources';
import { notFound } from 'next/navigation';

const ResourcePage = async () => {
  const session = await auth();

  if (!isProvider(session?.user.roles)) {
    notFound();
  }

  return <ProviderResources />;
};
export default ResourcePage;
