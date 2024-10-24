import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { cn, normalizeData, persistAwesomeData } from "@/lib/utils";
import { formSchema } from "@/lib/schemas";
import { FormType } from "@/lib/types";
import SkeletonRows from "@/components/skeleton-rows";
import { Form } from "@/components/ui/form";
import { VirtualizedList } from "@/components/virtualized-list";
import useIsLoading from "@/hooks/useIsLoading";
import useSetAwesomeData from "@/hooks/useSetAwesomeData";
import useAwesomeData from "@/hooks/useUsers";
import Search from "@/pages/users/search";
import {
  filterUsersBySearchTerm,
  getErrorsAndEmptyFieldsCount,
} from "@/pages/users/utils";

// ! explain why RHF (useRef instead of useState) is better for decreasing re-renders
// ! explain about why i choose normalization instead of denormalization

// TODO: fix folder structure before submitting
// TODO: check by knip+extension myabe there are unused files

// TODO: - Deploy your code to any platform you wish to be accessible from the web.

// ! explain why i can't control touches for a new row added
// ! Empty string also produces an error, but not at the first render, just after it had some value and it was deleted. So if I just added a new row, and didn't start typing anything, it will not be counted as an error for the error count.

export default function UserList() {
  const awesomeData = useAwesomeData();
  const isLoading = useIsLoading();
  const setAwesomeData = useSetAwesomeData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = filterUsersBySearchTerm(
    awesomeData.originalData,
    searchTerm
  );

  const formValues = { users: filteredUsers };
  const formDefaultValues = formValues;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    values: formValues,
    defaultValues: formDefaultValues,
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });

  const {
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  const onSubmit = (values: FormType) => {
    const awesomeData = normalizeData(values.users);
    persistAwesomeData(awesomeData);
    setAwesomeData(awesomeData);
  };

  const handleAddUser = () => {
    const newUser = {
      id: uuidv4(),
      name: "",
      country: "Israel",
      email: "",
      phone: "",
    };

    // ! explain it
    // ! if add user and not saved changes, after filtering users added user will be removed
    setValue("users", [newUser, ...getValues("users")]);
  };

  const handleRemoveUser = (index: number) => {
    const copyUsers = [...getValues("users")];
    copyUsers.splice(index, 1);
    setValue("users", copyUsers);

    // rerender "index + 1" row which will have "index" after removal
    trigger(`users.${index}`);
  };

  const { emptyFields, invalidFields } = getErrorsAndEmptyFieldsCount(
    formValues.users,
    errors,
    getValues
  );

  const isSavedBtnDisabled = emptyFields !== 0 || invalidFields !== 0;

  return (
    <div className="p-4 h-full">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Users List ({filteredUsers.length})
        </h2>
        <Search setSearchTerm={setSearchTerm} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // 52px = btn+mb
          className="flex flex-col h-[calc(100%-52px)]"
        >
          <p>{`Errors: Empty Fields - ${emptyFields}, Invalid Fields - ${invalidFields}`}</p>
          <Button
            type="submit"
            className="mb-4 w-fit ml-auto"
            disabled={isSavedBtnDisabled}
          >
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
                itemsCount={filteredUsers.length}
                onRemove={handleRemoveUser}
                itemData={filteredUsers}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
