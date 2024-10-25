import { useContext } from "react";

import { LoadingContext } from "@/context/context";

export default function useIsLoading() {
  return useContext(LoadingContext);
}
