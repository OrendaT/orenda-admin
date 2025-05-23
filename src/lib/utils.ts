import { UserRole } from '@/types';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

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
  link.setAttribute('download', name);
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
export const isProvider = (roles: UserRole[]) =>
  roles.some(
    (role) => typeof role.name === 'string' && /provider/i.test(role.name),
  );
