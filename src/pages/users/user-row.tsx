import { Trash2 } from "lucide-react";
import { Control } from "react-hook-form";

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
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormType } from "@/lib/types";

type UserRowProps = {
  formControl: Control<FormType>;
  index: number;
  onRemove: () => void;
};
// TODO: change to id

export const UserRow = ({ formControl, index, onRemove }: UserRowProps) => {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 p-4 border-t items-center">
      <FormField
        control={formControl}
        name={`users.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder="Name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formControl}
        name={`users.${index}.country`}
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={field.value} />
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
        )}
      />
      <FormField
        control={formControl}
        name={`users.${index}.email`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder="Email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formControl}
        name={`users.${index}.phone`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input {...field} placeholder="Phone" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
};
