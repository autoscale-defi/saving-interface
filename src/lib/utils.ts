import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useIsFirefox = () => {
  const isFirefox = React.useMemo(() => {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }, []);

  return isFirefox;
};
