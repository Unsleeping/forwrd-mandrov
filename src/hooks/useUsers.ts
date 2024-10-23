import { useContext } from "react";

import { AwesomeDataContext } from "@/context/context";

export default function useAwesomeData() {
  return useContext(AwesomeDataContext);
}
