import { UserData } from "@/lib/types";

export const filterUsersBySearchTerm = (
  users: UserData[],
  searchTerm: string
) => {
  return users.filter((field) => {
    return Object.values(field).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};
