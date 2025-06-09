import { auth } from '@/auth';
import { findResource, isProvider, slugify } from '@/lib/utils';
import ProviderResources from '@/modules/provider/resources';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ResourcePageProps {
  params: Promise<{ resource?: string[] }>;
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { resource } = await params;

  const title = `${findResource(slugify(resource))?.name} | Orenda Admin`;

  return {
    title,
    description: `This page includes all the resources for ${title.split(' | ')[0]}`,
  };
}

const ResourcePage = async ({ params }: ResourcePageProps) => {
  const session = await auth();

  if (!isProvider(session?.user.roles)) {
    notFound();
  }

  const { resource } = await params;

  const id = slugify(resource);

  const foundResource = findResource(id);

  if (!foundResource) {
    notFound();
  }

  return <ProviderResources resource={foundResource} />;
};
export default ResourcePage;
