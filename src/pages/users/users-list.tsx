import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
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
import Search from "@/pages/users/search";
import { filterUsersBySearchTerm, getErrorsAndEmptyFieldsCount } from "./utils";

// TODO: explain why RHF (useRef instead of useState) is better for decreasing re-renders
// TODO: explain about why i choose normalization instead of denormalization

// TODO: fix folder structure before submitting
// TODO: check by knip+extension myabe there are unused files

// TODO: fix bug with searching after adding a new user

// TODO: Empty string also produces an error, but not at the first render, just after it had some value and it was deleted. So if I just added a new row, and didn't start typing anything, it will not be counted as an error for the error count.

// TODO: Render a separate container beneath the users container and above the save button, which includes information counting the error types, like so: (you can design this as you wish) `"Errors: Empty Fields - 2, Invalid Fields - 5"`

// TODO:   - Save button should be disabled if there is at least one error, or if there is at least one empty field (on blur on a new row - empty fields are marked as error)

// TODO: - Successful save => updates the shared global state (as mentioned before) and local error states should be reset

// TODO - Pay attention when you implement row deletion, take care also of it's errors if it had any.

// TODO: - Deploy your code to any platform you wish to be accessible from the web.

//TODO: if country counts more, what do with color?

export default function UserList() {
  const awesomeData = useAwesomeData();
  const isLoading = useIsLoading();
  const setUsersData = useSetAwesomeData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = filterUsersBySearchTerm(
    awesomeData.originalData,
    searchTerm
  );

  const formValues = { users: filteredUsers };

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    values: formValues,
    defaultValues: formValues,
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });

  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = (values: FormType) => {
    const awesomeData = normalizeData(values.users);
    setStorageItem(LS_AWESOME_DATA_KEY, awesomeData);
    setUsersData(awesomeData);
  };

  const handleAddUser = () => {
    const newUser = {
      id: uuidv4(),
      name: "",
      country: "Israel",
      email: "",
      phone: "",
    };

    // TODO: if add user and not saved changes, after filtering users added user will be removed
    setValue("users", [newUser, ...getValues().users]);
  };

  // TODO: remove doesn't work properly
  const handleRemoveUser = (id: string) => {
    setValue(
      "users",
      getValues().users.filter((user) => user.id !== id)
    );
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
