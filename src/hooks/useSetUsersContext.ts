import { useContext } from "react";

import { SetUsersContext } from "@/context/context";

export default function useSetUsersContext() {
  return useContext(SetUsersContext);
}
