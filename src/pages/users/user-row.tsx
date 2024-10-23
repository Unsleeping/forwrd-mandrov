import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

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
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { memo } from "react";

type UserRowProps = {
  index: number;
  onRemove: () => void;
  style: React.CSSProperties;
};
// TODO: change to id

export const UserRow = memo(({ index, onRemove, style }: UserRowProps) => {
  const { getValues, setValue } = useFormContext();
  const nameKey = `users.${index}.name`;
  const countryKey = `users.${index}.country`;
  const emailKey = `users.${index}.email`;
  const phoneKey = `users.${index}.phone`;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nameKey: string
  ) => {
    setValue(nameKey, e.target.value);
  };
  return (
    <div
      style={style}
      className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 p-4 border-t items-start max-sm:grid-cols-none"
    >
      <FormItem>
        <FormLabel className="max-sm:flex hidden">Name</FormLabel>
        <FormControl>
          <Input
            defaultValue={getValues(nameKey)}
            onChange={(e) => handleChange(e, nameKey)}
            placeholder="Name"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormItem>
        <FormLabel className="max-sm:flex hidden">Country</FormLabel>
        <Select onValueChange={(str) => setValue(nameKey, str)}>
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
        <FormMessage />
      </FormItem>
      <FormItem>
        <FormLabel className="max-sm:flex hidden">Email</FormLabel>
        <FormControl>
          <Input
            defaultValue={getValues(emailKey)}
            onChange={(e) => handleChange(e, emailKey)}
            placeholder="example@email.com"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormItem>
        <FormLabel className="max-sm:flex hidden">Phone</FormLabel>
        <FormControl>
          <Input
            defaultValue={getValues(phoneKey)}
            onChange={(e) => handleChange(e, phoneKey)}
            placeholder="Phone"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
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
});
