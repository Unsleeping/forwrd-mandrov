import { useContext } from "react";

import { SetAwesomeDataContext } from "@/context/context";

export default function useSetAwesomeData() {
  return useContext(SetAwesomeDataContext);
}
