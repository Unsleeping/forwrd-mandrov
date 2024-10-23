"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useUsersContext from "@/hooks/useUsersContext";
// import useSetUsersContext from "@/hooks/useSetUsersContext";

//TODO: remove unused shadcn components

const countries = [
  "USA",
  "Canada",
  "UK",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Brazil",
  "India",
  "China",
];

const userSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z]+$/, "Name should only include letters"),
  country: z.enum(countries as [string, ...string[]], {
    required_error: "Country is required",
  }),
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (email) => email.split("@").length === 2,
      "Email must contain exactly one '@' character"
    ),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(/^\+[^+]*$/, "Phone must start with '+' and contain only one '+'"),
});

type User = z.infer<typeof userSchema>;

const usersSchema = z.array(userSchema);

export default function UserList() {
  const { usersData, isLoading } = useUsersContext();
  console.log("🚀 ~ UserList ~ usersData:", usersData);
  // const setUsersData = useSetUsersContext();
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<{ users: User[] }>({
    resolver: zodResolver(usersSchema),
    values: { users: usersData },
  });
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    watch,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  // useEffect(() => {
  //   // Simulating data loading
  //   setTimeout(() => {
  //     const savedUsers = localStorage.getItem("users");
  //     if (savedUsers) {
  //       setUsersData(JSON.parse(savedUsers));
  //       reset({ users: JSON.parse(savedUsers) });
  //     }
  //     setIsLoading(false);
  //   }, 1000);
  // }, [reset]);

  const onSubmit: SubmitHandler<{ users: User[] }> = (data) => {
    // setUsersData(data.users);
    localStorage.setItem("users", JSON.stringify(data.users));
    reset(data, { keepValues: true });
  };

  const handleAddUser = () => {
    append({
      id: uuidv4(),
      name: "",
      country: "USA",
      email: "",
      phone: "",
    });
  };

  const watchedUsers = watch("users");

  const errorCounts = watchedUsers.reduce(
    (acc, user, index) => {
      Object.keys(user).forEach((key) => {
        if (key !== "id" && errors.users?.[index]?.[key as keyof User]) {
          if (user[key as keyof User] === "") {
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

  const filteredFields = fields.filter((field) =>
    Object.values(field).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // TODO: add skeleton
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users List ({fields.length})</h2>
        <Button onClick={handleAddUser} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add User
        </Button>
      </div>
      <Input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 bg-gray-100 p-4 font-semibold">
              <div>Name</div>
              <div>Country</div>
              <div>Email</div>
              <div>Phone</div>
              <div></div>
            </div>
            {filteredFields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 p-4 border-t items-center"
              >
                <FormField
                  control={form.control}
                  name={`users.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Name" value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name={`users.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`users.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Phone" value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 mb-4">
            Errors: Empty Fields - {errorCounts.emptyFields}, Invalid Fields -{" "}
            {errorCounts.invalidFields}
          </div>
          <Button
            type="submit"
            disabled={
              Object.keys(errors).length > 0 ||
              Object.keys(dirtyFields).length === 0
            }
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
