import { clsx, type ClassValue } from "clsx";
import { v4 as uuidv4 } from "uuid";
import { twMerge } from "tailwind-merge";

import { LS_USERS_KEY } from "@/lib/constants";
import { UserData } from "@/lib/types";
import data from "@/data/initialUsersData.json";

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

function sleep(ms: number, signal?: AbortController["signal"]) {
  return new Promise((resolve, reject) => {
    signal?.addEventListener("abort", async () => {
      reject(new Error("Aborted request"));
    });

    setTimeout(resolve, ms);
  });
}

export async function getData(
  signal: AbortController["signal"]
): Promise<UserData[]> {
  const lsUsers = getStorageItem<UserData[]>(LS_USERS_KEY);
  await sleep(1000);
  if (lsUsers) {
    console.log("Using cached data...");
    return lsUsers;
  }

  console.log("Fetching data from API...");
  // TODO: return to 2000 before prod
  await sleep(100, signal);
  // TODO: normalize data for O(1) lookups
  const dataWithId = data.map((user) => ({ ...user, id: uuidv4() }));
  setStorageItem(LS_USERS_KEY, dataWithId);
  return dataWithId;
}
