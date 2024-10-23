import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { LS_AWESOME_DATA_KEY } from "@/lib/constants";
import {
  AwesomeData,
  NormalizedUserData,
  PopulatedUserData,
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
    byOriginalId: {},
    allOriginalIds: [],
  },
  countries: {
    byOriginalId: {},
    allOriginalIds: [],
  },
};

export function normalizeData(array: PopulatedUserData[]): AwesomeData {
  const normalizedData: NormalizedUserData = INITIAL_NORMALIZED_DATA;

  array.forEach((item) => {
    normalizedData.users.byOriginalId[item.originalId] = {
      originalId: item.originalId,
      name: item.name,
      email: item.email,
      phone: item.phone,
      country: item.country,
    };

    normalizedData.users.allOriginalIds.push(item.originalId);

    if (!normalizedData.countries.allOriginalIds.includes(item.originalId)) {
      normalizedData.countries.byOriginalId[item.originalId] = {
        originalId: item.originalId,
        name: item.country,
      };
      normalizedData.countries.allOriginalIds.push(item.originalId);
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
  // TODO: return to 2000 before prod
  await sleep(100, signal);
  // TODO: normalize data for O(1) lookups
  const dataWithOriginalIds: PopulatedUserData[] = data.map(
    ({ id, ...rest }) => ({
      ...rest,
      originalId: id,
    })
  );
  const awesomeData = normalizeData(dataWithOriginalIds);
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

export const getAllUsers = (
  normalizedData: NormalizedUserData
): PopulatedUserData[] => {
  return normalizedData.users.allOriginalIds.map((originalId) => {
    const user = normalizedData.users.byOriginalId[originalId];
    return user;
  });
};
