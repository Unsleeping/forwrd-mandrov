import { Control } from "react-hook-form";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

import { FormType, User } from "@/lib/types";
import { UserRow } from "@/components/users/user-row";
import { getListSize } from "@/lib/utils";

type VirtualizedListProps = {
  itemsCount: number;
  control: Control<FormType>;
  onRemove: (index: number) => void;
  itemData: User[];
};

export const VirtualizedList = ({
  itemData,
  itemsCount,
  control,
  onRemove,
}: VirtualizedListProps) => (
  <div>
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          itemCount={itemsCount}
          // TODO: fix bug with resize
          itemSize={getListSize()}
          width={width}
          itemData={itemData}
          itemKey={(index, data) => data[index].id}
        >
          {({ data, index, style }) => (
            <UserRow
              key={`user-row-${data[index].id}`}
              index={index}
              style={style}
              onRemove={() => onRemove(index)}
              formControl={control}
            />
          )}
        </FixedSizeList>
      )}
    </AutoSizer>
  </div>
);
