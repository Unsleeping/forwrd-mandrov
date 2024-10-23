import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { ZodSchemasType } from "@/lib/types";
import { cn, getErrorMessage } from "@/lib/utils";

export const AwesomeInput = ({
  propsedKey,
  schema,
  placeholder,
}: {
  propsedKey: string;
  schema: ZodSchemasType;
  placeholder: string;
}) => {
  const { getValues, setValue } = useFormContext();
  const [error, setError] = useState<string>(
    getErrorMessage(schema, getValues(propsedKey))
  );

  const onChangeFactory =
    (key: string, schema: ZodSchemasType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const errorMessage = getErrorMessage(schema, value);

      if (errorMessage) {
        setError(errorMessage);
      } else if (error) {
        setError("");
      }

      setValue(key, value);
    };

  return (
    <>
      <Input
        defaultValue={getValues(propsedKey)}
        onChange={onChangeFactory(propsedKey, schema)}
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
