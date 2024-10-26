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

  // !explain that it is a techical decision to choose less cohesion between input and react to reduce rerenders that's why sometimes errors appears only after blur

  // !explain that only required fields errors can be uncounted after successful entering a valid value, invalid fields are counted after blur only
  // TODO: explain use event, change to normalized event
  const validate = useEvent((value: string) => {
    const errorMessageOrEmptyString = getErrorMessage(schema, value);
    // ! explain: if user fix errors while entering a valid value, we clear errors, but counter will happen only when onBlur will happen
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

  // ! explain (to count invalid/error existed fields on blur)
  // ! existed fields can be counted as empty or invalid only after rerender, if i use trigger to validate form/form field it cause rerender fields and lose focus, also i don't handle refs to focus() programmatically so i will lose focus, only 1 place with a great UX (not to lose focus within validation and error/empty counting) is triggering rerendering on blur

  return (
    <>
      <Input
        defaultValue={getValues(inputKey)}
        onChange={onChange}
        placeholder={placeholder}
      />
      {/* TODO: think about more beautiful display the error */}
      {error && (
        <p className={cn("text-[0.8rem] font-medium text-destructive")}>
          {error}
        </p>
      )}
    </>
  );
};
