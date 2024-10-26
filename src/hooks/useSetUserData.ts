import { useContext } from "react";

import { SetUserDataContext } from "@/context/context";

export default function useSetUserData() {
  const context = useContext(SetUserDataContext);
  if (typeof context === "undefined") {
    throw new Error("useSetUserData must be used within a SetUserDataContext");
  }

  return context;
}
