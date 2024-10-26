import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { memo } from "react";
import { areEqual } from "react-window";

import countries from "@/data/countries.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormType } from "@/lib/types";
import { emailSchema, nameSchema, phoneSchema } from "@/lib/schemas";
import { AwesomeInput } from "@/components/users/awesome-input";

type UserRowProps = {
  index: number;
  onRemove: () => void;
  style: React.CSSProperties;
  rowId: string;
};

export const UserRow = memo<UserRowProps>(
  ({ index, onRemove, style, rowId }) => {
    const { getValues, setValue, control } = useFormContext<FormType>();

    const nameKey = `users.${index}.name` as const;
    const countryKey = `users.${index}.country` as const;
    const emailKey = `users.${index}.email` as const;
    const phoneKey = `users.${index}.phone` as const;

    return (
      <div
        style={style}
        className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 p-4 border-t items-start max-sm:grid-cols-none"
      >
        <FormField
          control={control}
          name={nameKey}
          render={() => (
            <FormItem>
              <FormLabel className="max-sm:flex hidden">Name</FormLabel>
              <FormControl>
                <AwesomeInput
                  inputKey={nameKey}
                  schema={nameSchema}
                  placeholder="Name"
                  rowId={rowId}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={countryKey}
          render={() => (
            <FormItem>
              <FormLabel className="max-sm:flex hidden">Country</FormLabel>
              <Select onValueChange={(str) => setValue(countryKey, str)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={getValues(countryKey)} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={emailKey}
          render={() => (
            <FormItem>
              <FormLabel className="max-sm:flex hidden">Email</FormLabel>
              <FormControl>
                <AwesomeInput
                  inputKey={emailKey}
                  schema={emailSchema}
                  placeholder="example@email.com"
                  rowId={rowId}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={phoneKey}
          render={() => (
            <FormItem>
              <FormLabel className="max-sm:flex hidden">Phone</FormLabel>
              <FormControl>
                <AwesomeInput
                  inputKey={phoneKey}
                  schema={phoneSchema}
                  placeholder="Phone"
                  rowId={rowId}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 max-sm:ml-auto mt-2"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    );
  },
  areEqual
);
