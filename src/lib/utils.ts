import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStorageItem = <T = string>(key: string): T | undefined => {
  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return undefined;
    }

    return JSON.parse(item);
  } catch {
    return undefined;
  }
};

export const setStorageItem = <T = unknown>(key: string, value: T) => {
  try {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
    // eslint-disable-next-line no-empty
  } catch {}
};
