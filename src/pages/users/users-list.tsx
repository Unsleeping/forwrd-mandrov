import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import debounce from "debounce";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn, normalizeData, setStorageItem } from "@/lib/utils";
import { LS_AWESOME_DATA_KEY } from "@/lib/constants";
import { formSchema } from "@/lib/schemas";
import { FormType } from "@/lib/types";
import SkeletonRows from "@/components/skeleton-rows";
import { Form } from "@/components/ui/form";
import { VirtualizedList } from "@/components/virtualized-list";
import useIsLoading from "@/hooks/useIsLoading";
import useSetAwesomeData from "@/hooks/useSetAwesomeData";
import useAwesomeData from "@/hooks/useUsers";

// TODO: explain why RHF (useRef instead of useState) is better for decreasing re-renders
// TODO: fix folder structure before submitting
// TODO: check by knip+extension myabe there are unused files

// TODO: disabled save changed, update values into context
// TODO: move norm/nenorm data into its own context???? and rename more properly

// TODO: fix bug with searching after adding a new user

// TODO: make a question about remove+save changes
// TODO: make a question about faster solution or more features
// TODO: make a question about leave TODO or remove it

// TODO: think about remove id if no useFieldArray used

export default function UserList() {
  const awesomeData = useAwesomeData();
  const isLoading = useIsLoading();
  const setUsersData = useSetAwesomeData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFields = awesomeData.originalData.filter((field) => {
    return Object.values(field).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    values: { users: filteredFields },
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });

  const { control } = form;

  const onSubmit = (values: FormType) => {
    const awesomeData = normalizeData(values.users);
    setStorageItem(LS_AWESOME_DATA_KEY, awesomeData);
    setUsersData(awesomeData);
  };

  const handleAddUser = () => {
    const newUser = {
      originalId: uuidv4(),
      name: "",
      country: "Israel",
      email: "",
      phone: "",
    };

    // TODO: if add user and not saved changes, after filtering users added user will be removed
    form.setValue("users", [newUser, ...form.getValues().users]);
  };

  // TODO: remove doesn't work properly
  const handleRemoveUser = (originalId: string) => {
    console.log("🚀 ~ handleRemoveUser ~ originalId:", originalId);
    form.setValue(
      "users",
      form.getValues().users.filter((user) => user.originalId !== originalId)
    );
  };

  const debouncedSearch = useMemo(() => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, [debouncedSearch]);

  return (
    <div className="p-4 h-full">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Users List ({filteredFields.length})
        </h2>
        <Input
          type="text"
          placeholder="Search users..."
          onChange={debouncedSearch}
          className="max-w-60"
        />
      </div>

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
                onRemove={handleRemoveUser}
                itemData={filteredFields}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
