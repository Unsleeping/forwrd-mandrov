import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { LS_AWESOME_DATA_KEY } from "@/lib/constants";
import {
  AwesomeData,
  NormalizedUserData,
  User,
  ZodSchemasType,
} from "@/lib/types";
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

export const INITIAL_NORMALIZED_DATA = {
  users: {
    byId: {},
    allIds: [],
  },
  countries: {
    byId: {},
    allIds: [],
  },
};

export function normalizeData(array: User[]): AwesomeData {
  const normalizedData: NormalizedUserData = INITIAL_NORMALIZED_DATA;

  array.forEach((item) => {
    normalizedData.users.byId[item.id] = {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      country: item.country,
    };

    normalizedData.users.allIds.push(item.id);

    if (!normalizedData.countries.allIds.includes(item.id)) {
      normalizedData.countries.byId[item.id] = {
        id: item.id,
        name: item.country,
      };
      normalizedData.countries.allIds.push(item.id);
    }
  });

  return { normalizedData, originalData: array };
}

export async function getData(
  signal: AbortController["signal"]
): Promise<AwesomeData> {
  const lsUsers = getStorageItem<AwesomeData>(LS_AWESOME_DATA_KEY);
  await sleep(1000);
  if (lsUsers) {
    console.log("Using cached data...");
    return lsUsers;
  }

  console.log("Fetching data from API...");
  await sleep(2000, signal);
  const awesomeData = normalizeData(data);
  setStorageItem<AwesomeData>(LS_AWESOME_DATA_KEY, awesomeData);
  return awesomeData;
}

export const getErrorMessage = (schema: ZodSchemasType, value: string) => {
  const validationResult = schema.safeParse(value);
  if (!validationResult.success) {
    const formatted = validationResult.error.format();
    const errorMessage = formatted._errors.join(", ");
    return errorMessage;
  }
  return "";
};

export const getListSize = () => {
  if (window.innerWidth < 648) {
    return 393;
  }
  return 90;
};
