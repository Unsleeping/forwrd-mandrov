import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { ZodSchemasType } from "@/lib/types";
import { cn, getErrorMessage } from "@/lib/utils";
import { useEvent } from "@/hooks/useEvent";
import useSetNormalizedData from "@/hooks/useSetNormalizedData";

type AwesomeInputProps = {
  inputKey: string;
  schema: ZodSchemasType;
  placeholder: string;
  rowId: string;
};

export const AwesomeInput = ({
  inputKey,
  schema,
  placeholder,
  rowId,
}: AwesomeInputProps) => {
  const { getValues, setValue } = useFormContext();
  const setNormalizedData = useSetNormalizedData();
  const [error, setError] = useState<string>(
    getErrorMessage(schema, getValues(inputKey))
  );

  const validate = useEvent((value: string) => {
    const errorMessageOrEmptyString = getErrorMessage(schema, value);
    setError(errorMessageOrEmptyString);

    const isValueInvalid = errorMessageOrEmptyString !== "";
    const isValueEmpty = value === "";

    const correctKey = inputKey.split(".")[2];
    const isInvalid = !isValueEmpty && isValueInvalid;

    console.log(
      `updating user ${rowId} with ${correctKey} isEmpty: ${isValueEmpty} isInvalid: ${isInvalid} value: ${value}`
    );

    // TODO: implement proxy not to mess with destructuring of data
    setNormalizedData((data) => ({
      ...data,
      users: {
        ...data.users,
        byId: {
          ...data.users.byId,
          [rowId]: {
            ...data.users.byId[rowId],
            [correctKey]: {
              value,
              isEmpty: isValueEmpty,
              isInvalid: isInvalid,
            },
          },
        },
      },
    }));
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    validate(value);

    setValue(inputKey, value);
  };

  return (
    <>
      <Input
        defaultValue={getValues(inputKey)}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && (
        <p className={cn("text-[0.8rem] font-medium text-destructive")}>
          {error}
        </p>
      )}
    </>
  );
};
