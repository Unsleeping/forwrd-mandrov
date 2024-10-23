import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import data from "@/data/initialUsersData.json";
import { getStorageItem, setStorageItem } from "@/lib/utils";
import { LS_USERS_KEY } from "@/lib/constants";
import { SidebarProvider } from "@/components/ui/sidebar";

type UserData = {
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
};

export const UsersContext = createContext<{
  usersData: UserData[];
  isLoading: boolean;
}>({
  usersData: [],
  isLoading: false,
});

export const SetUsersContext = createContext<{
  setUsersData: React.Dispatch<React.SetStateAction<UserData[]>>;
}>({
  setUsersData: () => {},
});

function sleep(ms: number, signal?: AbortController["signal"]) {
  return new Promise((resolve, reject) => {
    signal?.addEventListener("abort", async () => {
      reject(new Error("Aborted request"));
    });

    setTimeout(resolve, ms);
  });
}

async function getData(signal: AbortController["signal"]): Promise<UserData[]> {
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

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const asyncFn = async () => {
      try {
        setIsLoading(true);
        const data = await getData(abortController.signal);
        setUsersData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    asyncFn();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    // TODO: maybe release isLoading into its own context
    <UsersContext.Provider value={{ usersData, isLoading }}>
      <SetUsersContext.Provider value={{ setUsersData }}>
        <SidebarProvider>{children}</SidebarProvider>
      </SetUsersContext.Provider>
    </UsersContext.Provider>
  );
};
