import { useContext } from "react";

import { SetUsersContext } from "@/context/context";

export default function useSetUsers() {
  return useContext(SetUsersContext);
}
