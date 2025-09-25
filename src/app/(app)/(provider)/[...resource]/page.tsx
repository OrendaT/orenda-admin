import { auth } from '@/auth';
import { resources } from '@/lib/data';
import { findResource, getUserRole, slugify } from '@/lib/utils';
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

  const title = `${findResource(slugify(resource))?.name} | Orenda Portal`;

  return {
    title,
    description: `This page includes all the resources for ${title.split(' | ')[0]}`,
  };
}

export async function generateStaticParams() {
  // collect all ids recursively (Resource, ResourceFolder, ResourceFile)
  function collectIds(
    nodes: typeof resources | (typeof resources)[number]['resources'],
  ): string[] {
    const ids: string[] = [];

    for (const node of nodes) {
      if (node.id) {
        ids.push(node.id);
      }

      if ('resources' in node && Array.isArray(node.resources)) {
        ids.push(...collectIds(node.resources));
      }
    }

    return ids;
  }

  const allIds = collectIds(resources);

  return allIds
    .filter((id) => id.trim() !== '' && id !== '/') // filter out root
    .map((id) => ({
      resource: id.replace(/^\/+/, '').split('/'),
    }));
}

const ResourcePage = async ({ params }: ResourcePageProps) => {
  const session = await auth();
  const { isProvider } = getUserRole(session?.user.roles);

  if (!isProvider) notFound();

  const { resource } = await params;
  const id = slugify(resource);

  const foundResource = findResource(id);
  if (!foundResource) notFound();

  return <ProviderResources resource={foundResource} />;
};
export default ResourcePage;
