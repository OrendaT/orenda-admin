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
