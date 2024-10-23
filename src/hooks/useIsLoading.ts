import { useContext } from "react";

import { LoadingContext } from "@/context/context";

export default function useUsers() {
  return useContext(LoadingContext);
}
