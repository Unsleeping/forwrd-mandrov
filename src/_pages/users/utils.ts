import { NormalizedUserData, User } from "@/lib/types";

export const filterUsersBySearchTerm = (users: User[], searchTerm: string) => {
  return users.filter((field) => {
    return Object.values(field).some(
      (value) =>
        typeof value === "string" &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

export const getEmptyAndInvalidFieldsCount = (
  normalizedData: NormalizedUserData
) => {
  return Object.values(normalizedData.users.byId).reduce(
    (counts, user) => {
      Object.keys(user).forEach((key) => {
        if (["email", "phone", "name"].includes(key)) {
          if (user[key as "email" | "phone" | "name"].isEmpty) {
            console.log(`${key} is empty for user ${user.id}`);
            counts.emptyFieldsCount++;
          }
          if (user[key as "email" | "phone" | "name"].isInvalid) {
            counts.invalidFieldsCount++;
          }
        }
      });
      return counts;
    },
    { emptyFieldsCount: 0, invalidFieldsCount: 0 }
  );
};
