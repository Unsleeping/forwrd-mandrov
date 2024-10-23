import { useState, useEffect } from "react";

import { AwesomeData } from "@/lib/types";
import { getData, INITIAL_NORMALIZED_DATA } from "@/lib/utils";
import {
  AwesomeDataContext,
  LoadingContext,
  SetAwesomeDataContext,
} from "@/context/context";

export const StoreProviders = ({ children }: { children: React.ReactNode }) => {
  const [awesomeData, setAwesomeData] = useState<AwesomeData>({
    normalizedData: INITIAL_NORMALIZED_DATA,
    originalData: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const asyncFn = async () => {
      try {
        setIsLoading(true);

        const data = await getData(abortController.signal);

        setAwesomeData(data);
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
    <AwesomeDataContext.Provider value={awesomeData}>
      <SetAwesomeDataContext.Provider value={setAwesomeData}>
        <LoadingContext.Provider value={isLoading}>
          {children}
        </LoadingContext.Provider>
      </SetAwesomeDataContext.Provider>
    </AwesomeDataContext.Provider>
  );
};
