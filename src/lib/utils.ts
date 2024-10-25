import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { LS_USER_DATA_KEY } from "@/lib/constants";
import {
  UserData,
  NormalizedUserData,
  User,
  ZodSchemasType,
} from "@/lib/types";
import data from "@/data/initialUsersData.json";
import { emailSchema, nameSchema, phoneSchema } from "./schemas";

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

export function normalizeData(array: User[]): NormalizedUserData {
  const normalizedData: NormalizedUserData = INITIAL_NORMALIZED_DATA;

  array.forEach((item) => {
    if (!normalizedData.users.allIds.includes(item.id)) {
      normalizedData.users.byId[item.id] = {
        id: item.id,
        country: item.country,
        name: {
          value: item.name,
          isEmpty: item.name === "",
          isInvalid:
            item.name !== "" && !nameSchema.safeParse(item.name).success,
        },
        email: {
          value: item.email,
          isEmpty: item.email === "",
          isInvalid:
            item.email !== "" && !emailSchema.safeParse(item.email).success,
        },
        phone: {
          value: item.phone,
          isEmpty: item.phone === "",
          isInvalid:
            item.phone !== "" && !phoneSchema.safeParse(item.phone).success,
        },
      };

      normalizedData.users.allIds.push(item.id);
    }

    if (!normalizedData.countries.allIds.includes(item.id)) {
      normalizedData.countries.byId[item.id] = {
        id: item.id,
        name: item.country,
      };
      normalizedData.countries.allIds.push(item.id);
    }
  });

  return normalizedData;
}

export const persistUserData = (data: UserData) => {
  setStorageItem<UserData>(LS_USER_DATA_KEY, data);
};

export async function getData(
  signal: AbortController["signal"]
): Promise<UserData> {
  const lsUsers = getStorageItem<UserData>(LS_USER_DATA_KEY);
  await sleep(1000);
  if (lsUsers) {
    console.log("Using cached data...");
    return lsUsers;
  }

  console.log("Fetching data from API...");
  await sleep(2000, signal);
  persistUserData(data);
  return data;
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
