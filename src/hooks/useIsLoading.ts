import { useContext } from "react";

import { LoadingContext } from "@/context/context";

export default function useIsLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useIsLoading must be used within a LoadingContext");
  }

  return context;
}
