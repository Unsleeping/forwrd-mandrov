import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { ZodSchemasType } from "@/lib/types";
import { cn, getErrorMessage } from "@/lib/utils";

type AwesomeInputProps = {
  inputKey: string;
  schema: ZodSchemasType;
  placeholder: string;
};

export const AwesomeInput = ({
  inputKey,
  schema,
  placeholder,
}: AwesomeInputProps) => {
  const { getValues, setValue } = useFormContext();
  const [error, setError] = useState<string>(
    getErrorMessage(schema, getValues(inputKey))
  );

  const validate = (value: string) => {
    const errorMessageOrEmptyString = getErrorMessage(schema, value);
    setError(errorMessageOrEmptyString);
  };

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
      {/* TODO: think about more beautiful display the error */}
      {error && (
        <p className={cn("text-[0.8rem] font-medium text-destructive")}>
          {error}
        </p>
      )}
    </>
  );
};
