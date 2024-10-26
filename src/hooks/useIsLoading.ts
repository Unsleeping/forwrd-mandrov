import { useContext } from "react";

import { LoadingContext } from "@/context/context";

export default function useIsLoading() {
  const context = useContext(LoadingContext);
  if (typeof context === "undefined") {
    throw new Error("useIsLoading must be used within a LoadingContext");
  }

  return context;
}
