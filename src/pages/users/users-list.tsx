import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserRoundPlus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import debounce from "debounce";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn, setStorageItem } from "@/lib/utils";
import { LS_USERS_KEY } from "@/lib/constants";
import { formSchema } from "@/lib/schemas";
import { FormType } from "@/lib/types";
import SkeletonRows from "@/components/skeleton-rows";
import { Form } from "@/components/ui/form";
import { VirtualizedList } from "@/components/virtualized-list";
import useUsers from "@/hooks/useUsers";
import useSetUsers from "@/hooks/useSetUsers";
import useIsLoading from "@/hooks/useIsLoading";

// TODO: explain why RHF (useRef instead of useState) is better for decreasing re-renders
// TODO: fix folder structure before submitting

// TODO: disabled save changed, update values into context

export default function UserList() {
  const usersData = useUsers();
  const isLoading = useIsLoading();
  const setUsersData = useSetUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    values: { users: usersData },
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });

  const { control } = form;

  const { fields, remove, prepend } = useFieldArray({
    control,
    name: "users",
  });

  const onSubmit = (values: FormType) => {
    setStorageItem(LS_USERS_KEY, values.users);
    setUsersData(values.users);
  };

  const handleAddUser = () => {
    prepend({
      id: uuidv4(),
      name: "",
      country: "Israel",
      email: "",
      phone: "",
    });
  };

  // const errorCounts = watchedUsers.reduce(
  //   (acc, user, index) => {
  //     Object.keys(user).forEach((key) => {
  //       if (key !== "id" && errors.users?.[index]?.[key as keyof User]) {
  //         if (user[key as keyof User] === "") {
  //           acc.emptyFields++;
  //         } else {
  //           acc.invalidFields++;
  //         }
  //       }
  //     });
  //     return acc;
  //   },
  //   { emptyFields: 0, invalidFields: 0 }
  // );

  const filteredFields = fields.filter((field) =>
    Object.values(field).some((value) => {
      const res = value
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (res) {
        // console.log("true, field, value", field, value);
      }
      return res;
    })
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("setting searchTerm to: ", e.target.value);
    setSearchTerm(e.target.value);
  };

  const debouncedSearch = useMemo(() => {
    return debounce(handleSearch, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, [debouncedSearch]);

  return (
    <div className="p-4 h-full">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users List ({fields.length})</h2>
        <Input
          type="text"
          placeholder="Search users..."
          onChange={debouncedSearch}
          className="max-w-60"
        />
      </div>

      {/* <div className="mt-4 mb-4">
        Errors: Empty Fields - {errorCounts.emptyFields}, Invalid Fields -{" "}
        {errorCounts.invalidFields}
      </div> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // 52px = btn+mb
          className="flex flex-col h-[calc(100%-52px)]"
        >
          <Button type="submit" className="mb-4 w-fit ml-auto">
            Save Changes
          </Button>
          <div
            className={cn(
              "border rounded-lg grid grid-rows-[auto_1fr]",
              !isLoading && "h-full"
            )}
          >
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 bg-gray-100 p-4 font-semibold items-center max-sm:grid-cols-[1fr_1fr]">
              <div className="hidden max-sm:flex">Users Table</div>
              <div className="ml-2 max-sm:hidden">Name</div>
              <div className="ml-2 max-sm:hidden">Country</div>
              <div className="ml-2 max-sm:hidden">Email</div>
              <div className="ml-2 max-sm:hidden">Phone</div>
              <Button
                onClick={handleAddUser}
                className="p-3 max-sm:ml-auto"
                variant="outline"
              >
                <UserRoundPlus className="w-4 h-4" />
              </Button>
            </div>
            {isLoading ? (
              <SkeletonRows />
            ) : (
              <VirtualizedList
                control={control}
                itemsCount={filteredFields.length}
                onRemove={remove}
                itemData={filteredFields}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
