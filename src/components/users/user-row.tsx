import { Trash2 } from "lucide-react";
import { Control, useFormContext } from "react-hook-form";

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
  formControl: Control<FormType>;
};

export const UserRow = ({
  index,
  onRemove,
  style,
  formControl,
}: UserRowProps) => {
  const { getValues, setValue } = useFormContext();

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
        control={formControl}
        name={nameKey}
        render={() => (
          <FormItem>
            <FormLabel className="max-sm:flex hidden">Name</FormLabel>
            <FormControl>
              <AwesomeInput
                inputKey={nameKey}
                schema={nameSchema}
                placeholder="Name"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={formControl}
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
        control={formControl}
        name={emailKey}
        render={() => (
          <FormItem>
            <FormLabel className="max-sm:flex hidden">Email</FormLabel>
            <FormControl>
              <AwesomeInput
                inputKey={emailKey}
                schema={emailSchema}
                placeholder="example@email.com"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={formControl}
        name={phoneKey}
        render={() => (
          <FormItem>
            <FormLabel className="max-sm:flex hidden">Phone</FormLabel>
            <FormControl>
              <AwesomeInput
                inputKey={phoneKey}
                schema={phoneSchema}
                placeholder="Phone"
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
};
