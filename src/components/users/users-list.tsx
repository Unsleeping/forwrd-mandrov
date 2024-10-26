import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserRoundPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { cn, normalizeData, persistUserData } from "@/lib/utils";
import { formSchema } from "@/lib/schemas";
import { FormType } from "@/lib/types";
import SkeletonRows from "@/components/skeleton-rows";
import { Form } from "@/components/ui/form";
import { VirtualizedList } from "@/components/users/virtualized-list";
import useIsLoading from "@/hooks/useIsLoading";
import Search from "@/components/users/search";
import { filterUsersBySearchTerm } from "@/_pages/users/utils";
import SaveAction from "@/components/users/save-action";
import useSetUserData from "@/hooks/useSetUserData";
import useUserData from "@/hooks/useUserData";
import useSetNormalizedData from "@/hooks/useSetNormalizedData";

export default function UserList() {
  const userData = useUserData();
  const isLoading = useIsLoading();
  const setUserData = useSetUserData();
  const setNormalizedData = useSetNormalizedData();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = filterUsersBySearchTerm(userData, searchTerm);

  const formValues = { users: filteredUsers };

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    values: formValues,
    defaultValues: formValues,
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });

  const { getValues } = form;

  const onSubmit = (values: FormType) => {
    const userData = values.users;
    persistUserData(userData);
    setUserData(userData);
  };

  const handleAddUser = () => {
    const newUser = {
      id: uuidv4(),
      name: "",
      country: "Israel",
      email: "",
      phone: "",
    };

    const prevUsers = getValues("users").map((user, index) => ({
      ...user,
      phone: getValues(`users.${index}.phone`),
      email: getValues(`users.${index}.email`),
      name: getValues(`users.${index}.name`),
    }));
    const newUsers = [newUser, ...prevUsers];

    setNormalizedData(normalizeData(newUsers));
    setUserData(newUsers);
  };

  return (
    <div className="p-4 h-full">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Users List ({getValues("users").length})
        </h2>
        <Search setSearchTerm={setSearchTerm} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // 52px = btn+mb
          className="flex flex-col h-[calc(100%-52px)]"
        >
          <SaveAction />

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
            {isLoading ? <SkeletonRows /> : <VirtualizedList />}
          </div>
        </form>
      </Form>
    </div>
  );
}
