import { useFormContext } from "react-hook-form";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

import { FormType } from "@/lib/types";
import { UserRow } from "@/components/users/user-row";
import { getListSize, normalizeData } from "@/lib/utils";
import useSetNormalizedData from "@/hooks/useSetNormalizedData";
import useSetUserData from "@/hooks/useSetUserData";

export const VirtualizedList = () => {
  const { getValues } = useFormContext<FormType>();
  const setNormalizedData = useSetNormalizedData();
  const setUserData = useSetUserData();

  const fieldValues = getValues("users");

  const handleRemoveUser = (index: number) => {
    const copyUsers = [...getValues("users")];
    copyUsers.splice(index, 1);

    setNormalizedData(normalizeData(copyUsers));
    setUserData(copyUsers);
  };

  return (
    <div>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            itemCount={fieldValues.length}
            // TODO: fix bug with resize
            itemSize={getListSize()}
            width={width}
            itemData={fieldValues}
            itemKey={(index, data) => data[index].id}
          >
            {({ data, index, style }) => (
              <UserRow
                key={`user-row-${data[index].id}`}
                rowId={data[index].id}
                index={index}
                style={style}
                onRemove={() => handleRemoveUser(index)}
              />
            )}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};
