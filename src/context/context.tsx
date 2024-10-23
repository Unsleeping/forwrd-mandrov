import React, { createContext } from "react";

import { AwesomeData } from "@/lib/types";
import { INITIAL_NORMALIZED_DATA } from "@/lib/utils";

export const AwesomeDataContext = createContext<AwesomeData>({
  normalizedData: INITIAL_NORMALIZED_DATA,
  originalData: [],
});

export const SetAwesomeDataContext = createContext<
  React.Dispatch<React.SetStateAction<AwesomeData>>
>(() => {});

export const LoadingContext = createContext<boolean>(false);
