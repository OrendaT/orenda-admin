import { auth } from '@/auth';
import { resources } from '@/lib/data/resources';
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

  const title = `${findResource(resources, slugify(resource))?.name} | Orenda`;

  return {
    title,
    description: `This page includes all the resources for ${title}`,
  };
}

const ResourcePage = async ({ params }: ResourcePageProps) => {
  const session = await auth();

  if (!isProvider(session?.user.roles)) {
    notFound();
  }

  const { resource } = await params;

  return <ProviderResources id={slugify(resource)} />;
};
export default ResourcePage;
