import React, { createContext } from "react";

import { NormalizedUserData, UserData } from "@/lib/types";
import { getInitialNormalizedData } from "@/lib/utils";

export const UserDataContext = createContext<UserData>([]);

export const SetUserDataContext = createContext<
  React.Dispatch<React.SetStateAction<UserData>>
>(() => {});

export const LoadingContext = createContext<boolean>(false);

export const NormalizedContext = createContext<NormalizedUserData>(
  getInitialNormalizedData()
);

export const SetNormalizedContext = createContext<
  React.Dispatch<React.SetStateAction<NormalizedUserData>>
>(() => {});
