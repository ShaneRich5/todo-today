import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Task } from '@/lib/interfaces';
import { STATUS } from './constants';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const truncate = (str: string, n: number, trailingString = '...') => {
  return str.length > n ? str.slice(0, n - 1) + trailingString : str;
};

export const organizeTasksByStatus = (tasks: Task[]) => {
  return tasks.sort((a: Task) => {
    if (a.status === STATUS.COMPLETED) {
      return 1;
    } else if (a.status === STATUS.IN_PROGRESS) {
      return 0;
    } else if (a.status === STATUS.TODO) {
      return -1;
    }

    return -1;
  });
};
