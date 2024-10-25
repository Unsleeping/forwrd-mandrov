import { useContext } from "react";

import { SetNormalizedContext } from "@/context/context";

export default function useSetNormalizedData() {
  const context = useContext(SetNormalizedContext);
  if (!context) {
    throw new Error(
      "useSetNormalizedData must be used within a SetNormalizedContext"
    );
  }
  return context;
}
