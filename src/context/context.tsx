import { createContext, useState, useEffect } from "react";

import data from "@/data/initialUsersData.json";

type UserData = unknown;

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
  await sleep(2000, signal);
  return data;
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();

    const fn = async () => {
      const data = await getData(abortController.signal);
      setUsersData(data);
    };

    fn();

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
