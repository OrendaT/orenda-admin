import { MenuItem, Resource, ResourceFile, ResourceFolder } from '@/types';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { resources } from '../data/resources';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * @function getPastDate
 *@description this takes number of days and returns the
 * date from the current date (today)
 */

export const getPastDate = (daysAgo: string = '0') => {
  const days = parseInt(daysAgo);

  const date = new Date();
  date.setDate(date.getDate() - (isNaN(days) ? 0 : days));
  return format(date, 'MM-dd-yyyy');
};

/**
 * @function downloadFile
 * @description this takes a name and url, then proceeds to
 * download that file. it optionally takes a callback function
 * that runs after the file has been downloaded
 */
export const downloadFile = async (
  { name, url }: { name: string; url: string },
  callback?: () => void,
) => {
  // create blob
  const res = await axios.get(url, {
    responseType: 'blob',
  });
  const blob = new Blob([res.data], { type: res.data.type });
  const blobUrl = URL.createObjectURL(blob);

  // create and click link
  const link = document.createElement('a');
  link.href = blobUrl;
  link.setAttribute('download', `${name}.zip`);
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);

  // run callback function
  callback?.();
};

/**
 * @function isProvider
 * @description takes the role from the session
 * and checks whether the user is a provider
 * or not (admin|super_admin)
 */
export const isProvider = (roles?: string[]) =>
  roles?.some((role) => /provider/i.test(role));

export const findResource = (id: string) => {
  // First, check if the id matches any top-level Resource
  for (const res of resources) {
    if (res.id === id) {
      return res;
    }

    const folder = searchNested(res.resources);
    if (folder) return folder;
  }

  function searchNested(items: ResourceFolder[] | ResourceFile[]) {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
    }

    //   // Search subfolders recursively
    //   const folder = item as ResourceFolder;
    //   if (folder.sub_folders) {
    //     const found = searchNested(folder.sub_folders, id);
    //     if (found) return found;
    //   }

    //   // Also check files inside the folder
    //   const foundFile = searchNested(folder.files, id);
    //   if (foundFile) return foundFile;
  }
};

export const convertResourcesToMenu = (
  resources: Resource[],
): { id: string; title: string; items: MenuItem[] } => {
  const items: MenuItem[] = resources.map(
    ({ id, name, title, Icon, resources }) => {
      const item: MenuItem = {
        id,
        title: title || name,
        href: id,
        Icon,
      };

      // If this resource has folders, convert them
      const subFolders = resources.filter(
        (r: ResourceFolder | ResourceFile) => 'resources' in r,
      ) as ResourceFolder[];
      if (subFolders.length) {
        item.items = subFolders.map(({ id, name, title }) => ({
          id,
          title: title || name,
          href: id,
        }));
      }

      return item;
    },
  );

  return {
    id: 'resources',
    title: 'Resources',
    items,
  };
};

export const slugify = (routes?: string[]): string => {
  if (!routes || !routes.length) return '/';
  
  let slug = '';

  routes.forEach((route) => {
    slug += `/${route}`;
  });

  return slug;
};
