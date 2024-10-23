import { useContext } from "react";

import { UsersContext } from "@/context/context";

export default function useUsersContext() {
  return useContext(UsersContext);
}
