import { useState, useEffect } from "react";

import { UserData } from "@/lib/types";
import { getData } from "@/lib/utils";
import {
  UsersContext,
  SetUsersContext,
  LoadingContext,
} from "@/context/context";

export const StoreProviders = ({ children }: { children: React.ReactNode }) => {
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
    <UsersContext.Provider value={usersData}>
      <SetUsersContext.Provider value={setUsersData}>
        <LoadingContext.Provider value={isLoading}>
          {children}
        </LoadingContext.Provider>
      </SetUsersContext.Provider>
    </UsersContext.Provider>
  );
};
