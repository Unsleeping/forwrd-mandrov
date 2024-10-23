import { useContext } from "react";

import { UsersContext } from "@/context/context";

export default function useUsers() {
  return useContext(UsersContext);
}
