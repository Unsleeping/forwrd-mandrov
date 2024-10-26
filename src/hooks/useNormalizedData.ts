import { useContext } from "react";

import { NormalizedContext } from "@/context/context";

export default function useNormalizedData() {
  const context = useContext(NormalizedContext);
  if (typeof context === "undefined") {
    throw new Error(
      "useNormalizedData must be used within a NormalizedContext"
    );
  }

  return context;
}
