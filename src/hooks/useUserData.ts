import { useContext } from "react";

import { UserDataContext } from "@/context/context";

export default function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataContext");
  }

  return context;
}
