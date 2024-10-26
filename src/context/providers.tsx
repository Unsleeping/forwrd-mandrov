import { useState, useEffect } from "react";

import { NormalizedUserData, UserData } from "@/lib/types";
import { getData, normalizeData } from "@/lib/utils";
import {
  UserDataContext,
  LoadingContext,
  SetUserDataContext,
  NormalizedContext,
  SetNormalizedContext,
} from "@/context/context";
import useUserData from "@/hooks/useUserData";

type ProviderProps = {
  children: React.ReactNode;
};

const NormalizedProvider = ({ children }: ProviderProps) => {
  const userData = useUserData();
  const [normalizedData, setNormalizedData] = useState<NormalizedUserData>(
    normalizeData(userData)
  );

  return (
    <NormalizedContext.Provider value={normalizedData}>
      <SetNormalizedContext.Provider value={setNormalizedData}>
        {children}
      </SetNormalizedContext.Provider>
    </NormalizedContext.Provider>
  );
};

const StoreProvider = ({ children }: ProviderProps) => {
  const [userData, setUserData] = useState<UserData>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const asyncFn = async () => {
      try {
        setIsLoading(true);

        const data = await getData(abortController.signal);

        setUserData(data);
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
    <UserDataContext.Provider value={userData}>
      <SetUserDataContext.Provider value={setUserData}>
        <LoadingContext.Provider value={isLoading}>
          {children}
        </LoadingContext.Provider>
      </SetUserDataContext.Provider>
    </UserDataContext.Provider>
  );
};

export const AllContextsProviders = ({ children }: ProviderProps) => {
  return (
    <StoreProvider>
      <NormalizedProvider>{children}</NormalizedProvider>
    </StoreProvider>
  );
};
