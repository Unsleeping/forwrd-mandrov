import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import data from "@/data/initialUsersData.json";

// TODO: normalize data for O(1) lookups

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

function sleep(ms: number, signal: AbortController["signal"]) {
  return new Promise((resolve, reject) => {
    signal.addEventListener("abort", async () => {
      reject(new Error("Aborted request"));
    });

    setTimeout(resolve, ms);
  });
}

async function getData(signal: AbortController["signal"]): Promise<UserData[]> {
  // TODO: return to 2000 before prod
  await sleep(100, signal);
  return data.map((user) => ({ ...user, id: uuidv4() }));
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
        {children}
      </SetUsersContext.Provider>
    </UsersContext.Provider>
  );
};
