import React, { createContext } from "react";

import { UserData } from "@/lib/types";

export const UsersContext = createContext<UserData[]>([]);

export const SetUsersContext = createContext<
  React.Dispatch<React.SetStateAction<UserData[]>>
>(() => {});

export const LoadingContext = createContext<boolean>(false);
