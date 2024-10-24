import { FieldErrors } from "react-hook-form";

import { FormType, User } from "@/lib/types";

export const filterUsersBySearchTerm = (users: User[], searchTerm: string) => {
  return users.filter((field) => {
    return Object.values(field).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

export const getErrorsAndEmptyFieldsCount = (
  users: User[],
  errors: FieldErrors<FormType>,
  getValues: (key: string) => string
) => {
  return users.reduce(
    (acc, user, index) => {
      Object.keys(user).forEach((key) => {
        if (errors.users?.[index]?.[key as keyof User]) {
          if (getValues(`users.${index}.${key as keyof User}`) === "") {
            acc.emptyFields++;
          } else {
            acc.invalidFields++;
          }
        }
      });
      return acc;
    },
    { emptyFields: 0, invalidFields: 0 }
  );
};
