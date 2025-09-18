import {
  SidebarMenuItem,
  Resource,
  ResourceFile,
  ResourceFolder,
} from '@/types';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { format, startOfDay } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { resources } from '../data/resources';

export * from './auth';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * @function getPastDate
 *@description this takes number of days and returns the
 * date from the current date (today)
 */
export const getPastDate = (daysAgo: string = '0') => {
  const days = parseInt(daysAgo);
  const today = startOfDay(new Date());

  const date = new Date(today);
  date.setDate(date.getDate() - (isNaN(days) ? 0 : days));

  return format(date, 'MM-dd-yyyy');
};

export const downloadFileFromUrl = async (
  { name, url }: { name: string; url: string },
  callback?: () => void,
) => {
  const res = await axios.get(url, {
    responseType: 'blob',
  });

  downloadFile({ name, file: res.data }, callback);
};

/**
 * @function downloadFile
 * @description this takes a name and url, then proceeds to
 * download that file. it optionally takes a callback function
 * that runs after the file has been downloaded
 */
export const downloadFile = (
  { name, file }: { name: string; file: Blob | File },
  callback?: () => void,
) => {
  const fileUrl = URL.createObjectURL(file);

  // create and click link
  const link = document.createElement('a');
  link.href = fileUrl;
  link.setAttribute('download', `${name}.zip`);
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(fileUrl);

  // run callback function
  callback?.();
};

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

    // Search subfolders recursively
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
  hidden: boolean,
): SidebarMenuItem => {
  const items: SidebarMenuItem[] = resources.map(
    ({ id, name, title, Icon, resources }) => {
      const item: SidebarMenuItem = {
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
    hidden,
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
