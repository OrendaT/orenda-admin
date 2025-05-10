import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getPastDate = (daysAgo: string = '0') => {
  const days = parseInt(daysAgo);

  const date = new Date();
  date.setDate(date.getDate() - (isNaN(days) ? 0 : days));
  return format(date, 'MM-dd-yyyy');
};

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
